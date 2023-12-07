import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Button from "@src/app/theme/components/Button/Button";
import Image from "@src/app/theme/components/Image/Image";
import Logo from '../../../../../../public/assets/logo_buffet.svg';
import Link from "@src/app/theme/components/Link/Link";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import Icon from "@src/app/theme/components/Icon/Icon";
import { useContext, useState } from "react";
import ModalLogin from "../../HomeScreen/Components/Modals/RegisterModal";
import { ModalContext } from "@src/app/context/ModalContext";
import { Router, useRouter } from "next/router";

export default function Header(){

  const theme = useTheme();
  const isMobile = useResponsive()

  const router = useRouter();
  const {
    isModalOpen,
    openModal,
    closeModal
  } = useContext(ModalContext)
  
  return(
    !isMobile ? 
      <Box styleSheet={{
        width: '100%',
        height: 'auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        justifyContent: 'space-between',
        padding: '0 3rem',
        alignItems: 'center',
        margin: '0 auto',
        color: theme.colors.neutral.x000,
        borderBottom: `1px solid ${theme.colors.neutral.x000}`
      }}
    >
      <Box styleSheet={{
          borderRadius: '8px',
          height: '85px',
          paddingHorizontal: '8px'
        }}
 
      >
        <Link href="/">
          <Image styleSheet={{
              width: '150px',
              height: '81px',
              objectFit: 'contain'
            }}
            src={Logo.src}
            alt="Logo-Buffet"
          />
        </Link>
      </Box>

      <Box styleSheet={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5rem'
        }}
      >
        <Box><Link href="/busca" variant="heading6semiBold">Buffets</Link></Box>
        {/*<Box><Link href="/planos" variant="heading6semiBold">Planos</Link></Box>*/}
        <Box><Link href="/contato" variant="heading6semiBold">Contato</Link></Box>
      </Box>

      <Box styleSheet={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'end'
        }}
      >
        <Button nameIcon="plus" hasIcon={true} variant="contained" colorVariant="secondary" size="lg" onClick={(e)=>router.push('/anuncie-seu-buffet')}>Anuncie seu Buffet</Button>
        <Button nameIcon="userPlus" hasIcon={true} colorVariant="secondary" variant="outlined" size="lg" onClick={openModal}>Entrar/Cadastrar</Button>
      </Box>
    </Box> 
    : 
    <Box styleSheet={{
      width: '100%',
      height: '50px',
      display: 'grid',
      gridTemplateColumns: '10fr 1fr',
      padding: '1rem',
      alignContent: 'center',
      alignItems: 'center',
      color: theme.colors.neutral.x000,
    }}
  >
    <Image src={Logo.src} alt="logo" styleSheet={{width: '70px', height: '40px', objectFit: 'cover'}}/>
    <Icon name="menuHamburguer" fill={theme.colors.secondary.x500}/>
  </Box>
  )
}
