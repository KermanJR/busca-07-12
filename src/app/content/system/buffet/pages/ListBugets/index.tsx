"use client"

import BoxDash from "@src/app/components/system/BoxDash";
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import Text from "@src/app/theme/components/Text/Text";
import { dataTable } from "@src/app/components/system/Mockup";
import TableHead from "@src/app/components/system/Table/TableHead";
import TableRow from "@src/app/components/system/Table/TableRow";
import TableCell from "@src/app/components/system/Table/TableCell";
import TableBody from "@src/app/components/system/Table/TableBody";
import FilterTableTime from "@src/app/components/system/FilterTableTime";
import Pagination from "@src/app/components/system/Pagination";
import Icon from "@src/app/theme/components/Icon/Icon";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@src/app/context/UserContext";
import BuffetService from "@src/app/api/BuffetService";
import { FilterArrows } from "../../../admin/screens/pages/common/FilterArrows";
import { useFilterFunctions } from "../../../admin/screens/pages/common/useFilterFunctions";

const ListBudgets = () =>{

  const theme = useTheme();
  const [viewElements, setViewElements] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 5; 

  
  const [orcamentos, setOrcamentos] = useState([]);
  const [totalOrcamentos, setTotalOrcamentos] = useState([]);

  const {

    dataUser
  } = useContext(UserContext);


  const {
    orderByGrowing,
    orderByDescending,
    orderByDateGrowing,
    orderByDateDescending,
    orderByStringGrowing,
    orderByStringDescending
    } = useFilterFunctions({hook: orcamentos, setHook: setOrcamentos})




  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function formatarData(data) {
    const dataObj = new Date(data);
    
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); 
    const ano = dataObj.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }



   

    function DownloadLink(index){
      const fileURL = `https://buscabuffet.com.br${orcamentos[index]?.['arquivo'].path}`;
      const newTab = window.open(fileURL, '_blank');
    }

  useEffect(()=>{
    if(dataUser?.['entidade']?.id){
      BuffetService.showBudgetsByIdEntity(dataUser?.['entidade']?.id)
      .then((response)=>{
        setOrcamentos(response);
      }).catch(err=>{
        console.log(err)
      })
    }
  }, [dataUser?.['entidade']?.id])
  
  return(
    <Box styleSheet={{height: '90vh'}} tag="div">
      <Box 
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
      }}>
        <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '2rem'}}>
          <Box>
            <Text variant='body3' styleSheet={{padding: '.5rem 0'}} color={theme.colors.neutral.x999}>Orçamentos Recentes</Text>
            <Text variant='caption' color={theme.colors.neutral.x800}>Consulte os orçamentos recentes</Text>
          </Box>
          <FilterTableTime payments={orcamentos} setViewPayments={setOrcamentos}/>
        </Box>

        <Box tag="table" >
          <TableHead>
            <TableRow styleSheet={{display: 'flex', flexDirection: 'row'}}>
              <TableCell>ID orçamento<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell>Buffet<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell>Valor<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell>Disponibilidade data<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell>Observações<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell>Arquivo<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orcamentos.slice(viewElements, viewElements + 20).map((item, index)=>(
              <TableRow key={index} styleSheet={{display: 'flex', flexDirection: 'row'}}>
                <TableCell>{item?.['id']}</TableCell>
                <TableCell>{item?.['evento']?.['nome']}</TableCell>
                <TableCell>{(item?.['valor']).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                <TableCell>{formatarData(item?.['data_disponibilidade'])}</TableCell>
                <TableCell styleSheet={{width: '20%'}}>{item?.['observacoes']}</TableCell>
                <TableCell styleSheet={{display: 'flex', justifyContent: 'center', alignItems: 'left'}}>
                  <Box onClick={(e)=>DownloadLink(index)}>
                    <Icon name="file" id='downloadLink' />
                  </Box>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Box>
      </Box>
      <Pagination
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        qtdElements={orcamentos.length}
        onPageChange={handlePageChange}
      />
    </Box>
  )
}

export default ListBudgets;
