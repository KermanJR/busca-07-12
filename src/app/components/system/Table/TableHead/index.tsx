
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";


interface TableHeadProps{
  fullWidth?: boolean;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
}

export default function TableHead({
  styleSheet, 
  fullWidth, 
  children,
  ...props
}: TableHeadProps){

  const theme = useTheme();
  const Tag = "thead"

  return(
    <Box tag={Tag}
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.4rem',
        borderBottom: `1px solid ${theme.colors.neutral.x100}`,
        ...(fullWidth &&{
          alignSelf: 'initial'
        }),
        ...styleSheet
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

