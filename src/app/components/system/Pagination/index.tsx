import React, { useState } from 'react';
import Box from '@src/app/theme/components/Box/Box';
import Text from '@src/app/theme/components/Text/Text';
import { useTheme } from '@src/app/theme/ThemeProvider';

const Pagination = ({ currentPage, qtdElements, elementsPerPage, onPageChange }) => {
  const theme = useTheme();
  const totalPages = Math.ceil(qtdElements / elementsPerPage);


  // Função para determinar quais páginas mostrar com base na página ativa
  const getPagesToShow = () => {
    const pagesToShow = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      if (currentPage < 3) {
        pagesToShow.push(1, 2, 3, 4);
      } else if (currentPage > totalPages - 2) {
        pagesToShow.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pagesToShow.push(currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
      }
    }

    return pagesToShow;
  };

  // Função para lidar com a mudança de página
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <Box styleSheet={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem' }}>
      <Box>
        <Text>Total de {qtdElements}</Text>
      </Box>

      <Box styleSheet={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        <Box
          onClick={() => handlePageChange(currentPage - 1)}
          styleSheet={{
            padding: '1rem',
            cursor: 'pointer',
            borderRadius: '6px',
            backgroundColor: theme.colors.neutral.x500,
          }}
        >
          <Text color={theme.colors.neutral.x000}>{'<<'}</Text>
        </Box>

        <Box styleSheet={{
          backgroundColor: theme.colors.neutral.x200,
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'row',
          gap: '.5rem',
          padding: '5px',
        }}>
          {getPagesToShow().map(pageNumber => (
            <Box
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                cursor: 'pointer',
                borderRadius: '6px',
                padding: '5px 20px',
                backgroundColor: currentPage === pageNumber ? theme.colors.neutral.x000 : '',
              }}
            >
              <Text styleSheet={{ padding: '.5rem' }} color={theme.colors.neutral.x999}>
                {pageNumber}
              </Text>
            </Box>
          ))}
        </Box>

        <Box
          onClick={() => handlePageChange(currentPage + 1)}
          styleSheet={{
            padding: '1rem',
            cursor: 'pointer',
            borderRadius: '6px',
            backgroundColor: theme.colors.primary.x500,
          }}
        >
          <Text color={theme.colors.neutral.x000}>{'>>'}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Pagination;
