import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import { useTheme } from "@src/app/theme/ThemeProvider";
import FormSearch from "./Components/FormSearch";
import { FilterSection } from "./Components/FilterSection";
import { ResultSection } from "./Components/ResultSection";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import ModalRegister from "../HomeScreen/Components/Modals/RegisterModal";
import ModalLogin from "../HomeScreen/Components/Modals/LoginModal";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@src/app/context/ModalContext";
import useSize from "@src/app/theme/helpers/useSize";
import ModalBudget from "../HomeScreen/Components/Modals/BudgetModal";
import BuffetService from "@src/app/api/BuffetService";
import ModalRecoveryPassword from "../HomeScreen/Components/Modals/RecoveryPassword";
import WhatsAppButton from "../HomeScreen/Components/WhatsappButton";
import { UserContext } from "@src/app/context/UserContext";

export default function AdvertiseWithUsScreen(){

  const theme = useTheme();
  const isMobile = useResponsive();
  const size = useSize()
  
 

  const {
    isNovoModalOpen,
    closeNovoModal,
    closeBudgetModal,
    isModalOpenBudget,
    isModalRecoveryPassword,
    closeRecoveryPassword,
    openRecoveryPassword
  } = useContext(ModalContext)
  const {setDataBuffet} = useContext(UserContext)

  useEffect(()=>{
    window?.localStorage?.setItem('ID_BUFFET', '')
  }, [])


  useEffect(()=>{
    window?.localStorage?.setItem('ID_BUFFET', '')
  }, [])

  
  
  
  return(
    <Box
      tag="main"
      styleSheet={{
        backgroundColor: theme.colors.neutral.x000,
        alignItems: 'center',
        margin: '0 auto'
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
        height: '281px',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        background: theme.colors.primary.x500, // Cor do fundo alterada para azul
        padding: `${isMobile ? (!(size < 350) ? '5rem' : '3rem'): '6rem'}`,
        marginTop: '5rem'
      }}>
        <Text 
          tag="h1" 
          variant="heading1Bold" 
          styleSheet={{color: theme.colors.neutral.x000, fontSize: !(size < 600) ? '2.5rem' : '1.5rem'}}>
            Anuncie Conosco
        </Text>
      </Box>

      <Box styleSheet={{display: 'grid', gridTemplateColumns: !(size < 650) ? '1fr 4fr' : '1fr', gap: !(size < 950) ? '' : '5vw', width: '100%', padding: !(size < 950) ? '0 6rem' : (!(size <= 650) ? '20px' : '0px 5px')}}>
      {/* Filtros - Seção Esquerda */}
      <FilterSection/>

      {/* Resultados - Seção Direita */}
      <Box styleSheet={{width: '100%', margin: !(size < 950) ? '3rem 0px 0px' : (!(size < 400) ? '3rem auto 0px' : '0rem auto 0px'), padding: !(size < 950) ? '0 5rem' : ''}}>
        <FormSearch buttonLabel="Buscar"/>
      </Box>
    </Box>
   
    </Box>
  )
}
