import Box from "@src/app/theme/components/Box/Box";
import React, { useContext, useEffect, useState } from "react";
import { buffets } from "@src/app/Mockup";
import Text from "@src/app/theme/components/Text/Text";
import theme from "@src/app/theme/theme";
import Image from "@src/app/theme/components/Image/Image";
import Icon from "@src/app/theme/components/Icon/Icon";
import Link from "@src/app/theme/components/Link/Link";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import { BiMap } from "react-icons/bi";
import useSize from "@src/app/theme/helpers/useSize";
import BuffetService from "@src/app/api/BuffetService";
import Button from "@src/app/theme/components/Button/Button";
import { UserContext } from "@src/app/context/UserContext";
import { useRouter } from "next/dist/client/router";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



export const Relacionados = ({data}) => {

  const isMobile = useResponsive();
  const size = useSize();
  const [buffets, setBuffets] = useState([])
  const router = useRouter();
  const {
    setIdBuffet,
    setBuffetsRelacionados
  } = useContext(UserContext)

  


  const idCidadeBuffetCurrent = data?.entidade?.enderecos[0]?.endereco?.cidade?.id;

// Filtra os buffets premium na mesma cidade
const buffetsPremium = buffets.filter(buffet => {
  const idCidadeBuffet = buffet?.entidade?.enderecos[0]?.endereco?.cidade?.id;
  const isPremium = buffet?.entidade?.assinaturas?.some(
    assinatura => assinatura?.plano?.nome === 'Premium' && assinatura?.status === 'ACTIVE'
  );
  return idCidadeBuffet === idCidadeBuffetCurrent && isPremium;
});

// Se não houver buffets premium, filtra os buffets destacados na mesma cidade
const buffetsDestacados = buffets.filter(buffet => {
  const idCidadeBuffet = buffet?.entidade?.enderecos[0]?.endereco?.cidade?.id;
  return idCidadeBuffet === idCidadeBuffetCurrent && buffet?.entidade?.destacado === '1';
});

// Use buffetsDestacados se não houver buffets premium
const buffetsRelacionados: any = buffetsPremium.length > 0 ? buffetsPremium : buffetsDestacados;


// Embaralhe os buffets relacionados para mostrar diferentes buffets
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



shuffleArray(buffetsRelacionados);

// Agora 'buffetsRelacionados' contém os buffets exibidos aleatoriamente



 
  useEffect(()=>{
    BuffetService.showBuffets()
      .then(res=>{
        setBuffets(res)
      })
  }, [])

  useEffect(()=>{
    setBuffetsRelacionados(buffetsRelacionados)
  }, [buffetsRelacionados?.length> 0])


 

  const handleChangeIdBuffet = (e, result)=>{
    e.preventDefault();
    setIdBuffet(result?.id)
    localStorage.setItem('ID_BUFFET', result?.id);
    router.push(`/buffets/buffet`)
  }

   
  function capitalizeFirstLetter(word) {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  }



  return (
    <>
    <Box styleSheet={{display: 'grid', gridTemplateColumns: !(size < 450) ? '100%' : '100%', gap: '2rem'}}>
        {buffetsRelacionados?.map(result => (
          <Box
          key={result?.['id']} 
          onClick={(e)=>handleChangeIdBuffet(e, result)}
          styleSheet={{
          width: !isMobile ? {md: '100%'} : '',
          height: 'auto',
          display: 'block',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: '1 0 0',
          cursor: 'pointer',
          borderRadius: '1.875rem',
          boxShadow: `8px 8px 20px 0px ${theme.colors.neutral.x100}`
        }}>
          
          <Box>
            <Box tag="div">
              <Image
                styleSheet={{
                  height: '200px',
                  width: '100%',
                  borderTopLeftRadius: '22px',
                  borderTopRightRadius: '22px',
                  objectFit: 'cover'
                }}
                alt="image-card-home"
                src={`https://buscabuffet.com.br/api/uploads/${
                  (result?.galerias?.find(image => image?.arquivo?.tipo === 'card') || {})?.arquivo?.nome
                }`}
              />

{result?.entidade?.assinaturas[0]?.plano?.nome === 'Premium' ?
                <Button
                  styleSheet={{
                    position: 'absolute',
                    marginLeft: '1rem',
                    marginTop: '1rem'
                  }}
                  size="lg"
                  textVariant="body1"
                  colorVariant="complementar"
                >
                  <Text variant="small" styleSheet={{ fontWeight: 'bold' }}>
                    {result?.entidade?.assinaturas[0]?.plano?.nome}
                  </Text>
                </Button> : ''
              }

            {
                result?.['entidade']?.['assinaturas'][0]?.['plano']?.['nome'] == 'Premium' &&  result?.['entidade']?.destacado == '1' && (
                <Button 
                styleSheet={{
                  position: 'absolute',
                  marginLeft: '1rem',
                  marginTop: '1rem'
                  }} 
                  size="lg" 
                  textVariant="body1"
                  colorVariant="complementar"
              >
                <Text variant="small" styleSheet={{fontWeight: 'bold'}}>
                  {result?.['entidade']?.['assinaturas'][0]?.['plano']?.['nome']} | Destaque</Text>
              </Button>)
              }

              {
                result?.['entidade']?.destacado == '1' && (
                <Button 
                styleSheet={{
                  position: 'absolute',
                  marginLeft: '1rem',
                  marginTop: '1rem'
                  }} 
                  size="lg" 
                  textVariant="body1"
                  colorVariant="complementar"
              >
                <Text variant="small" styleSheet={{fontWeight: 'bold'}}>
                    Destaque</Text>
              </Button>)
              }
             
            </Box>

            <Box
              styleSheet={{
              backgroundColor: theme.colors.neutral.x000,
              display:  'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: '1rem',
              alignItems: 'center',
              gap: '0.75rem',
              height: 'auto',
              borderBottomLeftRadius: '22px',
              borderBottomRightRadius: '22px',
            }}>

              <Box styleSheet={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  width: '100%',
                  gap: '.4rem'
                }}
              >
                <Text variant="body3" styleSheet={{color: theme.colors.neutral.x999, width: '80%'}}>{result?.['entidade']?.['nome']}</Text>
                
              </Box>

              <Box styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'left',
                width: '100%',
                gap: '1rem'
              }}>

                <Box styleSheet={{display:' flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem'}}>
                  <Box>
                    <BiMap  style={{fontSize: '20px', color: theme.colors.secondary.x500}} width={40} height={40}/>
                  </Box>
                 
                  <Text variant="body1" styleSheet={{color: theme.colors.neutral.x999, width: '90%'}}>
                    {result?.['entidade']?.['enderecos'][0]?.['endereco']?.['rua'] + ', '  
                    + capitalizeFirstLetter(result?.['entidade']?.['enderecos'][0]?.['endereco']?.['cidade']?.['nome']) + ' '
                    + result?.['entidade']?.['enderecos'][0]?.['endereco']?.['cidade']?.['estado']?.['sigla'] + ', Nº '
                    + result?.['entidade']?.['enderecos'][0]?.['endereco']?.['numero']
                    }
                  </Text>
                </Box>
                <Box styleSheet={{display:' flex', flexDirection: 'row', alignItems: 'center', gap: '.4rem'}}>
                  <Icon name="watch" fill={theme.colors.secondary.x500}/>
                  <Text variant="body1" styleSheet={{color: theme.colors.neutral.x999}}>{result?.['horario_atendimento']}</Text>
                </Box>
              </Box>

            <Box styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'left',
                width: '100%',
                gap: '1rem'
              }}>

              <Box styleSheet={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: !isMobile ? !(size < 1100) ? 'auto' : '100%' : '',
                  gap: '.4rem'
                }}
                tag="div"
              >
                <Icon name="perfil" fill={theme.colors.secondary.x500}/>
                <Text variant="body1" styleSheet={{color: theme.colors.neutral.x999}}>
                  {Number(result?.['capacidade_total']) < 1000? Number(result?.['capacidade_total']) : Number(result?.['capacidade_total']/1000).toFixed(3)} Pessoas
                </Text>
              </Box>

              <Box styleSheet={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '.4rem'
                }}
                tag="div"
            >
                <Icon name="arrowChevronRight" fill={theme.colors.secondary.x500}/>
                <Text variant="body1" styleSheet={{ color: theme.colors.neutral.x999, textAlign: 'left' }}>
                {result?.['categorias']?.['length'] > 0 ? result?.['categorias'][result['categorias']['length'] - 1]['categoria']['nome'] : 'Nenhuma categoria'}
                </Text>

              </Box>

            </Box>

          </Box>
        </Box>
      </Box>
    ))}
      </Box>
    </>

              )}

              