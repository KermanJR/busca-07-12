import { useContext, useEffect, useState } from 'react';
import Box from '@src/app/theme/components/Box/Box';
import LinkSystem from '../../LinkSystem';
import { useRouter } from 'next/router';
import ActivePageContext from '@src/app/context/ActivePageContext';
import Icon from '@src/app/theme/components/Icon/Icon';
import theme from '@src/app/theme/theme';
import MoneyImage from '../../../../../../public/assets/icons/money_symbol_svg.jpg'
import Text from '@src/app/theme/components/Text/Text';

const SidebarMenuIsOpenAdmin = () => {
  const [openedSubmenu, setOpenedSubmenu] = useState('');

  const [href, setHref] = useState('');
  const router = useRouter();
  const { setActivePage, isOpen, activePage } = useContext(ActivePageContext);
  
  const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', action: () => setActivePage('Dashboard') },
    { label: 'Assinaturas', icon: 'events', action: () => setActivePage('Assinaturas') },
    { label: 'Avaliações', icon: 'default_icon', action: () => setActivePage('Avaliações') },
    { label: 'Planos', icon: 'plans', action: () => setActivePage('Planos') },
    { label: 'Cupom', icon: 'cupom', action: () => setActivePage('Cupom') },
    { label: 'Voltar ao site', icon: 'site', action: () => router.push('/') }
];

  const toggleSubmenu = (label) => {
    if (openedSubmenu === label) {
      setOpenedSubmenu(''); // fecha o submenu se já estiver aberto
    } else {
      setOpenedSubmenu(label); // abre o submenu
    }
  };


  const menuItemStyle = (itemLabel) => ({
    padding: '1rem 1.5rem',
    borderLeft: activePage === itemLabel ? `6px solid ${theme.colors.primary.x500}` : '',
    backgroundColor: activePage === itemLabel ? theme.colors.primary.x1900 : theme.colors.neutral.x000
  });

  const menuItemStyleClosed = (itemLabel) => ({
    marginTop: '2rem',
    paddingLeft: '1rem',
    backgroundColor: activePage === itemLabel ? theme.colors.primary.x1900 : theme.colors.neutral.x000
  });

  const linkStyle = (itemLabel) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: '.5rem',
    color: activePage === itemLabel ? theme.colors.primary.x500 : theme.colors.neutral.x700
  });

  useEffect(() => {
    setHref(window.document.location.pathname);
  }, []);

  return (
    <>
    {isOpen? 
    <Box styleSheet={{marginTop: '-1rem'}}>
    {menuItems.map((item) => (
      <Box key={item.label} tag='li' styleSheet={menuItemStyle(item.label)}>
        <LinkSystem
          href=""
          key={item?.label}
          onClick={() => item.action()}
          styleSheet={linkStyle(item.label)}
        >
          <Icon name={item.icon} fill={theme.colors.neutral.x500} />
          <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10rem'}}>
            {isOpen && item.label != 'Voltar ao site'? 
              <Text color={theme.colors.neutral.x900}>{item.label}</Text>
              :
              <>
                <Text color={theme.colors.neutral.x900}>{item.label}</Text>
                <Icon name='arrowChevronRight'/>
              </>
            }
          </Box>
        </LinkSystem>
      </Box>
    ))}
  </Box>
  :
  <Box styleSheet={{marginTop: '5.5rem'}}>
    {menuItems.map((item) => (
      <Box key={item.label} tag='li' styleSheet={menuItemStyleClosed(item.label)}>
        <LinkSystem
        key={item?.label}
          href=""
          onClick={() => {item.action()}}
          styleSheet={linkStyle(item.label)}
        >
          <Icon name={item.icon} fill={theme.colors.neutral.x500} />
        </LinkSystem>
    </Box>
  ))}
</Box>
  }
    

  </>
  )
};

export default SidebarMenuIsOpenAdmin;
