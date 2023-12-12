
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import { StyleSheet } from "@src/app/theme/StyleSheet";

interface TableCelProps{
  fullWidth?: boolean;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  onMouseEnter?: any;
  onMouseLeave?: any;
}

export default function TableCell({
  styleSheet, 
  fullWidth, 
  children,
  onMouseEnter,
  onMouseLeave,
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Text styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center', color: theme.colors.neutral.x999}}>{children}</Text>
    </Box>
  )
}
