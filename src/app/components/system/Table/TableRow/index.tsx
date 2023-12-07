
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import { StyleSheet } from "@src/app/theme/StyleSheet";

interface TableRowProps{
  fullWidth?: boolean;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
}

export default function TableRow({
  styleSheet, 
  fullWidth, 
  children,
  ...props
}: TableRowProps){

  const theme = useTheme();
  const Tag = "tr"

  return(
    <Box tag={Tag}
      styleSheet={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        justifyContent: 'space-between',
        padding: '1rem',
        gap: '2rem',
        ...(fullWidth &&{
          alignSelf: 'center'
        }),
        ...styleSheet
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
