import BoxDash from "@src/app/components/system/BoxDash";
import { dataTable } from "@src/app/components/system/Mockup";
import TableCell from "@src/app/components/system/Table/TableCell";
import TableHead from "@src/app/components/system/Table/TableHead";
import TableRow from "@src/app/components/system/Table/TableRow";
import TableBody from "@src/app/components/system/Table/TableBody";
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import Icon from "@src/app/theme/components/Icon/Icon";
import Text from "@src/app/theme/components/Text/Text";
import { useEffect, useState } from "react";
import Pagination from "@src/app/components/system/Pagination";
import ModalDashboard from "@src/app/components/system/Modal";
import ModalDashboardEdit from "./Modals/ModalEdit"
import ModalDashboardDeactive from "./Modals/ModalDeactive"
import InputDash from "@src/app/components/system/InputDash";
import Button from "@src/app/theme/components/Button/Button";
import BuffetService from "@src/app/api/BuffetService";
import ModalHighlight from "./Modals/ModalHighlight";
import { useFilterFunctions } from "../common/useFilterFunctions";
import { FilterArrows } from "../common/FilterArrows";

const Assesment = () =>{

  const theme = useTheme();

  const [buffets, setBuffets] = useState<any>([])
  const [index, setIndex] = useState(null)
  const [nameBufet, setNameBuffet] = useState('')
  const [isModalOpenHighlight, setIsModalOpenHighlight] = useState(false)
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
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
    } = useFilterFunctions({hook: buffets, setHook: setBuffets})

  useEffect(() => {
    BuffetService.showAssessment().then((result) => setBuffets(result.filter((element) => Number(new Date(element.data_fim)) > Number(new Date()) || element.data_fim == null)
    ))
  }, [])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

  };
  

 
  const EventActionPopup = () => (
    <Box styleSheet={{ 
      width: '50px',
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
      right: '8rem',
      top: '-2rem',
      backgroundColor: theme.colors.neutral.x000,
      boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x050}`,
    }}>


        <Icon name="star"  onClick={(e) => setIsModalOpenHighlight(!isModalOpenHighlight)}/>
      

    </Box>
  );

  const [hoveredEvent, setHoveredEvent] = useState(null);

  return(
    <Box styleSheet={{height: '100vh'}}>

      {isModalOpenHighlight &&(
        <ModalHighlight isModalOpenHighLight={isModalOpenHighlight} setIsModalOpenHighlight={setIsModalOpenHighlight} index={index} nameBuffet={nameBufet}/>
        )
      }

     

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

        <Box tag="table">
          <TableHead>
            <TableRow>
              <TableCell><p>ID</p> <FilterArrows functionupArrow={orderByGrowing} functionDownArrow={orderByDescending} property="id"/></TableCell>
              <TableCell><p>Nome</p> <FilterArrows functionupArrow={orderByStringGrowing} functionDownArrow={orderByStringDescending} property="slug"/></TableCell>
              <TableCell><p>Data Final</p> <FilterArrows functionupArrow={orderByDateGrowing} functionDownArrow={orderByDateDescending} property="data_fim"/></TableCell>
              <TableCell><p>Ações</p> </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {buffets?.slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage)
          ?.map((item, index)=>(
              <TableRow key={index} >
                <TableCell>{item?.['id']}</TableCell>
                <TableCell>{item?.['slug']}</TableCell>
                <TableCell>{new Date(item?.['data_fim'] ?? new Date()).toLocaleDateString()}</TableCell>

                <BoxDash
                  key={index}
                  styleSheet={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    width: "100%",
                    height: '40px',
                    position: 'relative',
                  }}
                  onMouseEnter={() => {setHoveredEvent(index), setIndex(item.id_entidade), setNameBuffet(item.slug)}}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <Text variant="heading5semiBold">...</Text>
                  {hoveredEvent === index && (
                    <EventActionPopup />
                  )}
                </BoxDash>
              </TableRow>
            ))}
          </TableBody>
        </Box>
      </Box>
      <Pagination currentPage={currentPage} elementsPerPage={elementsPerPage} qtdElements={buffets.length}  onPageChange={handlePageChange}/>
    </Box>
  )
}

export default Assesment;
