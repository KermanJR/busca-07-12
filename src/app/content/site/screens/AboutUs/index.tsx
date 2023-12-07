import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import { useContext, useEffect, useState } from "react";
import Text from "@src/app/theme/components/Text/Text";
import Icon from "@src/app/theme/components/Icon/Icon";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import BannerAnotherPages from '../../../../../../public/assets/images/banner_another_pages.webp';
import Button from "@src/app/theme/components/Button/Button";
import Input from "@src/app/theme/components/Input/Input";
import { ModalContext } from "@src/app/context/ModalContext";
import ModalRegister from "../HomeScreen/Components/Modals/RegisterModal";
import ModalLogin from "../HomeScreen/Components/Modals/LoginModal";
import useSize from "@src/app/theme/helpers/useSize";
import ModalBudget from "../HomeScreen/Components/Modals/BudgetModal";
import Image from "@src/app/theme/components/Image/Image";
import Logo from '../../../../../../public/assets/logo_buffet.svg'
import ModalRecoveryPassword from "../HomeScreen/Components/Modals/RecoveryPassword";
import WhatsAppButton from "../HomeScreen/Components/WhatsappButton";
export default function AboutUs(){

    const isMobile = useResponsive()
    const theme = useTheme();
    const size = useSize();

    const {
      isModalOpen,
      closeModal,
      isNovoModalOpen,
      closeNovoModal,
      closeBudgetModal,
      isModalOpenBudget,
      isModalRecoveryPassword,
      closeRecoveryPassword,
      openRecoveryPassword
    } = useContext(ModalContext)
  
    return(
        <Box tag="main"
            styleSheet={{
            alignItems: 'center',
            margin: '0 auto'
        }}>
  

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
              height: '281px',
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              background: `url(${BannerAnotherPages.src})`,
              padding: `${isMobile ? '5rem': '6rem'}`,
              marginTop: '5rem'
          }}>
              <Text 
              tag="h1" 
              variant="heading1Bold" 
              styleSheet={{color: theme.colors.neutral.x000, fontSize: !(size < 600) ? '2.5rem' : '1.5rem'}}>
                  Sobres Nós
              </Text>
          </Box> 

          <Box styleSheet={{
            display:'flex',
            flexDirection: 'row',
            flexWrap:  !isMobile ? 'no-wrap':'wrap',
            width: size <= 820? '95%':'65%',
            padding:  size <= 820 ? '1rem':'3vw',
            marginTop: '5rem',
            borderRadius: '20px',
            marginBottom: '5rem',
            gap: '0'
          }}
          >
            <Box styleSheet={{
              margin: '0 auto',
              width: size <= 820? '100%':'55%',
              justifyContent: 'flex-start',
              alignItems: !isMobile ? 'flex-start' : 'center'
            }}>
              <Box styleSheet={{alignSelf: !isMobile ? 'flex-start' : '', width: !isMobile ? '' : '100%', margin: !isMobile ? '0px 0px 20px 0px' : '0px auto', marginTop: '-1rem'}}>
                <Image src={Logo.src}  alt="Logo-Buffet" styleSheet={{height: !(size < 1000) ? '300px' : '58px', width: !(size < 1000) ? '300px' : '150px', objectFit: 'cover', margin: !isMobile ? '' : '10px auto 10px'}}/>
              </Box>
            </Box>

            <Box styleSheet={{
              width: size <= 820? '100%':'60%',
            }}>
              <Text styleSheet={{fontWeight: '500', fontSize: '18px', marginTop: size <= 820? '1rem':'0',}}>
              O BUSCA BUFFET é uma startup de tecnologia voltada a anúncios e orçamentos para buffets e empresas de eventos. Sabemos que a demanda por festas infantis, aniversários, confraternizações, casamentos ou qualquer outro tipo de evento tem aumentado substancialmente e devido a essa demanda identificamos no mercado digital a necessidade de um espaço onde seja possível encontrar de forma rápida e eficaz boas opções.

              </Text>
              <Text styleSheet={{fontWeight: '500', fontSize: '18px', marginTop: '1rem'}}>
           
Nosso principal objetivo é facilitar o contato entre clientes e empresas anunciantes de forma segura e 100% digital, estabelecendo meios práticos e modernos através de uma plataforma inteligente combinado a economia de tempo, obtendo várias cotações numa mesma região de uma só vez.
              </Text>

            </Box>
          <Box>
        </Box>
      </Box>

    </Box>
    )

}
