import Box from "@src/app/theme/components/Box/Box";
import BackgroundHome from '../../../../../../assets/images/background_home.webp';
import Image from "@src/app/theme/components/Image/Image";
import Text from "@src/app/theme/components/Text/Text";
import { useTheme } from "@src/app/theme/ThemeProvider";
import FormSearch from "../FormSearch/FormSearch";
import useSize from "@src/app/theme/helpers/useSize";

export default function Background(){

  const theme = useTheme();
  const size = useSize();

  return(
    <Box tag="div"
      styleSheet={{
        width: '100%',
        height: 'auto'
      }}
    >
      <Image
        src={BackgroundHome.src}
        alt="Background-home"
        styleSheet={{
          width: '100%',
          height: size <= 800 ? '50vh': '779vh',
          objectFit: 'cover'
        }}
      />
      <Box tag="div" styleSheet={{
        width: '100%',
        position: 'absolute',
        top: '15vh',
        display: 'flex',
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
      }}>
        <Text variant="heading1Bold" tag="h1"
          styleSheet={{
            color: theme.colors.neutral.x000, 
            fontWeight: 'bold',
            width: '50%',
            margin: '0 auto',
          }}>
          Orçamentos de forma rápida e prática em um só lugar.
          Orçamentos de forma rápida e prática em um só lugar.
        </Text>
      </Box>
      <FormSearch/>
    </Box>
  )
}
