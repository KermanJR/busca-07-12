import { useMemo } from 'react';

function useFormatarMoeda() {
  return useMemo(() => {
    return (valor) => {
      if (typeof valor === 'number') {
        return valor.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      }
    };
  }, []);
}

export default useFormatarMoeda;
