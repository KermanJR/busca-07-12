'use client'

import { dataTable } from "@src/app/components/system/Mockup";
import TableCell from "@src/app/components/system/Table/TableCell";
import TableHead from "@src/app/components/system/Table/TableHead";
import TableRow from "@src/app/components/system/Table/TableRow";
import TableBody from "@src/app/components/system/Table/TableBody";
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import Text from "@src/app/theme/components/Text/Text";
import Pagination from "@src/app/components/system/Pagination";
import { useEffect, useState } from "react";
import BuffetService from "@src/app/api/BuffetService";
import { FilterArrows } from "../common/FilterArrows";
import { useFilterFunctions } from "../common/useFilterFunctions";

const Signatures = () =>{

  const theme = useTheme();

  const [signatures, setSignatures] = useState<any>([])
  const [viewElements, setViewElements] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 5; // Define o número de elementos por página
  const {
    orderByGrowing,
    orderByDescending,
    orderByDateGrowing,
    orderByDateDescending,
    orderByStringGrowing,
    orderByStringDescending
    } = useFilterFunctions({hook: signatures, setHook: setSignatures})

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
  
    };

    function calcularDataExpiracao(dataString) {
      // Verifica se a dataString é fornecida
      if (!dataString) {
        return 'Data inválida';
      }
    
      // Converte a string para um objeto Date
      const dataOriginal = new Date(dataString);
    
      // Verifica se a conversão foi bem-sucedida
      if (isNaN(dataOriginal.getTime())) {
        return 'Data inválida';
      }
    
      // Adiciona 90 dias à data original
      const dataExpiracao = new Date(dataOriginal);
      dataExpiracao.setDate(dataOriginal.getDate() + 90);
    
      // Formata a nova data para o formato DD/MM/AAAA
      const dia = String(dataExpiracao.getDate()).padStart(2, '0');
      const mes = String(dataExpiracao.getMonth() + 1).padStart(2, '0');
      const ano = dataExpiracao.getFullYear();
    
      return `${dia}/${mes}/${ano}`;
    }
    
  
    

  useEffect(() => {
    BuffetService.showSignatures().then((result) => setSignatures(result))
  }, [])

  return(
    <Box styleSheet={{display: 'flex', height: 'auto'}}>
      <Box 
        styleSheet={{
        width: '100%',
        padding: '2rem',
        borderRadius: '8px',
        display: 'flex',
        backgroundColor: theme.colors.neutral.x000,
        boxShadow: `0px 12px 23px 0px ${theme.colors.neutral.x100}`,
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '.4rem',
      }}>

        <Box tag="table">
          <TableHead>
            <TableRow styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <TableCell><p>ID</p> <FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell><p>Data Início</p> <FilterArrows functionupArrow={orderByDateGrowing} functionDownArrow={orderByDateDescending} property="updated_at"/></TableCell>
              <TableCell><p>Data Fim</p> <FilterArrows functionupArrow={orderByDateGrowing} functionDownArrow={orderByDateDescending} property="updated_at"/></TableCell>
              <TableCell><p>Nome</p> <FilterArrows functionupArrow={orderByStringGrowing} functionDownArrow={orderByStringDescending} property="entidade.nome"/></TableCell>
              <TableCell><p>Valor</p> <FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="valor"/></TableCell>
              <TableCell><p>Desconto</p> <FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="desconto"/></TableCell>
              <TableCell><p>Status</p> <FilterArrows functionupArrow={orderByStringGrowing} functionDownArrow={orderByStringDescending} property="status"/></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {signatures?.slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage)
          ?.map((item, index)=>(
              <TableRow key={index} styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <TableCell>{item?.['id']}</TableCell>
                <TableCell>{new Date(item?.['updated_at']).toLocaleDateString()}</TableCell>
                <TableCell>{calcularDataExpiracao(item?.['updated_at'])}</TableCell>
                <TableCell>{item?.['entidade']['nome']}</TableCell>
                <TableCell>R$ {item?.['valor']}</TableCell>
                <TableCell>R$ {item?.['desconto']}</TableCell>

                {item.status == "Nova assinatura" && (
                  <Box tag="td"
                  styleSheet={{
                    padding: '.7rem',
                    borderRadius: '10px',
                    backgroundColor: theme.colors.secondary.x1600
                  }}    
                >
                  <Text styleSheet={{
                      color: theme.colors.secondary.x800,
                      textAlign: 'center'
                    }}
                  >
                    {item?.['status']}
                  </Text>
                </Box>
                )}


                {item.status === 'TRIAL' && (
                  <Box tag="td"
                  styleSheet={{
                    padding: '.7rem',
                    borderRadius: '10px',
                    backgroundColor: theme.colors.positive.x050
                  }}    
                >
                  <Text styleSheet={{
                      color: theme.colors.positive.x300,
                      textAlign: 'center'
                    }}
                  >
                    Ativo/Trial
                  </Text>
                 
                </Box>
                )}
                {(item.status === "PENDENTE" || item.status == null) && (
                  <Box tag="td"
                  styleSheet={{
                    padding: '.7rem',
                    borderRadius: '10px',
                    backgroundColor: theme.colors.negative.x050
                  }}
                >
                  <Text styleSheet={{
                      color: theme.colors.negative.x300,
                      textAlign: 'center'
                    }}
                  >
                    Pendente
                  </Text>
                 
                </Box>
                )}

              {item.status === 'CANCELED'  && (
                  <Box tag="td"
                  styleSheet={{
                    padding: '.7rem',
                    borderRadius: '10px',
                    backgroundColor: theme.colors.secondary.x1100,
                    color: theme.colors.secondary.x700
                  }}    
                >
                  <Text styleSheet={{
                       color: theme.colors.secondary.x700,
                      textAlign: 'center'
                    }}
                  >
                    Cancelada
                  </Text>
                
                </Box>
                )}
                
              </TableRow>
            ))}
          </TableBody>
        </Box>
      </Box>
      <Pagination currentPage={currentPage} qtdElements={signatures.length} elementsPerPage={elementsPerPage} onPageChange={handlePageChange}/>
    </Box>
  )
}

export default Signatures;
