
import Box from '@src/app/theme/components/Box/Box';
import { useTheme } from '@src/app/theme/ThemeProvider';
import { useContext } from 'react';
import ActivePageContext from '@src/app/context/ActivePageContext';
import TableRow from './TableRow';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { StyleSheet } from '@src/app/theme/StyleSheet';
import Text from '@src/app/theme/components/Text/Text';

export interface TableProps{
  fullWidth?: boolean;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  data?: [];
}

const Table = ({
    data,
    fullWidth,
    children,
    styleSheet,
    ...props
  }: TableProps) => {


  const theme = useTheme();

  const { activePage, widthSideMenu, setWidthSizeMenu } = useContext(ActivePageContext);


  return (
    <Box tag="table"
      styleSheet={{
        width: '100%',
        height: 'auto',
        marginTop: '2rem',
        padding: '2rem',
        borderRadius: '8px',
        display: 'flex',
        backgroundColor: theme.colors.neutral.x000,
        boxShadow: `0px 12px 23px 0px ${theme.colors.neutral.x100}`,
        flexDirection: 'column',
        gap: '.4rem',
        ...(fullWidth &&{
          alignSelf: 'initial'
        }),
        ...styleSheet
      }}
      {...props}
    >
      <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '2rem'}}>
        <Box>
          <Text variant='body3'>Orçamentos Recentes</Text>
          <Text variant='caption'>Consulte os orçamentos recentes</Text>
        </Box>
        
      </Box>
      <TableHead>
        <TableRow styleSheet={{flexDirection: 'row'}}>
          <TableCell>Order ID</TableCell>
          <TableCell>Buffet</TableCell>
          <TableCell>Valor</TableCell>
          <TableCell>Disponibilidade data</TableCell>
          <TableCell>Observações</TableCell>
          <TableCell>Arquivo</TableCell>
          <TableCell>Contato</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((item, index)=>(
          <TableRow>
            <TableCell>{item?.['orderNumber']}</TableCell>
            <TableCell>{item?.['customerName']}</TableCell>
            <TableCell>{item?.['value']}</TableCell>
            <TableCell>{item?.['paid']}</TableCell>
            <TableCell>{item?.['availability']}</TableCell>
            <TableCell>{item?.['type']}</TableCell>
            <TableCell>{item?.['communication']}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
      
    </Box>
  );
};

export default Table;
