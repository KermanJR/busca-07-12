import { useRouter } from 'next/router';
import Box from '@src/app/theme/components/Box/Box';
import Text from '@src/app/theme/components/Text/Text';
import { useTheme } from '@src/app/theme/ThemeProvider';
import { useContext } from 'react';
import ActivePageContext from '@src/app/context/ActivePageContext';
import { StyleSheet } from '@src/app/theme/StyleSheet';

interface BoxDashProps{
  fullWidth?: boolean;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const BoxDash = ({
  children,
  styleSheet,
  onMouseEnter,
  onMouseLeave,
  fullWidth
}: BoxDashProps) => {

  const theme = useTheme();

  return (
    <Box styleSheet={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.neutral.x000,
      width: '339px',
      height: '168px',
      borderRadius: '8px',
      padding: '1rem',
      ...styleSheet
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tag='div'
    >
      {children}
    </Box>
  );
};

export default BoxDash;
