import Box from "@src/app/theme/components/Box/Box";
import BackgroundArrowHome from '../../../../../../public/assets/images/background_arrow_home.webp';
import { useTheme } from "@src/app/theme/ThemeProvider";
import { HighLights } from "./Components/HighLights/HighLights";
import Text from "@src/app/theme/components/Text/Text";
import BackgroundHome from '../../../../../../public/assets/images/background_home.webp'
import FormSearch from "./Components/FormSearch/FormSearch";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import { Recommendations } from "./Components/Recommendations/Recommendations";
import Button from "@src/app/theme/components/Button/Button"; 
import Image from "@src/app/theme/components/Image/Image";
import ImageCardHomeUlt from '../../../../../../public/assets/images/image_card_home_ult.webp';
import { useContext, useEffect } from "react";
import ModalLogin from "./Components/Modals/LoginModal";
import { ModalContext } from "@src/app/context/ModalContext";
import ModalRegister from "./Components/Modals/RegisterModal";
import {BiMap} from "react-icons/bi"
import { BsCheckCircle } from "react-icons/bs";
import {MdLocalAtm} from "react-icons/md";
import useSize from "@src/app/theme/helpers/useSize";
import ModalBudget from "./Components/Modals/BudgetModal";
import { useRouter } from "next/router";
import ModalRecoveryPassword from "./Components/Modals/RecoveryPassword";
import WhatsAppButton from "./Components/WhatsappButton";
import { UserContext } from "@src/app/context/UserContext";

export default function HomeScreen(){

  const theme = useTheme();
  const isMobile = useResponsive();
  const size = useSize()
  const {
    isModalOpen,
    closeModal,
    isNovoModalOpen,
    closeNovoModal,
    closeBudgetModal,
    isModalOpenBudget,
    isModalRecoveryPassword,
    closeRecoveryPassword,
    openRecoveryPassword,
    
  } = useContext(ModalContext)

  const {
    setDataBuffet
    
  } = useContext(UserContext)

  const router = useRouter();

  useEffect(() => {
   
    const scrollToSection = () => {
      const section = document.getElementById('como-funciona');
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth', 
        });
      }
    };
    if (router.asPath === '/#como-funciona') {
      scrollToSection();
    }
  }, [router.asPath]);

  useEffect(()=>{
    window?.localStorage?.setItem('ID_BUFFET', '')
  }, [])


  return(
    <Box
      tag="main"
      styleSheet={{
        backgroundColor: theme.colors.neutral.x000,
        alignItems: 'center',
        width: '100%'
      }}
    >
      
       {/* Novo modal que será aberto */}
       {isNovoModalOpen &&(
            <ModalLogin isOpen={isNovoModalOpen} onClose={closeNovoModal} />
          )}

          {isModalOpenBudget &&(
            <ModalBudget isOpen={isModalOpenBudget} onClose={closeBudgetModal} />
          )}  

      {isModalRecoveryPassword &&(
            <ModalRecoveryPassword isOpen={isModalRecoveryPassword} onClose={closeRecoveryPassword} />
          )}  


      {/*Banner Principal*/}      
      <Box styleSheet={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        height: size <= 800 ? '100vh' : '79vh',
        background: `url(${BackgroundHome.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        paddingBottom: `${isMobile ? '5rem': '0'}`
      }}>
        
        <Text 
          tag="h1" 
          variant={!isMobile ? "heading1Bold" : (!(size < 430) ? 'heading2Bold' : 'heading4Bold')}
          styleSheet={{width: !isMobile ? (!(size < 1100) ? '60%' : '90%') : '90%', margin: '0 auto', padding: `${isMobile ? '1rem': '2rem'}`, textAlign: 'center', color: theme.colors.neutral.x000}}>
            Encontre o buffet ideal para o seu evento!
        </Text>
        <FormSearch/>
      </Box>

      <Box tag="div" styleSheet={{
          width: size <= 800 ? '95%':'90%',
          height: 'auto',
          backgroundColor: theme.colors.neutral.x000,
          marginTop: '-3rem',
          padding: isMobile? '1rem':'2rem 4rem',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
        }}
    > 
      <Text variant="heading2Bold"
        styleSheet={{
            color: theme.colors.primary.x500,
            textAlign: 'center',
        }}
        >
          Principais Categorias
      </Text>

      <Text variant="heading6" tag="h6"
        styleSheet={{
          color: theme.colors.primary.x500,
          textAlign: 'center'
        }}>
        Buffets recomendados. As melhores opções selecionadas para você!
      </Text>
      <HighLights/>
    </Box>

      
      {/* Como funciona - seção */}
      <Box 
        tag="section"
        id="como-funciona"
        styleSheet={{
          width: '100%',
          height: 'auto',
          background: theme.colors.neutral.x050,
          padding: `${isMobile? '2rem 0.3rem' : '4rem 6rem'}`,
          marginTop: '4rem',
          backgroundImage: !isMobile ? `url(${BackgroundArrowHome.src})` : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          flexShrink: '0'
        }}
      >
        <Text
          variant="heading2Bold" 
          styleSheet={{
              color: theme.colors.primary.x500,
              textAlign: 'center',
              width: '100%'
          }}
          >
            Como funciona? 
        </Text>

        <Text 
          variant="heading6" tag="h6" 
          styleSheet={{
            color: theme.colors.primary.x500,
            textAlign: 'center'
          }}>
         Veja como você pode solicitar o orçamento 
        </Text>

        <Box styleSheet={{
          display: !isMobile ? 'grid' : 'flex',
          flexDirection: !isMobile ? '' : 'row',
          flexWrap: !isMobile ? '' : 'wrap',
          width: '100%',
          gridTemplateColumns: ! isMobile ? 'repeat(3, 1fr)' : '',
          justifyContent: 'center',
          justifyItems: 'center',
          alignContent: 'center',
          gap: '2rem',
          padding: '2rem'
        }}>
          <Box styleSheet={{
            width: !(size < 900) ? '17rem' : '14rem',
            height: !(size < 900) ? '13rem' : '10rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
            alignItems: 'center',
            boxShadow: `0px 11px 17px 0px ${theme.colors.neutral.x100}`,
            backgroundColor: theme.colors.neutral.x000,
            borderRadius: '1.25rem',
            padding: '1rem',
          }}>
            <BiMap  style={{color: theme.colors.secondary.x500, fontSize: '30px'}}/>
            <Text styleSheet={{fontSize: '1rem', fontWeight: 'bold'}}>Encontre o espaço ideal</Text>
            <Text styleSheet={{fontSize: '.875rem', fontWeight: '500'}}>Encontre o local ideal para o seu evento em poucos cliques</Text>
          </Box>

          <Box styleSheet={{
            width: !(size < 900) ? '17rem' : '14rem',
            height: !(size < 900) ? '13rem' : '10rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
            alignItems: 'center',
            boxShadow: `0px 11px 17px 0px ${theme.colors.neutral.x100}`,
            backgroundColor: theme.colors.neutral.x000,
            borderRadius: '1.25rem',
            padding: '1rem',
            flexShrink: '0'
          }}>
            <MdLocalAtm style={{color: theme.colors.secondary.x500, fontSize: '30px'}}></MdLocalAtm>
            <Text styleSheet={{fontSize: '1rem', fontWeight: 'bold'}}>Solicite o orçamento</Text>
            <Text styleSheet={{fontSize: '.875rem', fontWeight: '500'}}>Encontre o local ideal para o seu evento em poucos cliques</Text>
          </Box>

          <Box styleSheet={{
            width: !(size < 900) ? '17rem' : '14rem',
            height: !(size < 900) ? '13rem' : '10rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
            alignItems: 'center',
            boxShadow: `0px 11px 17px 0px ${theme.colors.neutral.x100}`,
            backgroundColor: theme.colors.neutral.x000,
            borderRadius: '1.25rem',
            padding: '1rem',
            flexShrink: '0'
          }}>
            <BsCheckCircle style={{color: theme.colors.secondary.x500, fontSize: '30px'}}></BsCheckCircle>
            <Text styleSheet={{fontSize: '1rem', fontWeight: 'bold'}}>Escolha a melhor proposta </Text>
            <Text styleSheet={{fontSize: '.875rem', fontWeight: '500'}}>Encontre o local ideal para o seu evento em poucos cliques</Text>
          </Box>
        </Box>
      </Box>


      {/*Recomendados*/} 
      <Box tag="div" styleSheet={{
          width: '100%',
          height: 'auto',
          marginTop: '3rem',
          padding: size <= 800 ? '1rem' : '2rem 6rem',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
        }}
      > 
      <Text variant="heading2Bold" tag="h1"
        styleSheet={{
            color: theme.colors.primary.x500,
            textAlign: 'center'
        }}
        >
          Veja Mais
      </Text>

      <Text variant="heading6" tag="h6"
        styleSheet={{
          color: theme.colors.primary.x500,
          textAlign: 'center'
        }}>
        Buffets recomendados. As melhores opções selecionadas para você!
      </Text>
        <Recommendations/>
    </Box>



      <Box styleSheet={{width: '100%', height: 'auto', marginTop: '4rem'}}>
          <Box styleSheet={{
              width: !isMobile ? '70%' : '90%',
              height: 'auto',
              backgroundColor: theme.colors.complementar.x500,
              margin: '0 auto',
              borderRadius: '1.875rem',
              display: 'grid',
              gridTemplateColumns: !isMobile ? 'repeat(2, 1fr)' : '1fr',
              padding: !isMobile ? '3rem' : '3rem 2rem',
              gap: !isMobile ? '4rem' : '2rem'
              }}>
              <Box>
                <Text variant={!isMobile ? "heading1Bold" : 'heading3Bold'} color={theme.colors.neutral.x000}>Cadastre seu espaço no Busca Buffet!</Text>
                <Text variant="body1" color={theme.colors.neutral.x000} styleSheet={!isMobile ? {marginTop: '1rem'} : {margin: '1rem 0px', textAlign: 'justify'}}>Descubra nosso buffet com sabores incríveis. Pratos quentes, saladas frescas e sobremesas irresistíveis.</Text>
                <Button hasIcon={true} nameIcon="plus" styleSheet={!isMobile ? {marginTop: 'auto'} :{margin: '0px auto'}} onClick={(e)=>router.push('/login')}>Anuncie seu Buffet</Button>
              </Box>
              <Image src={ImageCardHomeUlt.src} alt="" />
          </Box>
      </Box>
     
    </Box>
  )
}
