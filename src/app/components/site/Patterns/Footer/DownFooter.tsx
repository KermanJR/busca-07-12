import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import useSize from "@src/app/theme/helpers/useSize";
import { useTheme } from "@src/app/theme/ThemeProvider";

export default function DownFooter(){
  const theme = useTheme()
  const isMobile = useResponsive();
  const size = useSize()
  return(
    <Box tag="footer"
      styleSheet={{
        display: 'flex',
        flexDirection: 'row',
        height: '50px',
        width: '100%',
        backgroundColor: theme.colors.primary.x500,
        justifyContent: !isMobile ? 'left' : 'center',
        alignItems: 'center',
        padding: `${isMobile ? '1rem' : '1rem 4rem'}`,
        boxSizing: 'border-box'
      }}
    >  
        <Text tag="p" variant="small" color={theme.colors.neutral.x000} styleSheet={{
          textAlign: !isMobile ? 'left' : 'center',
        }}>Copyright © 2023 Busca Buffet.  Direitos reservados.</Text>
    </Box>
  )
}
