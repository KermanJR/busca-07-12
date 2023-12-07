import Box from "@src/app/theme/components/Box/Box";
import SideMenu from "@src/app/components/system/SidebarMenu";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ActivePageContext from "@src/app/context/ActivePageContext";
import SubHeader from "@src/app/components/system/Subheader";
import theme from "@src/app/theme/theme";
import Homedash from "../pages/Dashboard";
import EditPerfil from "../pages/Perfil";
import Budgets from "../pages/BudgetId";
import ImagesBuffet from "../pages/Images";
import Settings from "../pages/Settings"
import ListBudgets from "../pages/ListBugets";
import BuffetService from "@src/app/api/BuffetService";
import { UserContext } from "@src/app/context/UserContext";
import BudgetId from "../pages/BudgetId";

export default function ContentDashboard(){
 
  const PAGES = {
    'Dashboard': Homedash,
    'Perfil': EditPerfil,
    'Orçamentos': ListBudgets,
    'Imagens': ImagesBuffet,
    'Orçamento': Budgets,
    'Assinatura': Settings
  };

  const {
    activePage,
    setActivePage,
    isOpen
  } = useContext(ActivePageContext)

  const {
    setDataUser,
    idEvent
  } = useContext(UserContext)

  
  useEffect(() => {
    const storedUserId = localStorage.getItem('USER_ID');
    if (storedUserId) {
      const userId = parseInt(storedUserId);
      BuffetService.getUserData(userId)
        .then((response) => {
          setDataUser(response);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do usuário:', error);
        });
    }

  }, []);

  
  // Pega o componente baseado na chave do objeto PAGES
  const ContentComponent = PAGES[activePage] || 'Dashboard';
 
  return(
   
    <Box styleSheet={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>

        {/*Menu Lateral*/}
        <SideMenu/>

        {/* Main Content */}
        <Box styleSheet={{
          width: !isOpen ? '97.5%': '80%',
          position: 'fixed',
          right: '0',
          height: '100vh',
        }}>

          <SubHeader/>
          <Box styleSheet={{
            width: '100%',
            height: '80vh',
            padding: '3rem',
            backgroundColor: theme.colors.neutral.x050,
            overflowY: 'scroll',
            overflowX: 'hidden',  
   
          }}>
            {/*Conteúdo principal - [Dashboard, Eventos, Perfil]*/}
            {/* Seu código para renderizar o conteúdo principal */}
          {idEvent != null? (
            <BudgetId idEvent={idEvent} />
          ) : (
            <ContentComponent />
          )}
          </Box>
        </Box>
      </Box>
  )
}
