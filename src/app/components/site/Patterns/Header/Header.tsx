import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Button from "@src/app/theme/components/Button/Button";
import Image from "@src/app/theme/components/Image/Image";
import Logo from '../../../../../../public/assets/logo_buffet.svg';
import UserImage from '../../../../../../public/assets/icons/user_svg.jpg';
import Link from "@src/app/theme/components/Link/Link";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import Icon from "@src/app/theme/components/Icon/Icon";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@src/app/context/ModalContext";
import useSize from "@src/app/theme/helpers/useSize";
import {useRouter} from "next/router";
import BuffetService from "@src/app/api/BuffetService";
import { UserContext } from "@src/app/context/UserContext";
import { BiLogOutCircle } from "react-icons/bi";

export default function Header(){

  let pathname;

  const theme = useTheme();
  const isMobile = useResponsive();
  const size = useSize();
  const router = useRouter()
  const {
    openBudgetModal
  } = useContext(ModalContext)

  const {
    setDataUser,
    dataUser,
    dataBuffet
  } = useContext(UserContext)



  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!isSideMenuOpen);
  };

  


  let idRole;
  if (typeof window !== 'undefined') {
    idRole = JSON.parse(window.localStorage.getItem('USER_ROLE'))
  }

  useEffect(()=>{
    if(dataUser['usuario']?.id_perfil == 1){
      pathname = '/dashboard/admin'
    }else if(dataUser['usuario']?.id_perfil==2){
      pathname = '/dashboard/buffet'
    }else if(dataUser['usuario']?.id_perfil==3){
      pathname = '/dashboard/cliente'
    }
  }, [dataUser])


  let id;
  if (typeof window !== 'undefined') {
    id = JSON.parse(window.localStorage.getItem('USER_ID'))
  }

  useEffect(()=>{
    BuffetService.showOneUser(id)
    .then(res=>{
      setDataUser(res)
    }).catch(err=>{
      console.log(err)
    })

  }, [id])





  
  return(
    !isMobile ? 
      <Box styleSheet={{
        position: 'fixed',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0 2vw',
        alignItems: 'center',
        margin: '0 auto',
        zIndex: '4',
        color: theme.colors.neutral.x000,
        backgroundColor: theme.colors.neutral.x000,
        borderBottom: `1px solid ${theme.colors.neutral.x000}`,
        boxShadow: `0px 2px 8px ${theme.colors.neutral.x200}`
      }}
    >
      <Box styleSheet={{
          borderRadius: '8px',
          height: '100%',
          paddingHorizontal: '8px'
        }}
 
      >
        <Link href="/">
          <Image styleSheet={{
              width: '8vw',
              minWidth: '90px',
              maxWidth: '150px',
              height: '90px',
              objectFit: 'cover',
            }}
            src={Logo.src}
            alt="Logo-Buffet"
          />
        </Link>
      </Box>

      <Box styleSheet={{
          width: !(size < 1000) ? '33vw' : '200px',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: !(size <= 1200) ? 'center' : 'center',
          gap: !(size <= 1200) ? '3.5vw' : '1vw'
        }}
      >
        <Box><Link href="/" variant="heading6semiBold" styleSheet={{fontSize: !(size <= 1200) ? '1rem' : '0.8rem'}}>Home</Link></Box>
        <Box><Link href="/busca" variant="heading6semiBold" styleSheet={{fontSize: !(size <= 1200) ? '1rem' : '0.8rem'}}>Buffets</Link></Box>
        <Box><Link href="/orcamento-por-regiao" variant="heading6semiBold" styleSheet={{fontSize: !(size <= 1200) ? '1rem' : '0.8rem'}}>Orçamento por Região</Link></Box>
        <Box><Link href="/contato" variant="heading6semiBold" styleSheet={{fontSize: !(size <= 1200) ? '1rem' : '0.8rem'}}>Contato</Link></Box>
      </Box>

      <Box styleSheet={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '10px',
          alignItems: 'center',
          width: !(size < 1000) ? '500px' : '300px',
          marginRight: (size < 1200) ? '' : '0rem'
        }}
      >
        {dataUser?.['entidade']?.nome == null &&
           <button onClick={() => router.push('/login')} style={{color: 'black', paddingRight: '1rem', textDecoration: 'underline'}}><Text>Acesse o buffet</Text></button>
        }
        {dataUser?.['entidade']?.nome == null &&
  
        <Button variant="contained" colorVariant="secondary" size="lg" onClick={() => router.push('/login')}>Anuncie seu Buffet</Button>
        }


        
        {dataUser?.['entidade']?.nome ? 
        <Box>

          <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}  
          onClick={(e)=>router.push(`${pathname != undefined? pathname : ''}`)}>
          
            <Text>{dataUser?.['entidade']?.nome}</Text>

            <BiLogOutCircle size={30} onClick={BuffetService.logout}  style={{cursor: 'pointer', fill: theme.colors.primary.x600, marginLeft: '10px'}}/>
          </Box> 

          {dataUser?.['usuario']?.id_perfil== 1 &&
            <Text styleSheet={{fontSize: '.7rem', color: theme.colors.secondary.x500}}>Administrador</Text>
          }

          {dataUser?.['usuario']?.id_perfil== 2 &&
            <Text styleSheet={{fontSize: '.7rem', color: theme.colors.secondary.x500}}>Buffet</Text>
          }
          {dataUser?.['usuario']?.id_perfil== 3 &&
            <Text styleSheet={{fontSize: '.7rem', color: theme.colors.secondary.x500}}>Cliente</Text>
          }
          
          </Box>
            :  
          <Button colorVariant="secondary" variant="outlined" size="lg" onClick={openBudgetModal}>Login</Button>
         
        }
        
      </Box>

      
    </Box> 
    : 
    <Box styleSheet={{
      position: 'fixed',
      width: '100%',
      height: '50px',
      display: 'grid',
      gridTemplateColumns: '10fr 1fr',
      padding: '2rem',
      alignContent: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: '1',
      color: theme.colors.neutral.x000,
      backgroundColor: theme.colors.neutral.x000,
      boxShadow: `0px 2px 8px ${theme.colors.neutral.x200}`
    }}
  >
    <Image src={Logo.src} alt="logo" styleSheet={{width: '70px', height: '40px', objectFit: 'cover'}}/>
    <Icon name="menuHamburguer" fill={theme.colors.secondary.x500} onClick={toggleSideMenu}/>
    {isSideMenuOpen &&
        <Box styleSheet={{
          position: 'fixed',
          top: '0',
          right: '0',
          width: '250px',
          height: '100%',
          backgroundColor: theme.colors.neutral.x000,
          color: theme.colors.secondary.x500,
          overflowY: 'auto',
          zIndex: '1000', // para garantir que apareça acima de outros elementos
          transition: '0.3s',
          boxShadow: `-1px 1px 8px 1px #5e5e5e`
        }}>
          <Box styleSheet={{ padding: '1rem' }} onClick={toggleSideMenu}>
            <Text variant="btnBold">
              X
            </Text>
          </Box>
          <Box styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem'
          }}>
            <Link href="/Home">Home</Link>
            <Link href="/busca">Buffets</Link>
            <Link href="/orcamento-por-regiao">Orçamento por Região</Link>
            <Link href="/contato">Contato</Link>
          </Box>
        </Box>
      }
  </Box>
  
  )
}
