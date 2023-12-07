import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import { useTheme } from "@src/app/theme/ThemeProvider";

export default function DownFooter(){
  const theme = useTheme()
  const isMobile = useResponsive();

  return(
    <Box tag="footer"
      styleSheet={{
        display: 'flex',
        flexDirection: 'row',
        height: '50px',
        width: '100%',
        backgroundColor: theme.colors.primary.x500,
        justifyContent: 'left',
        alignItems: 'center',
        padding: `${isMobile ? '1rem' : '1rem 4rem'}`,
        boxSizing: 'border-box'
      }}
    >  
        <Text tag="p" variant="small" color={theme.colors.neutral.x000}>Copyright © 2023 Busca Buffet.  Direitos reservados.</Text>
    </Box>
  )
}
