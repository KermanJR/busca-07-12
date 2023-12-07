
import { dataTable } from "@src/app/components/system/Mockup";
import TableCell from "@src/app/components/system/Table/TableCell";
import TableHead from "@src/app/components/system/Table/TableHead";
import TableRow from "@src/app/components/system/Table/TableRow";
import TableBody from "@src/app/components/system/Table/TableBody";
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import Text from "@src/app/theme/components/Text/Text";
import Button from "@src/app/theme/components/Button/Button";
import { useContext, useEffect, useState } from "react";
import ModalDashboardCreateCupons from "./Modals/CreateCupons";
import ModalDashboardEditCupons from "./Modals/EditCupons";
import BuffetService from "@src/app/api/BuffetService";
import { FilterArrows } from "../common/FilterArrows";
import { useFilterFunctions } from "../common/useFilterFunctions";
import { UserContext } from "@src/app/context/UserContext";
import Icon from "@src/app/theme/components/Icon/Icon";
import BoxDash from "@src/app/components/system/BoxDash";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Cupons = () =>{

  const theme = useTheme();
  const [isModalOpenEditCupom, setIsModalOpenEditCupom] = useState(false);
  const [isModalOpenNewCupom, setIsModalOpenNewCupom] = useState(false);
  const [cupons, setCupons] = useState<any>([]);
  const [index, setIndex] = useState(0)
  const [id, setId] = useState(0)  
  const [isModalOpenHighlight, setIsModalOpenHighlight] = useState(false)
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const {
    orderByGrowing,
    orderByDescending,
    orderByDateGrowing,
    orderByDateDescending
  } = useFilterFunctions({hook: cupons, setHook: setCupons})

  const {
    setDataCupons,
  } = useContext(UserContext)

 
function DeleteCupom(id_cupom){
  BuffetService.deleteCupom(id_cupom)
  .then(res=>{
    BuffetService.showCupoms()
    .then(res=>{
      setCupons(res)
      setDataCupons(res)
    })
  })
}


  const EventActionPopup = ({item, index}) => (

    <Box styleSheet={{ 
      width: '100px',
      height: '40px',
      margin: '0 auto',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: '8px' ,
      borderRadius: '4px',
      padding: '4px',
      position: 'absolute',
      justifyContent: 'center',
      right: '-6rem',
      top: '-2rem',
      backgroundColor: theme.colors.neutral.x000,
      boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x050}`,
    }}>
        <FaRegEdit  size={20} color={theme.colors.secondary.x500}  onClick={(e)=>{setIndex(index), setId(item?.['id']), setIsModalOpenEditCupom(!isModalOpenEditCupom)}} style={{cursor: 'pointer', textAlign: 'center'}}/>
        <MdDelete  onClick={(e) => DeleteCupom(item['id'])} size={20} color="red"/>
    </Box>
  );

  useEffect(()=>{
    BuffetService.showCupoms()
    .then(res=>{
      setCupons(res)
      setDataCupons(res)
    })
  },[]);

  return(
    <Box styleSheet={{height: 'auto'}}>


      <Box 
        styleSheet={{
        height: 'auto',
        marginTop: '1rem',

        padding: '2rem',
        borderRadius: '8px',
        display: 'flex',
        backgroundColor: theme.colors.neutral.x000,
        boxShadow: `0px 12px 23px 0px ${theme.colors.neutral.x100}`,
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '.4rem',
      }}>

      {isModalOpenEditCupom &&(
        <ModalDashboardEditCupons isModalOpenEditCupom={isModalOpenEditCupom} setIsModalOpenEditCupom={setIsModalOpenEditCupom} cupons={cupons} setCupons={setCupons} index={index} id={id}/>
        )
      }

      {isModalOpenNewCupom &&(
        <ModalDashboardCreateCupons isModalOpenCreateCupom={isModalOpenNewCupom} setIsModalOpenCreateCupom={setIsModalOpenNewCupom} cupons={cupons} setCupons={setCupons}/>
      )}

        <Box tag="table">
          <TableHead>
            <TableRow styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <TableCell><p>Código</p></TableCell>
              <TableCell><p>Valor do plano</p> <FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="valor"/></TableCell>
              <TableCell><p>Desconto (%)</p> <FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="porcentagem"/></TableCell>
              <TableCell><p>Descrição</p></TableCell>
              <TableCell><p>Data Início</p> <FilterArrows functionupArrow={orderByDateGrowing} functionDownArrow={orderByDateDescending} property="data_inicio"/></TableCell>
              <TableCell><p>Data Fim</p> <FilterArrows functionupArrow={orderByDateGrowing} functionDownArrow={orderByDateDescending} property="data_fim"/></TableCell>
              <TableCell><p>Ações</p></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cupons.map((item, index)=>(
              <TableRow key={index} styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <TableCell>{item?.['codigo']}</TableCell>
                <TableCell>{`R$ ${item?.['valor']}`}</TableCell>
                <TableCell>{`${item?.['porcentagem']} %`}</TableCell>
                <TableCell>{item?.['descricao']}</TableCell>
                <TableCell>{item?.['data_inicio'].substring(0, 10).split('-').reverse().join('/')}</TableCell>
                <TableCell>{item?.['data_fim'].substring(0, 10).split('-').reverse().join('/')}</TableCell>

                <BoxDash
                  key={index}
                  styleSheet={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    height: '40px',
                    width: '20px',
                    position: 'relative',
                  }}
                  onMouseEnter={() => {setHoveredEvent(index), setIndex(item.id_entidade)}}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <Text variant="heading5semiBold">...</Text>
                  {hoveredEvent === index && (
                    <EventActionPopup item={item} index={index}/>
                  )}
                </BoxDash>
               
              </TableRow>
               
            ))}
          </TableBody>
        </Box>
          <Button styleSheet={{alignSelf: 'flex-start', width: '132px'}} fullWidth colorVariant="primary" onClick={() => setIsModalOpenNewCupom(true)}>Novo cupom</Button>
      </Box>
    </Box>
  )
}

export default Cupons;
