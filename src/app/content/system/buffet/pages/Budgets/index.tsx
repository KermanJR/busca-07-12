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
import FileImage from '../../../../../../../public/assets/icons/file_doc.png'
import DolarYellowImage from '../../../../../../../public/assets/icons/dolar_yellow_svg.png'
import ActivityImage from '../../../../../../../public/assets/icons/activity_svg.png'
import Image from "@src/app/theme/components/Image/Image";
import Pagination from "@src/app/components/system/Pagination";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@src/app/context/UserContext";
import BuffetService from "@src/app/api/BuffetService";

const Budgets = () =>{

  const theme = useTheme();
  const [viewElements, setViewElements] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 5; // Define o número de elementos por página

  const [orcamentos, setOrcamentos] = useState([]);
  const [totalOrcamentos, setTotalOrcamentos] = useState([]);

  const {
    setIdEvent,
    dataUser
  } = useContext(UserContext);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(()=>{
    if(dataUser?.['entidade']?.id){
      BuffetService.showEventsByIdEntity(dataUser?.['entidade']?.id)
      .then((response)=>{
        setOrcamentos(response);
      }).catch(err=>{
        console.log(err)
      })
    }
  }, [dataUser?.['entidade']?.id])

  return(
    <Box styleSheet={{height: '148vh'}}>
      <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '2rem'}}>
        <BoxDash styleSheet={{flexDirection: 'row', justifyContent: 'left', gap: '2rem', width: '25%'}}>
          <Box styleSheet={{
            height: '84px',
            width: '84px',
            borderRadius: '100%',
            backgroundColor: theme.colors.primary.x1900,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image src={ActivityImage.src} alt="Ícone de arquivo"/>
          </Box>
          <Box>
            <Text variant="display1" tag="p" color={theme.colors.neutral.x999}>279</Text>
            <Text tag="p" color={theme.colors.neutral.x999}>Orçamentos enviados</Text>
          </Box>
        </BoxDash>
        <BoxDash styleSheet={{flexDirection: 'row', justifyContent: 'left', gap: '2rem', width: '25%'}}>
          <Box styleSheet={{
            height: '84px',
            width: '84px',
            borderRadius: '100%',
            backgroundColor: theme.colors.primary.x1900,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image src={FileImage.src} alt="Ícone de arquivo"/>
          </Box>
          <Box>
            <Text variant="display1" tag="p" color={theme.colors.neutral.x999}>279</Text>
            <Text tag="p" color={theme.colors.neutral.x999} styleSheet={{width: '70%'}}>Solicitações de orçamentos recebidos</Text>
          </Box>
        </BoxDash>
        <BoxDash styleSheet={{flexDirection: 'row', justifyContent: 'left', gap: '2rem', width: '45.2%', backgroundColor: theme.colors.secondary.x700}}>
          <Box styleSheet={{
            height: '84px',
            width: '84px',
            borderRadius: '100%',
            backgroundColor: theme.colors.primary.x600,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image src={DolarYellowImage.src} alt="Ícone de arquivo"/>
          </Box>
          <Box >
            <Text variant="heading3Bold" tag="p" color={theme.colors.neutral.x000}>Aviso</Text>
            <Text tag="p" color={theme.colors.neutral.x000} styleSheet={{width: '70%'}}>Não perca a oportunidade de continuar desfrutando de todos os benefícios! Renove sua assinatura.</Text>
          </Box>
        </BoxDash>
      </Box>

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
        justifyContent: 'space-between',
        gap: '.4rem',
      }}>
        <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '2rem'}}>
          <Box>
            <Text variant='body3' styleSheet={{padding: '.5rem 0'}} color={theme.colors.neutral.x999}>Propostas Recentes</Text>
            <Text variant='caption' color={theme.colors.neutral.x800}>Consulte as propostas recentes</Text>
          </Box>
          <FilterTableTime/>
        </Box>

        <Box tag="table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataTable?.slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage)
          ?.map((item, index)=>(
              <TableRow key={index} >
                <TableCell>{item?.['orderNumber']}</TableCell>
                <TableCell>{item?.['data']}</TableCell>
                <TableCell>{item?.['customerName']}</TableCell>
                <TableCell>{item?.['value']}</TableCell>
                <Box tag="td"
                  styleSheet={{
                    padding: '.7rem',
                    borderRadius: '10px',
                    backgroundColor: item?.status === 'Não clicou no whatsapp'? 
                    theme.colors.negative.x050 : theme.colors.positive.x050
                  }}    
                >
                  <Text styleSheet={{
                      color: item?.status === 'Não clicou no whatsapp'? 
                      theme.colors.negative.x300 : theme.colors.positive.x400,
                      textAlign: 'center'
                    }}
                  >
                    {item?.['status']}
                  </Text>
                 
                </Box>
              </TableRow>
            ))}
          </TableBody>
        </Box>
      </Box>
      <Pagination
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        qtdElements={dataTable.length}
        onPageChange={handlePageChange}
      />
    </Box>
  )
}

export default Budgets;
