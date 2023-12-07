import { useRouter } from 'next/router';
import Box from '@src/app/theme/components/Box/Box';
import Text from '@src/app/theme/components/Text/Text';
import { useTheme } from '@src/app/theme/ThemeProvider';
import { useContext } from 'react';
import ActivePageContext from '@src/app/context/ActivePageContext';
import { UserContext } from '@src/app/context/UserContext';
import {BiLogOutCircle} from 'react-icons/bi'
import BuffetService from '@src/app/api/BuffetService';
import {FaUserAlt} from 'react-icons/fa'
const Perfil = () => {

  const theme = useTheme();

  const {dataUser} = useContext(UserContext);
  const nome = dataUser['entidade']?.nome;

  return (
    <Box styleSheet={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.primary.x500,
      width: 'auto',
      height: '65px',
      borderRadius: '8px',
      padding: '1rem',
      borderTopRightRadius: '50px',
      borderBottomRightRadius: '50px',
    }}>
      <Text color={theme.colors.neutral.x000} styleSheet={{width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px'}}>
        <BiLogOutCircle size={30} onClick={BuffetService.logout}  style={{cursor: 'pointer'}}/><Text styleSheet={{color: 'white'}}>Olá, {nome}!</Text>
      </Text>
      <Box styleSheet={{
        borderRadius: '100%',
        width: '65px',
        height: '65px',
        marginRight: '0',
        backgroundColor: theme.colors.neutral.x200,
        position: 'relative',
        left: '10px',
      }}>
        <FaUserAlt style={{height: '40px', width: '40px', margin: '0.7rem auto'}} fill={theme.colors.neutral.x800}/>
      </Box>

    </Box>
  );
};

export default Perfil;
