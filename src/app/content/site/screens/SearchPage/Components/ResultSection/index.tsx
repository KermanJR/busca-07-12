// ResultSection.jsx

import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import Image from "@src/app/theme/components/Image/Image";
import useSize from "@src/app/theme/helpers/useSize";
import Button from "@src/app/theme/components/Button/Button";
import { useTheme } from "@src/app/theme/ThemeProvider";
import { BiMap } from "react-icons/bi";
import Icon from "@src/app/theme/components/Icon/Icon";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import React, { useContext, useState } from "react";
import { UserContext } from "@src/app/context/UserContext";
import {useRouter } from 'next/router';
import Pagination from "@src/app/components/system/Pagination";

export function ResultSection() {

  const size = useSize()
  const theme = useTheme();
  const isMobile = useResponsive();

  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 20; // Define o número de elementos por página
  const router = useRouter()
 
  const {
    setIdBuffet,
    dataBuffet
  } = useContext(UserContext);

  const handleChangeIdBuffet = (result)=>{
   
    setIdBuffet(result?.id)
    localStorage.setItem('ID_BUFFET', result?.id);
    router.push(`/${result?.slug}`)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  
  function capitalizeFirstLetter(word) {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  }


  return (
    <Box tag="section" styleSheet={{marginTop: '2rem'}}>

      <Box styleSheet={{display: 'grid', gridTemplateColumns: !(size < 450) ? 'repeat(3, 33%)' : '100%', gap: '2rem'}}>
        {dataBuffet ? dataBuffet?.slice((currentPage-1)*elementsPerPage, currentPage* elementsPerPage)?.map((result: any) => (
          <Box
          key={result?.['id']} 
          onClick={(e)=>handleChangeIdBuffet(result)}
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

              {
                result?.['entidade']?.['assinaturas'][0]?.['plano']?.['nome'] == 'Premium' ?
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
                  {result?.['entidade']?.['assinaturas'][0]?.['plano']?.['nome']}</Text>
              </Button>: ''
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
              marginTop: '1.5rem'
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

             

            </Box>

          </Box>
        </Box>
      </Box>
    )): ''}
  </Box>
      
      {dataBuffet.length === 0 && (
        <Text variant="body1" styleSheet={{marginLeft: !(size <= 650) ? '' : '1rem'}}>Nenhum resultado encontrado.</Text>
      )}
      

      <Pagination
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        qtdElements={dataBuffet.length}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
