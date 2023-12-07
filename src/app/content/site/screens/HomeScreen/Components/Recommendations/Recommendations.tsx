import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BiMap } from "react-icons/bi";
import { UserContext } from "@src/app/context/UserContext";
import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import theme from "@src/app/theme/theme";
import Image from "@src/app/theme/components/Image/Image";
import Icon from "@src/app/theme/components/Icon/Icon";
import Button from "@src/app/theme/components/Button/Button";
import styles from './slider.module.css';
import BuffetService from "@src/app/api/BuffetService";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import useSize from "@src/app/theme/helpers/useSize";

export const Recommendations = () => {
  const [buffets, setBuffets] = useState([]);
  const router = useRouter();
  const { setIdBuffet } = useContext(UserContext);

  const isMobile = useResponsive();
  const size = useSize();

  useEffect(() => {
    // Carregue os buffets premium e em destaque do seu serviço
    BuffetService.showBuffets()
      .then(res => {
        setBuffets(res);
      });
  }, []);

  function capitalizeFirstLetter(word) {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: false,
    arrows: true,
    centerPadding: 20,
    useCSS: true,
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: false,
    arrows: true,
    centerPadding: 20,
    useCSS: true,
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
  };

  // Filtrar os buffets premium
  const buffetsPremium = buffets.filter((buffet) => {
    return buffet.entidade.assinaturas.some((assinatura) => {
      return assinatura.plano.nome === "Premium";
    });
  });



  // Filtrar os buffets em destaque
  const buffetsDestaque = buffets.filter((buffet) => {
    return buffet.entidade.destacado === "1";
  });

 
  let slides = [];

  if (buffetsPremium?.length === 0) {
    // Se não houver buffets premium, renderize os buffets em destaque
    slides = buffetsDestaque;
  } else {
    // Renderize os buffets premium e complete com os buffets em destaque
    slides = buffetsPremium;

    if (buffetsPremium.length < 3) {
      // Se houver menos de 3 buffets premium, complete com os buffets em destaque
      const remainingSlidesCount = 4 - buffetsPremium.length;
      slides.push(...buffetsDestaque.slice(0, remainingSlidesCount));
    }
  }


  const handleChangeIdBuffet = (result) => {
    setIdBuffet(result?.id);
    localStorage.setItem('ID_BUFFET', result?.id);
    router.push(`/buffets/buffet`);
  };



  return (
    size > 650? 
    <Slider
      className={styles.custom_slider}
      style={{
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
      {...settings}
    >
      {slides?.map((result) => (
        <Box
          key={result?.id}
          onClick={(e) => handleChangeIdBuffet(result)}
          styleSheet={{
            width: !isMobile ? { md: '100%' } : '',
            padding: '2rem 0',
            display: 'flex',
            height: '600px',
            flexDirection: 'row',
            justifyContent: 'center',
            cursor: 'pointer',
            gap: '1rem',
            borderRadius: '1.875rem',
          }}
        >
          <Box styleSheet={{ marginLeft: '20px', borderRadius: '20px', height: '500px', boxShadow: `2px 2px 20px 0px ${theme.colors.neutral.x100}` }}>
            <Box tag="div" styleSheet={{ borderRadius: '8px' }}>
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
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: '1rem',
                alignItems: 'center',
                gap: '0.75rem',
                height: 'auto',
                borderBottomLeftRadius: '22px',
                borderBottomRightRadius: '22px',
                marginTop: '1.5rem'
              }}
            >

              <Box styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                width: '100%',
                gap: '.4rem'
              }}
              >
                <Text variant="body3" styleSheet={{ color: theme.colors.neutral.x999, width: '80%' }}>{result?.entidade?.nome}</Text>
              </Box>

              <Box styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'left',
                width: '100%',
                gap: '1rem'
              }}
              >

                <Box styleSheet={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem' }}>
                  <Box>
                    <BiMap style={{ fontSize: '20px', color: theme.colors.secondary.x500 }} width={40} height={40} />
                  </Box>

                  <Text variant="body1" styleSheet={{ color: theme.colors.neutral.x999, width: '90%' }}>
                    {result?.entidade?.enderecos[0]?.endereco?.rua + ', '
                      + capitalizeFirstLetter(result?.entidade?.enderecos[0]?.endereco?.cidade?.nome) + ' '
                      + result?.entidade?.enderecos[0]?.endereco?.cidade?.estado?.sigla + ', Nº '
                      + result?.entidade?.enderecos[0]?.endereco?.numero
                    }
                  </Text>
                </Box>
                <Box styleSheet={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.4rem' }}>
                  <Icon name="watch" fill={theme.colors.secondary.x500} />
                  <Text variant="body1" styleSheet={{ color: theme.colors.neutral.x999 }}>{result?.horario_atendimento}</Text>
                </Box>
              </Box>
            </Box>

            <Box styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              justifyContent: 'space_between',
              alignItems: 'left',
              width: '100%',
              gap: '1rem'
            }}
            >

              <Box styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: !isMobile ? !(size < 1100) ? 'auto' : '100%' : '',
                gap: '.4rem',
                marginLeft: '1rem'
              }}
                tag="div"
              >
                <Icon name="perfil" fill={theme.colors.secondary.x500} />
                <Text variant="body1" styleSheet={{ color: theme.colors.neutral.x999 }}>
                  {Number(result?.capacidade_total) < 1000 ? Number(result?.capacidade_total) : Number(result?.capacidade_total / 1000).toFixed(3)} Pessoas
                </Text>
              </Box>

              <Box styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '.4rem',
                marginLeft: '1rem'
              }}
                tag="div"
              >
                <Icon name="arrowChevronRight" fill={theme.colors.secondary.x500} />
                <Text variant="body1" styleSheet={{ color: theme.colors.neutral.x999, textAlign: 'left' }}>
                  {result?.categorias.length > 0 ? result.categorias[result.categorias.length - 1].categoria.nome : 'Nenhuma categoria'}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Slider>
    : 
    <Slider
      className={styles.custom_slider}
      style={{
        paddingTop: '4rem',
        paddingBottom: '4rem',
       
      }}
      {...settings2}
    >
      {slides?.map((result) => (
        <Box
          key={result?.id}
          onClick={(e) => handleChangeIdBuffet(result)}
          styleSheet={{
  
            width: !isMobile ? { md: '100%' } : '',
            padding: '2rem 0',
            display: 'flex',
            height: '600px',
            flexDirection: 'row',
            justifyContent: 'center',
            cursor: 'pointer',
            gap: '1rem',
            borderRadius: '1.875rem',
          }}
        >
          <Box styleSheet={{ marginLeft: '20px', borderRadius: '20px', height: '500px', boxShadow: `2px 2px 20px 0px ${theme.colors.neutral.x100}` }}>
            <Box tag="div" styleSheet={{ borderRadius: '8px' }}>
              <Image
                styleSheet={{
                  height: '200px',
                  width: '100%',
                  borderTopLeftRadius: '22px',
                  borderTopRightRadius: '22px',
                  objectFit: 'cover'
                }}
                alt="image-card-home"
                src={`https://buscabuffet.com.br/api/uploads/${result?.galerias[1]?.arquivo?.nome}`}
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
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: '1rem',
                alignItems: 'center',
                gap: '0.75rem',
                height: 'auto',
                borderBottomLeftRadius: '22px',
                borderBottomRightRadius: '22px',
                marginTop: '1.5rem'
              }}
            >

              <Box styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                width: '100%',
                gap: '.4rem'
              }}
              >
                <Text variant="body3" styleSheet={{ color: theme.colors.neutral.x999, width: '80%' }}>{result?.entidade?.nome}</Text>
              </Box>

              <Box styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'left',
                width: '100%',
                gap: '1rem'
              }}
              >

                <Box styleSheet={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.5rem' }}>
                  <Box>
                    <BiMap style={{ fontSize: '20px', color: theme.colors.secondary.x500 }} width={40} height={40} />
                  </Box>

                  <Text variant="body1" styleSheet={{ color: theme.colors.neutral.x999, width: '90%' }}>
                    {result?.entidade?.enderecos[0]?.endereco?.rua + ', '
                      + capitalizeFirstLetter(result?.entidade?.enderecos[0]?.endereco?.cidade?.nome) + ' '
                      + result?.entidade?.enderecos[0]?.endereco?.cidade?.estado?.sigla + ', Nº '
                      + result?.entidade?.enderecos[0]?.endereco?.numero
                    }
                  </Text>
                </Box>
             
              </Box>
            </Box>

            <Box styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              justifyContent: 'space_between',
              alignItems: 'left',
              width: '100%',
              gap: '1rem'
            }}
            >

              <Box styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: !isMobile ? !(size < 1100) ? 'auto' : '100%' : '',
                gap: '.4rem',
                marginLeft: '1rem'
              }}
                tag="div"
              >
                <Icon name="perfil" fill={theme.colors.secondary.x500} />
                <Text variant="body1" styleSheet={{ color: theme.colors.neutral.x999 }}>
                  {Number(result?.capacidade_total) < 1000 ? Number(result?.capacidade_total) : Number(result?.capacidade_total / 1000).toFixed(3)} Pessoas
                </Text>
              </Box>

              <Box styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '.4rem',
                marginLeft: '1rem'
              }}
                tag="div"
              >
                <Icon name="arrowChevronRight" fill={theme.colors.secondary.x500} />
                <Text variant="body1" styleSheet={{ color: theme.colors.neutral.x999, textAlign: 'left' }}>
                  {result?.categorias.length > 0 ? result.categorias[result.categorias.length - 1].categoria.nome : 'Nenhuma categoria'}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Slider>
  );
};
