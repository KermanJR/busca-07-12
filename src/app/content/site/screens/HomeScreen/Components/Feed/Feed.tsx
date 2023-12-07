import Box from "@src/app/theme/components/Box/Box";
import Icon from "@src/app/theme/components/Icon/Icon";
import Image from "@src/app/theme/components/Image/Image";
import Link from "@src/app/theme/components/Link/Link";
import Text from "@src/app/theme/components/Text/Text";
import React, { use } from "react";
import Button from "@src/app/theme/components/Button/Button";
import { useTheme } from "@src/app/theme/ThemeProvider";
import CapaFenix from '../../../../../../assets/works/fenix/capa-fenix.webp'
import theme from "@src/app/theme/theme";

interface FeedProps{
  children: React.ReactNode;
}
const date = new Date();
const year = date.getFullYear();


export default function Feed({children}: FeedProps){
  const theme = useTheme()
  return(
    <Box 
      styleSheet={{
        width: '100%',
        backgroundColor: theme.colors.neutral.x050,
        marginTop: '-300px',
        maxWidth: '683px',
        borderRadius: '8px',
        paddingVertical: '40px',
        paddingHorizontal: '32px'

    }}>
      {children}
    </Box>
  )
}

Feed.Header = ()=>{
  const theme = useTheme();
  return(
    <Box
      styleSheet={{
        borderBottom: `1px solid ${theme.colors.neutral.x200}`,
        marginBottom: '24px',
        paddingBottom: '24px'
      }}
    >
      <Box
        styleSheet={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '16px'
        }}
      >
        <Image
          styleSheet={{
            width: {xs: '100px', md: '128px'},
            height: {xs: '100px', md: '128px'},
            borderRadius: '100%'
          }} 
          src="https://github.com/kermanjr.png" 
          alt="Imagem de Perfil do KermanJR"
        />

        <Box styleSheet={{justifyContent: 'space-between'}}>
          <Box styleSheet={{flex: 1, justifyContent: 'space-between', display: {xs: 'none', md: 'flex'}}}>
            <Button fullWidth colorVariant="primary" size="xl">Portfólio</Button>
            <Button fullWidth colorVariant="neutral" size="xl" styleSheet={{
              display: 'flex',
              flexDirection: 'row',
              gap: '5px'
            }}>
              <Text
                tag="p"
              >
                Currículo
              </Text>
              <Icon name="arrowDown"/>
            </Button>
          </Box>
          <Box styleSheet={{flex: 2, justifyContent: 'space-between', display: {xs: 'flex', md: 'none'}}}>
            <Button fullWidth colorVariant="primary" size="xs">Portfólio</Button>
            <Button fullWidth colorVariant="neutral" size="xs">Currículo</Button>
          </Box>
        </Box>
      </Box>

      <Button.Base href="https://github.com/kermanjr.png">  
        <Text
          variant="heading4"
          tag="h1"
        >
          Kerman Mendes
        </Text>
      </Button.Base>

        <Text
           styleSheet={{
            color: theme.colors.primary.x500
           }}
        >
          Front End Developer
        </Text>
        <Text
          styleSheet={{
            fontSize: '.875rem',
            color: theme.colors.primary.x500
          }}
        >
          Javascript | ReactJS | NextJS | NodeJS
        </Text>
    

      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          paddingVertical: '1rem'
        }}
      >
        <Link href="https://github.com/KermanJR">
          <Icon name="github"/>
        </Link>
        <Link href="https://github.com/KermanJR">
          <Icon name="instagram"/>
        </Link>

      </Box>
    </Box>
  )
}

Feed.Posts = ()=>{
  return(
    <Box 
      styleSheet={{
        display: 'flex',
        flexDirection: 'row'
      }}>
      <Box
        styleSheet={{
          width: '99.9%'
        }}
      >
        <Text 
          variant="body1"
          styleSheet={{
            marginTop: '1rem',
            backgroundColor: theme.colors.primary.x500,
            fontWeigth: '700',
            paddingHorizontal: '10px',
            paddingVertical: '10px',
            borderRadius: '8px',
            color: '#fff'
          }}
        >
          Desenvolvimento de sistema Fênix Ato
        </Text>

        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            paddingVertical: '8px',
          }}
        >
          <Text
            variant="body3"
            styleSheet={{
              backgroundColor: theme.colors.neutral.x200,
              paddingHorizontal: '5px', 
              borderRadius: '8px'
            }}
          >
            ReactJS
          </Text>
          <Text
            variant="body3"
            styleSheet={{
              backgroundColor: theme.colors.neutral.x200,
              paddingHorizontal: '5px', 
              borderRadius: '8px'
            }}
          >
            ModuleCSS
          </Text>
        </Box>
          
        <Image
          styleSheet={{
            marginTop: '10px',
            borderRadius: '8px',
            objectFit: 'cover'
          }}
          src={CapaFenix.src}
          alt="Capa Página de login Fenix"
        />
      </Box>
      <Box
        styleSheet={{
          width: '.1%',
          backgroundColor: theme.colors.neutral.x300,
          alignSelf: 'end',
          justifyContent: 'end',
          height: '300px'
        }}
      >
      </Box>
    </Box>
    
  )
}
