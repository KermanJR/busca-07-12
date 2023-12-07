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
export default function Contact(){

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
                  Contato
              </Text>
          </Box> 

          <Box styleSheet={{
            display:'flex',
            flexDirection: 'row',
            flexWrap:  !isMobile ? 'no-wrap':'wrap',
            backgroundColor: theme.colors.neutral.x050,
            width: size <= 820? '95%':'70%',
            padding:  size <= 820 ? '1rem':'3vw',
            marginTop: '5rem',
            borderRadius: '20px',
            marginBottom: '5rem',
            gap: '1vw'
          }}
          >
            <Box styleSheet={{
              margin: '0 auto',
              width: size <= 820? '100%':'50%',
              justifyContent: 'flex-start',
              alignItems: !isMobile ? 'flex-start' : 'center'
            }}>
              <Box styleSheet={{alignSelf: !isMobile ? 'flex-start' : '', width: !isMobile ? '' : '100%', margin: !isMobile ? '0px 0px 20px 0px' : '0px auto'}}>
                <Image src={Logo.src}  alt="Logo-Buffet" styleSheet={{height: !(size < 1000) ? '73px' : '58px', width: !(size < 1000) ? '170px' : '150px', objectFit: 'cover', margin: !isMobile ? '' : '10px auto 10px', transform: !isMobile ? '' : 'scale(0.8)'}}/>
              </Box>
              {/*Facebook*/}
              <Box tag="ul" styleSheet={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '1rem',
                  gap: '1rem',
                  justifyContent: 'left',
                  alignItems: 'center', 
                  backgroundColor: theme.colors.neutral.x000,
                  borderRadius: '8px',
                  padding: '1rem',
                  width: '22vw',
                  minWidth: '250px',
                  boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x200}`
                }}
              >
                <Box tag="li" styleSheet={{position: 'relative', display: 'grid', placeItems: 'center',  width: '50px', height: '50px', padding: '5px', backgroundColor: theme.colors.neutral.x050, borderRadius: '50%'}}>
                  <Icon name="facebook" styleSheet={{position: 'absolute', left: '12%', top: '13%', width: '45px', height: '45px', fill: theme.colors.secondary.x500, transform: 'scale(1)'}}/>
                </Box>
                <Box tag="li">
                  <Text>Facebook</Text>
                  <Text variant="body1" color={theme.colors.neutral.x999}>@buscabuffet</Text>
                </Box>
              </Box>

              {/*Instagram*/}
              <Box styleSheet={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '1rem',
                  gap: '1rem',
                  justifyContent: 'left',
                  alignItems: 'center', 
                  backgroundColor: theme.colors.neutral.x000,
                  borderRadius: '8px',
                  padding: '1rem',
                  width: '22vw',
                  minWidth: '250px',
                  boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x200}`
                }}
              >
                <Box tag="li" styleSheet={{position: 'relative', display: 'grid', placeItems: 'center',  width: '50px', height: '50px', padding: '5px', backgroundColor: theme.colors.neutral.x050, borderRadius: '50%'}}>
                  <Icon name="instagram" styleSheet={{position: 'absolute', left: '15%', top: '15%', width: '45px', height: '45px', fill: theme.colors.secondary.x500, transform: 'scale(1.3)'}}/>
                </Box>
                <Box>
                  <Text>Instagram</Text>
                  <Text variant="body1" color={theme.colors.neutral.x999}>@buscabuffet</Text>
                </Box>
              </Box>
            </Box>

            <Box styleSheet={{
              width: size <= 820? '100%':'45%',
            }}>
              <Text variant="heading5semiBold" styleSheet={{textAlign: 'center', marginTop: !isMobile ? '' : '20px', margin: 0}} color={theme.colors.neutral.x999}>
                Envie sua mensagem
              </Text>
              <Text variant="body1" styleSheet={{textAlign: 'center', width: '90%'}} color={theme.colors.neutral.x999}>
                Para qualquer informação, dúvida ou comentário, por favor nos ligue ou preencha o fomulário:
              </Text>

              <Box tag="form" styleSheet={{marginTop: '.5rem'}}>
                <Box styleSheet={{paddingTop: '.5rem'}}>
                <Input type="text" placeholder="Nome:" styleSheet={{padding: '.5rem 1rem', borderRadius: '20px', border: `1px solid ${theme.colors.primary.x900}`, backgroundColor: theme.colors.neutral.x000}}/>
                </Box>
                <Box styleSheet={{
                  display: 'grid',
                  gridTemplateColumns:  size <= 1020? '1fr':'1fr 1fr',
                  gap: '1rem',
                  paddingTop: '1rem'
                }}>
                 <Input type="text" placeholder="E-mail:" styleSheet={{padding: '.5rem 1rem', borderRadius: '20px', border: `1px solid ${theme.colors.primary.x900}`, backgroundColor: theme.colors.neutral.x000, width: '100%'}}/>
                  <Input type="text" placeholder="Telefone:" styleSheet={{width: '100%', padding: '.5rem 1rem', borderRadius: '20px', border: `1px solid ${theme.colors.primary.x900}`, backgroundColor: theme.colors.neutral.x000}}/>
                </Box>
                <Box styleSheet={{paddingTop: '1rem'}}>
                <Input type="text" placeholder="Assunto:" styleSheet={{padding: '.5rem 1rem', borderRadius: '20px', border: `1px solid ${theme.colors.primary.x900}`, backgroundColor: theme.colors.neutral.x000}}/>
                </Box>
                <Box styleSheet={{paddingTop: '1rem'}}>
                <Input tag="textarea"  placeholder="Mensagem:" styleSheet={{height: '133px',padding: '.5rem 1rem', borderRadius: '20px', border: `1px solid ${theme.colors.primary.x900}`, backgroundColor: theme.colors.neutral.x000}}/>
                </Box>

                <Button fullWidth variant="contained" colorVariant="secondary" styleSheet={{padding: '.6rem 1rem', marginTop: '1rem'}}>Enviar</Button>
              </Box>

            </Box>
          <Box>
        </Box>
      </Box>
     
    </Box>
    )

}
