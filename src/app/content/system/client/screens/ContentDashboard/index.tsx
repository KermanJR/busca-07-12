import Box from "@src/app/theme/components/Box/Box";
import SideMenu from "@src/app/components/system/SidebarMenu";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Events from "../pages/Events";
import ActivePageContext from "@src/app/context/ActivePageContext";
import Homedash from "../pages/Dashboard";
import SubHeader from "@src/app/components/system/Subheader";
import theme from "@src/app/theme/theme";
import EditPerfil from "../pages/EditPerfil";
import { UserContext } from "@src/app/context/UserContext";
import BuffetService from "@src/app/api/BuffetService";

export default function ContentDashboard(){

  const PAGES = {
    'Dashboard': Homedash,
    'Eventos': Events,
    'Perfil': EditPerfil,
  };

  const {
    activePage,
    isOpen
  } = useContext(ActivePageContext)

  
  // Pega o componente baseado na chave do objeto PAGES
  const ContentComponent = PAGES[activePage] || 'Dashboard';

  const {
    setDataUser,
    idEvent
  } = useContext(UserContext)

  
  useEffect(() => {
    const storedUserId = localStorage.getItem('USER_ID');
    const storedUserIdRole = localStorage.getItem('USER_ROLE');
    if (storedUserId && storedUserIdRole == '3') {
      const userId = parseInt(storedUserId);
      BuffetService.getUserData(userId)
        .then((response) => {
          setDataUser(response);
          window.localStorage.setItem('USERNAME', response?.entidade?.nome)
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do usuário:', error);
        });
    }

  }, []);

 
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
            overflowY: 'scroll'
          }}>
            {/*Conteúdo principal - [Dashboard, Eventos, Perfil]*/}
            <ContentComponent/>
          </Box>
        </Box>
      </Box>
  )
}
