import { useRouter } from 'next/router';
import Box from '@src/app/theme/components/Box/Box';
import Text from '@src/app/theme/components/Text/Text';
import { useTheme } from '@src/app/theme/ThemeProvider';
import { useContext, useEffect } from 'react';
import ActivePageContext from '@src/app/context/ActivePageContext';
import Notifications from '../Notifications';
import Settings from '../Settings';
import Perfil from '../Perfil';
import { UserContext } from '@src/app/context/UserContext';
import BiUser from 'react-icons/bi'

const SubHeader = () => {

  const theme = useTheme();
  const router = useRouter();
  const { activePage, widthSideMenu, setWidthSizeMenu } = useContext(ActivePageContext);

  
  const {
    dataUser,
    idEvent
  } = useContext(UserContext);

  const nome = dataUser['entidade']?.nome

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  return (
    <Box styleSheet={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: '120px',
      backgroundColor: theme.colors.neutral.x000,
      padding: '2rem 3rem',
      zIndex: '20',
      boxShadow: `50px 4px 35px 0px ${theme.colors.neutral.x200}`
    }}>
      <Box>
        <Text variant='heading3semiBold' color={theme.colors.neutral.x999}>{capitalizeFirstLetter(activePage)}</Text>
        <Box>
          {activePage === 'Dashboard' && router.pathname === '/dashboard/buffet' && idEvent === null &&
            <Text variant='caption' color={theme.colors.neutral.x800}>Bem vindo, {nome}!</Text>
          }
           {idEvent &&
            <Text variant='caption' color={theme.colors.neutral.x800}>Responda a solicitação do cliente</Text>
          }
          {activePage === 'Dashboard' && router.pathname === '/dashboard/admin' &&
            <Text variant='caption' color={theme.colors.neutral.x800}>Bem vindo, {nome}!</Text>
          }
          {activePage === 'Dashboard' && router.pathname === '/dashboard/cliente' &&
            <Text variant='caption' color={theme.colors.neutral.x800}>Bem vindo, Cliente!</Text>
          }
          {activePage === 'Assinaturas' &&
             <Text variant='caption' color={theme.colors.neutral.x800}>Consulte as assinaturas</Text>
          }
          {activePage === 'Avaliações' &&
             <Text variant='caption' color={theme.colors.neutral.x800}>Consulte todos os buffets que estão na avaliação gratuita</Text>
          }
          {activePage === 'Imagens' &&
             <Text variant='caption' color={theme.colors.neutral.x800}>Adicione as melhores imagens do seu espaço</Text>
          }
          {activePage === 'Cadastro' &&
             <Text variant='caption' color={theme.colors.neutral.x800}>Adicione informações pertinentes para seus clientes</Text>
          }
          {activePage === 'Planos' &&
             <Text variant='caption' color={theme.colors.neutral.x800}>Edite  e consulte os planos disponíveis </Text>
          }

        </Box>
      </Box>

      <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '3rem', alignItems: 'center'}}>
        <Notifications/>

        {
          dataUser['usuario']?.id_perfil != 1 && (
            <Settings/>
          )
        }
        
        <Perfil/>
      </Box>
    </Box>
  );
};

export default SubHeader;
