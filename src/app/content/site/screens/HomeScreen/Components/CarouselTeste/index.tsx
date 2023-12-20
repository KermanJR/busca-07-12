import { UserContext } from '@src/app/context/UserContext';
import { useTheme } from '@src/app/theme/ThemeProvider';
import Box from '@src/app/theme/components/Box/Box';
import Button from '@src/app/theme/components/Button/Button';
import Icon from '@src/app/theme/components/Icon/Icon';
import Text from '@src/app/theme/components/Text/Text';
import useResponsive from '@src/app/theme/helpers/useResponsive';
import useSize from '@src/app/theme/helpers/useSize';
import theme from '@src/app/theme/theme';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { BiMap } from 'react-icons/bi';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CarouselT = ({ buffets }) => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

   const filteredBuffets = buffets
  ?.filter((buffet) => {
    const hasTrialOrActiveSubscription = buffet?.['entidade']?.assinaturas?.some(
      (assinatura) => assinatura?.status === 'TRIAL' || assinatura?.status === 'ACTIVE'
    );
    return buffet?.status === 'A' && hasTrialOrActiveSubscription;
  })
  // Ordenar buffets (primeiro os premiuns, depois os destacados)
  .sort((a, b) => {
    const aIsPremium = a?.assinaturas?.some((assinatura) => assinatura?.plano?.nome === 'Premium');
    const bIsPremium = b?.assinaturas?.some((assinatura) => assinatura?.plano?.nome === 'Premium');
    const aIsFeatured = a?.destacado === '1';
    const bIsFeatured = b?.destacado === '1';

    // Ordenar por plano (premium primeiro)
    if (aIsPremium && !bIsPremium) {
      return -1;
    } else if (!aIsPremium && bIsPremium) {
      return 1;
    }

    // Em caso de empate, ordenar por destaque
    if (aIsFeatured && !bIsFeatured) {
      return -1;
    } else if (!aIsFeatured && bIsFeatured) {
      return 1;
    }

    // Se nenhum critério de ordenação especial se aplicar, manter a ordem original
    return 0;
  });

// Lógica adicional para limitar o número de buffets
const maxBuffetsToShow = 16;
let buffetsToShow = filteredBuffets.slice(0, maxBuffetsToShow);

// Se o número de buffets for menor que 16, preencher com buffets não premium nem destacados
if (buffetsToShow.length < maxBuffetsToShow) {
  const nonPremiumNonFeaturedBuffets = filteredBuffets.filter(
    (buffet) => !buffet?.assinaturas?.some((assinatura) => assinatura?.plano?.nome === 'Premium') && buffet?.destacado !== '1'
  );
  const remainingBuffetsCount = maxBuffetsToShow - buffetsToShow.length;

  // Priorizar buffets premium e destacados se houver pelo menos um
  const premiumFeaturedBuffets = filteredBuffets.filter(
    (buffet) => buffet?.assinaturas?.some((assinatura) => assinatura?.plano?.nome === 'Premium') || buffet?.destacado === '1'
  );

  const additionalBuffets = premiumFeaturedBuffets.slice(0, remainingBuffetsCount);
  buffetsToShow = buffetsToShow.concat(additionalBuffets);
}
  
  function capitalizeFirstLetter(word) {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  }
  const router = useRouter()

  const size = useSize()
  const theme = useTheme();
  const isMobile = useResponsive();

  const handleChangeIdBuffet = (result)=>{
    setIdBuffet(result?.id)
    localStorage.setItem('ID_BUFFET', result?.id);
    router.push(`/${result?.slug}`)
  }

  const {
    setIdBuffet,
    dataBuffet
  } = useContext(UserContext);


  return (
    <Carousel 
    additionalTransfrom={0}
    arrows
    autoPlaySpeed={3000}
    centerMode
    className=""
    containerClass="container"
    dotListClass=""
    draggable
    focusOnSelect={false}
    infinite
    itemClass=""
    keyBoardControl
    minimumTouchDrag={80}
    pauseOnHover
    renderArrowsWhenDisabled={false}
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    responsive={{
      desktop: {
        breakpoint: {
          max: 3000,
          min: 720
        },
        items: 3,
        partialVisibilityGutter: 40,
 
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464
        },
        items: 3,
        partialVisibilityGutter: 30
      }
    }}
    rewind={false}
    rewindWithAnimation={false}
    rtl={false}
    shouldResetAutoplay
    showDots={false}
    sliderClass=""
    slidesToSlide={1}
    swipeable
    
    >
      {filteredBuffets?.map((item, index)=>{
        return(
          <Box styleSheet={{
            marginTop: '4rem',
            width: '90%',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '1px 1px 3px 2px #ccc',
            cursor: 'pointer'
          }}>
            <Box   onClick={(e)=>handleChangeIdBuffet(item)}>
              <img 
              style={{
                width: '100%',
                height: '250px',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                objectFit: 'cover'
              }}
               src={`https://buscabuffet.com.br/api/uploads/${
                (item?.galerias?.find(image => image?.arquivo?.tipo === 'card') || {})?.arquivo?.nome
              }`}
              />
               {
                item?.['entidade']?.['assinaturas'][0]?.['plano']?.['nome'] == 'Premium' ?
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
                  {item?.['entidade']?.['assinaturas'][0]?.['plano']?.['nome']}</Text>
              </Button>: ''
              }

              {
                item?.['entidade']?.['assinaturas'][0]?.['plano']?.['nome'] == 'Premium' &&  item?.['entidade']?.destacado == '1' && (
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
                  {item?.['entidade']?.['assinaturas'][0]?.['plano']?.['nome']} | Destaque</Text>
              </Button>)
              }

              {
                item?.['entidade']?.destacado == '1' && (
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
            <Box >
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
                <Text variant="body3" styleSheet={{color: theme.colors.neutral.x999, width: '80%'}}>{item?.['entidade']?.['nome']}</Text>
                
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
                    {item?.['entidade']?.['enderecos'][0]?.['endereco']?.['rua'] + ', '  
                    + capitalizeFirstLetter(item?.['entidade']?.['enderecos'][0]?.['endereco']?.['cidade']?.['nome']) + ' '
                    + item?.['entidade']?.['enderecos'][0]?.['endereco']?.['cidade']?.['estado']?.['sigla'] + ', Nº '
                    + item?.['entidade']?.['enderecos'][0]?.['endereco']?.['numero']
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
                  {Number(item?.['capacidade_total']) < 1000? Number(item?.['capacidade_total']) : Number(item?.['capacidade_total']/1000).toFixed(3)} Pessoas
                </Text>
              </Box>
              </Box>

             

            </Box>
            </Box>
          </Box>
        )
      })}
    </Carousel>
  );
};

export default CarouselT;
