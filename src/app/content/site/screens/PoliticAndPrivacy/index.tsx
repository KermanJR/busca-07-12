import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import { useContext, useEffect, useState } from "react";
import Text from "@src/app/theme/components/Text/Text";
import BannerAnotherPages from '../../../../../../public/assets/images/banner_another_pages.webp';
import ModalRegister from "../HomeScreen/Components/Modals/RegisterModal";
import ModalLogin from "../HomeScreen/Components/Modals/LoginModal";
import { ModalContext } from "@src/app/context/ModalContext";
import useSize from "@src/app/theme/helpers/useSize";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import ModalBudget from "../HomeScreen/Components/Modals/BudgetModal";
import WhatsAppButton from "../HomeScreen/Components/WhatsappButton";
import { UserContext } from "@src/app/context/UserContext";

export default function PoliticAndPrivacy(){

    const isMobile = useResponsive()
    const size = useSize()
    const theme = useTheme();

    const {
      isNovoModalOpen,
      closeNovoModal,
      closeBudgetModal,
      isModalOpenBudget
    } = useContext(ModalContext)
 

    const {setDataBuffet} = useContext(UserContext)

    useEffect(()=>{
      setDataBuffet([])
    }, [])
    

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


        {/*Banner Principal*/}      
        <Box styleSheet={{
            width: '100%',
            height: '281px',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            background: `url(${BannerAnotherPages.src})`,
            padding: `${isMobile ? (!(size <= 300) ? '5rem' : '3rem'): '6rem'}`
        }}>
            <Text 
            tag="h1" 
            variant="heading1Bold" 
            styleSheet={{color: theme.colors.neutral.x000, fontSize: !(size < 600) ? '2.5rem' : '1.5rem'}}>
                Política de Privacidade
            </Text>
        </Box>   
          
          <Box styleSheet={{padding: !(size < 600) ? '4rem 6.5rem' : '4rem 20px 1rem'}}>
            <Text variant="heading2Bold" styleSheet={{fontSize: !(size < 600) ? '2.2rem' : '1.5rem'}}>Nossa Política de Privacidade</Text>
            <Text variant="heading4semiBold"   styleSheet={{paddingTop: '1rem', fontSize: !(size < 600) ? '1.5rem' : '1rem'}}>Última atualização: 30/06/2023</Text>
            <Text variant="body1" styleSheet={{paddingTop: '1.5rem'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
            <Text variant="body1" styleSheet={{paddingTop: '1.5rem'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
            <Text variant="body1" styleSheet={{paddingTop: '1.5rem'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
            <Text variant="body1" styleSheet={{paddingTop: '1.5rem'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </Box>
          
        </Box>
    )

}
