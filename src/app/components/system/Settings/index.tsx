import { useRouter } from 'next/router';
import Box from '@src/app/theme/components/Box/Box';
import Text from '@src/app/theme/components/Text/Text';
import { useTheme } from '@src/app/theme/ThemeProvider';
import { useContext } from 'react';
import ActivePageContext from '@src/app/context/ActivePageContext';
import Icon from '@src/app/theme/components/Icon/Icon';


const Settings = () => {

  const theme = useTheme();

  const { activePage, widthSideMenu, setWidthSizeMenu, setActivePage } = useContext(ActivePageContext);


  return (
    <Box onClick={(e)=>setActivePage('Perfil')}
      styleSheet={{
        backgroundColor: theme.colors.secondary.x1800,
        width: '65px',
        height: '65px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }}>
      <Icon name='settings' styleSheet={{width: '30px', height: '30px'}}/>
    </Box>
  );
};

export default Settings;
