"use client"

import BoxDash from "@src/app/components/system/BoxDash";
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import Text from "@src/app/theme/components/Text/Text";
import TableHead from "@src/app/components/system/Table/TableHead";
import TableRow from "@src/app/components/system/Table/TableRow";
import TableCell from "@src/app/components/system/Table/TableCell";
import TableBody from "@src/app/components/system/Table/TableBody";
import FilterTableTime from "@src/app/components/system/FilterTableTime";
import Icon from "@src/app/theme/components/Icon/Icon";
import Image from "@src/app/theme/components/Image/Image";
import CoffeImage from '../../../../../../../../public/assets/icons/coffee.png'
import Pagination from "@src/app/components/system/Pagination";
import { useContext, useEffect, useState } from "react";
import BuffetService from "@src/app/api/BuffetService";
import { UserContext } from "@src/app/context/UserContext";
import moment from "moment-timezone";
import { FilterArrows } from "@src/app/content/system/admin/screens/pages/common/FilterArrows";
import { useFilterFunctions } from "@src/app/content/system/admin/screens/pages/common/useFilterFunctions";

const Homedash = () =>{

  const theme = useTheme();
  const [viewElements, setViewElements] = useState(0)

  const [propostas, setPropostas] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 5; // Define o número de elementos por página

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const {
    dataUser
  } = useContext(UserContext);

  
  function converterData(dataOriginal) {
    const dataConvertida = moment(dataOriginal).format('DD/MM/YYYY');
    return dataConvertida;
  }

  const {
    orderByGrowing,
    orderByDescending,
    orderByDateGrowing,
    orderByDateDescending,
    orderByStringGrowing,
    orderByStringDescending
    } = useFilterFunctions({hook: propostas, setHook: setPropostas})

    function DownloadLink(index){
      const fileURL = `https://buscabuffet.com.br${propostas[index]?.['arquivo'].path}`;
      const newTab = window.open(fileURL, '_blank');
    }

  useEffect(()=>{
    BuffetService.showBudgetsByStatus(dataUser?.['entidade']?.id)
    .then(res=>{
      setPropostas(res);
    }).catch(err=>{
      console.log(err)
    })
  }, [dataUser != null || dataUser != undefined])

  return(
    <Box styleSheet={{height: '100vh'}} tag="div">
      <BoxDash styleSheet={{flexDirection: 'row', justifyContent: 'left', gap: '2rem', width: '33%'}}>
        <Box styleSheet={{
          height: '84px',
          width: '84px',
          borderRadius: '100%',
          backgroundColor: theme.colors.primary.x1900,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
          }}>
            <Image src={CoffeImage.src} alt="Ícone de arquivo" styleSheet={{objectFit: 'contain'}}/>
        </Box>
        <Box>
          <Text variant="display1" color={theme.colors.neutral.x999}>{propostas?.length}</Text>
          <Text tag="p" color={theme.colors.neutral.x999}>Total de orçamentos</Text>
        </Box>
      </BoxDash>

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
          <FilterTableTime payments={propostas} setViewPayments={setPropostas}/>
        </Box>

        <Box tag="table">
          <TableHead>
            <TableRow styleSheet={{display: 'flex', flexDirection: 'row', gap: '0'}}>
              <TableCell>ID Proposta<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell>Nome do Buffet<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell>Data Disponibilidade<FilterArrows functionupArrow={orderByDateGrowing} functionDownArrow={orderByDateDescending} property="id"/></TableCell>
              <TableCell>QTD. pessoas<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell>Valor<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell>Observações<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell>Arquivo<FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {propostas?.slice(viewElements, viewElements + 20).map((item, index)=>(
              <TableRow key={index} styleSheet={{display: 'flex', flexDirection: 'row', flexWrap: 'no-wrap'}}>
                <TableCell>{item?.['id']}</TableCell>
                <TableCell>{item?.entidade?.['nome']}</TableCell>
                <TableCell>{converterData(item?.['data_do_evento'])}</TableCell>
                <TableCell>{item?.evento?.['qtd_pessoas']}</TableCell>
                <TableCell>{(item?.['valor']).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                <TableCell styleSheet={{textAlign: 'left', color: 'black', width: '15%'}}>{item?.['observacoes']}</TableCell>
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
      <Pagination currentPage={currentPage} qtdElements={propostas?.length} elementsPerPage={elementsPerPage} onPageChange={handlePageChange}/>
    </Box>
  )
}

export default Homedash;
