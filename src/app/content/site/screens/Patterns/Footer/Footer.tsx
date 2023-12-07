import Box from "@src/app/theme/components/Box/Box";
import Icon from "@src/app/theme/components/Icon/Icon";
import Image from "@src/app/theme/components/Image/Image";
import Link from "@src/app/theme/components/Link/Link";
import Text from "@src/app/theme/components/Text/Text";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Logo from '../../../../../../public/assets/logo_buffet.svg';
import DownFooter from "./DownFooter";
import React from "react";
import useResponsive from "@src/app/theme/helpers/useResponsive";

export default function Footer(){

  const theme = useTheme()
  const isMobile = useResponsive();
  
  return(
    <React.Fragment>
      <Box tag="footer"
        styleSheet={{
          display: 'flex',
          flexDirection: `${isMobile ? 'column' : 'row'}`,
          height: 'auto',
          width: '100%',
          backgroundColor: theme.colors.neutral.x050,
          color: theme.colors.neutral.x000,
          padding: `${isMobile ? '1rem' : '3.5rem'}`,
          textAlign: 'left',
          justifyContent: 'space-between',
          marginTop: '4rem',
        }}
      >  
        <Box>
          <Image src={Logo.src}  alt="Logo-Buffet" styleSheet={{height: '113px', width: '210px', objectFit: 'cover'}}/>
        </Box>

        {/* Institucional */}
        <Box tag="ul" styleSheet={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Box tag="li">
            <Text variant="heading4semiBold">Institucional</Text>
          </Box>
          <Box tag="li">
            <Link href="/sobre-nos" variant="body2">Sobre nós</Link>
          </Box>
          <Box tag="li">
            <Link href="/termos-de-uso" variant="body2">Termos de uso</Link>
          </Box>
          <Box tag="li">
            <Link href="/politica-de-privacidade" variant="body2">Política de privacidade</Link>
          </Box>
        </Box>

        
        {/* Descubra */}
        <Box tag="ul" styleSheet={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Box tag="li">
            <Text variant="heading4semiBold">Descubra</Text>
          </Box>
          <Box tag="li">
            <Link href="/sobre-nos" variant="body2">Como funciona</Link>
          </Box>
          <Box tag="li">
            <Link href="/termos-de-uso" variant="body2">Anuncie seu buffet</Link>
          </Box>
        </Box>

        {/*Categorias*/}
        <Box tag="ul" styleSheet={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Box tag="li">
            <Text variant="heading4semiBold">Categorias</Text>
          </Box>
          <Box tag="li">
            <Link href="/sobre-nos" variant="body2">Lúdico</Link>
          </Box>
          <Box tag="li">
            <Link href="/termos-de-uso" variant="body2">Eletrônico</Link>
          </Box>
          <Box tag="li">
            <Link href="/politica-de-privacidade" variant="body2">Circo</Link>
          </Box>
        </Box>


        <Box tag="ul" styleSheet={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Box tag="li">
            <Link href="/sobre-nos" variant="body2">Cinema</Link>
          </Box>
          <Box tag="li">
            <Link href="/termos-de-uso" variant="body2">Espaço para brincar</Link>
          </Box>
          <Box tag="li">
            <Link href="/politica-de-privacidade" variant="body2">Teatro</Link>
          </Box>
          <Box tag="li">
            <Link href="/politica-de-privacidade" variant="body2">Temático</Link>
          </Box>
        </Box>

        {/*Contato*/}
        <Box tag="ul" styleSheet={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Box tag="li">
            <Text variant="heading4semiBold" tag="h4" color={theme.colors.primary.x500}>Contatos</Text>
          </Box>
          <Box tag="li">
            <Box styleSheet={{display: 'flex', flexDirection: 'row'}}>
              <Icon name="facebook"/>
              <Link href="/" variant="body2">@buscaBuffet</Link>
            </Box>
          </Box>
          <Box tag="li">
            <Box styleSheet={{display: 'flex', flexDirection: 'row'}}>
              <Icon name="instagram" fill={theme.colors.primary.x500}/>
              <Link href="/" variant="body2">@buscaBuffet</Link>
            </Box>
          </Box>
        </Box>
      </Box>  
      <DownFooter/>
    </React.Fragment>
  )
}
