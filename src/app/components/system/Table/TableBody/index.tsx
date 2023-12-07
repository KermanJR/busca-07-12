
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";

interface TableBodyProps{
  fullWidth?: boolean;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
}

export default function TableBody({
  styleSheet, 
  fullWidth, 
  children,
  ...props
}: TableBodyProps){

  const theme = useTheme();
  const Tag = "tbody"

  return(
    <Box tag={Tag}
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '.4rem',
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

