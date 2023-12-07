
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import { StyleSheet } from "@src/app/theme/StyleSheet";

interface TableCelProps{
  fullWidth?: boolean;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
}

export default function TableCell({
  styleSheet, 
  fullWidth, 
  children,
  ...props
}: TableCelProps){

  const theme = useTheme();
  const Tag = "td"

  return(
    <Box tag={Tag}
      styleSheet={{
        gap: '2rem',
        ...(fullWidth &&{
          alignSelf: 'initial'
        }),
        ...styleSheet
      }}
      {...props}
    >
      <Text styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center', color: theme.colors.neutral.x999}}>{children}</Text>
    </Box>
  )
}
