
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import Button from "@src/app/theme/components/Button/Button";


export default function ModalDashboard({ isOpen, setIsModalOpen, styleSheet, children}) {
  const theme = useTheme();

  if (!isOpen) return null;

  return (
    <Box
      styleSheet={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: '120',
      }}
      
    >
      <Box
        styleSheet={{
          width: '321px',
          height: '238px',
          padding: '1rem',
          backgroundColor: theme.colors.neutral.x050,
          borderRadius: '1rem',
          ...styleSheet
        }}
      >
        <Button
          onClick={(e)=>setIsModalOpen(!isOpen)}
          fullWidth={false}
          styleSheet={{
            justifyContent: 'flex-end',
            backgroundColor: theme.colors.neutral.x050,
            color: theme.colors.neutral.x999,
            marginTop: '-1rem',
            marginLeft: '-1rem'
          }}
        >
          X
      </Button>
      {children}
      </Box>
    </Box>
  );
}
