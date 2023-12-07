import { useContext, useEffect, useState } from 'react';
import Box from '@src/app/theme/components/Box/Box';
import LinkSystem from '../LinkSystem';
import { useRouter } from 'next/router';
import ActivePageContext from '@src/app/context/ActivePageContext';
import Icon from '@src/app/theme/components/Icon/Icon';
import theme from '@src/app/theme/theme';
import ButtonBase from '@src/app/theme/components/Button/ButtonBase';
import Image from '@src/app/theme/components/Image/Image';
import Logo from '../../../../../public/assets/logo_buffet.svg'
import SidebarMenuIsOpenClient from './Client';
import SidebarMenuIsOpenAdmin from './Admin';
import SidebarMenuBuffet from './Buffet';

const SidebarMenu = () => {

  //States
  const [href, setHref] = useState('');
  const [openSubmenus, setOpenSubmenus] = useState({Perfil: ''});

  //Utilities
  const router = useRouter();
  const { 
    setActivePage,
    isOpen,
    setIsOpen,
  } = useContext(ActivePageContext);

  //Functions
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmenuToggle = (menuName) => {
    setOpenSubmenus({
      ...openSubmenus,
      [menuName]: !openSubmenus[menuName]
    });
  };

  const activePageMenu = () =>{}


  //Hooks
  useEffect(()=>{
    activePageMenu
    setHref(window.document.location.pathname);
  }, [])


  return (
      <Box 
        styleSheet={{ 
          width: isOpen ? '20%' : '2.5%', 
          position: 'fixed', 
          top: 0, 
          left: 0,
          height: '100%', 
          background: 'white',
          transition: 'width 0.3s ease-out',
          boxShadow: `18px 4px 35px 0px ${theme.colors.neutral.x050}`
        }}
      >
        <ButtonBase styleSheet={{
          position: 'absolute',
          left: isOpen ? '80%' : '0',
          transition: 'left 0.3s ease-out',
          marginLeft: '1rem',
          padding: '2.5rem 0'
        }}
          onClick={handleMenuToggle}  
        >
          <Icon name='menuHamburguer'/>
        </ButtonBase>

        <Box tag='ul' styleSheet={{
          gap: '1rem',
        }}>

        {isOpen ?
        <Image styleSheet={{
            width:'150px',
            height: '120px',
            position: 'relative',
            cursor: 'pointer',
            ObjectFit: 'contain'
          }}
          onClick={(e)=>router.push('/')}
          src={Logo.src} 
          alt="" 
        />:<></>
        }
            
        {href.startsWith('/dashboard/cliente') === true && 
          <SidebarMenuIsOpenClient/>
        }

          
        {href.startsWith('/dashboard/admin') === true &&
          <SidebarMenuIsOpenAdmin/>
        }

        {href.startsWith('/dashboard/buffet') === true &&
          <SidebarMenuBuffet/>
        }
      </Box>
    </Box>
  );
};

export default SidebarMenu;
