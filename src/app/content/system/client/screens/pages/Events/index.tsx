import React, { useContext, useEffect, useState } from 'react';
import BoxDash from "@src/app/components/system/BoxDash";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import Icon from "@src/app/theme/components/Icon/Icon";
import Text from "@src/app/theme/components/Text/Text";
import Image from '@src/app/theme/components/Image/Image';
import FileImage from '../../../../../../../../public/assets/icons/file.jpg';
import theme from '@src/app/theme/theme';
import { UserContext } from '@src/app/context/UserContext';
import BuffetService from '@src/app/api/BuffetService';
import TableHead from '@src/app/components/system/Table/TableHead';
import TableRow from '@src/app/components/system/Table/TableRow';
import TableCell from '@src/app/components/system/Table/TableCell';
import TableBody from '@src/app/components/system/Table/TableBody';
import moment from 'moment-timezone';




const Events = () => {
  const EventActionPopup = ({ onEdit, onDelete, styleSheet, selectedProposta, selectedNomeEvento, idEvento}) => (
    <Box styleSheet={{ 
      display: 'flex',
      flexDirection: 'row',
      gap: '8px' ,
      borderRadius: '4px',
      padding: '4px',
      position: 'absolute',
      right: '-1rem',
      top: '-1rem',
      backgroundColor: theme.colors.neutral.x000,
      boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x050}`
      }}>
      <Icon name="trash" onClick={(e)=>handleDelete(idEvento)} />
      <Icon name="eye" onClick={(e)=>openModal(selectedProposta, selectedNomeEvento, selectedIdEvento)} />
    </Box>
  );

  const [propostas, setPropostas] = useState([])
  const [selectedProposta, setSelectedProposta] = useState([])
  const [selectedIdEvento, setSelectedIdEvento] = useState(null)

const {
  dataUser
} = useContext(UserContext)
  const theme = useTheme();
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [id, setId] = useState(null);
  const [nome, setNome] = useState(null);
  const [dataDisp, setDataDisp] = useState(null);
  const [qtdPessoas, setQtdPessoas] = useState(null);
  const [valor, setValor] = useState(null);
  const [obs, setObs] = useState(null);
  const [path, setPath] = useState(null);

  const openModal = (selectedProposta, selectedNomeEvento, idEvento) => {
    setSelectedIdEvento(idEvento)
    BuffetService.showBudgetsByStatus(selectedProposta)
    .then(res=>{
      let filtro = res?.filter((item, index)=> item?.evento?.nome === selectedNomeEvento
      )
      setSelectedProposta(filtro)
    }).catch(err=>{
      console.log(err)
    })
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleEdit = (index) => {
    //BuffetService.deleteEvento(index)

  };

  const handleDelete = (idEvento) => {
    BuffetService.deleteEvento(idEvento)
    .then(res=>{
      getEventsByStatus()
    }).catch(err=>{
      console.log(err)
    })
  };
  function DownloadLink(index){
    const fileURL = `https://buscabuffet.com.br${index}`;
    const newTab = window.open(fileURL, '_blank');
  }

  function converterData(dataOriginal) {
    const dataConvertida = moment(dataOriginal).format('DD/MM/YYYY');
    return dataConvertida;
  }
  
  useEffect(()=>{
    getEventsByStatus()
  }, [propostas != null])

  function getEventsByStatus(){
    BuffetService.showEventsByStatus(dataUser?.['entidade']?.id)
    .then(res=>{
      setPropostas(res);
    }).catch(err=>{
      console.log(err)
    })
  }

 
  const tiposEncontrados = {};
  const eventosUnicos = [];

  for (const evento of propostas) {
    if (!tiposEncontrados[evento.nome]) {
      tiposEncontrados[evento.nome] = true;
      eventosUnicos.push(evento);
    }
  }

 


  return (
    <Box styleSheet={{ display: "flex", flexDirection: "row", gap: "2rem", flexWrap: "wrap" }}>
      
      {isModalOpen &&(
        <Box styleSheet={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100}}>
        <Box styleSheet={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', width: '70%' }}>
        
          <button onClick={closeModal} style={{textAlign: 'left', fontWeight: 'bold'}}>X</button>
        <Box tag="table">
          <TableHead >
            <TableRow styleSheet={{display: 'flex', flexDirection: 'row', gap: 'none'}}>
              <TableCell>ID Orçamento</TableCell>
              <TableCell>Nome do Buffet</TableCell>
              <TableCell>Data Disponibilidade</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Observações</TableCell>
              <TableCell>Arquivo</TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>
           {
            selectedProposta.length > 0 ? selectedProposta.map((item, index)=>(
            <TableRow key={index} styleSheet={{display: 'flex', flexDirection: 'row', gap: 'none', justifyContent: 'space-between'}}>     
                <TableCell styleSheet={{width: '19%',  }}>{item?.['id']}</TableCell>
                <TableCell styleSheet={{width: '19%',  }}>{item?.['entidade']?.nome}</TableCell>
                <TableCell styleSheet={{width: '16%'}}>{converterData(item[0]?.['data_disponibilidade'])}</TableCell>
                <TableCell styleSheet={{width: '20%', marginLeft: '5rem'}}>{(item?.['valor'])?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                <Text styleSheet={{width: '20%', textAlign: 'left', color: 'black', marginLeft: '-5rem'}}>{item?.['observacoes']}</Text>
                <TableCell styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '16%', textAlign: 'right'}}>
                  <Box onClick={(e)=>DownloadLink(item?.['arquivo']?.path)} styleSheet={{marginRight: '5rem'}}>
                    <Icon name="file" id='downloadLink' />
                  </Box>
                </TableCell>
              </TableRow>
            )) : <Text styleSheet={{margin: '4rem auto'}}>Não há orçamentos enviados para o seu evento no momento.</Text>
           }
          </TableBody>
        </Box>
        </Box>
      </Box>
      )}
      {eventosUnicos?.map((eventTitle, index) => (
        <BoxDash
          key={index}
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            width: "201px",
            position: 'relative'
          }}
          onMouseEnter={() => setHoveredEvent(index)}
          onMouseLeave={() => setHoveredEvent(null)}
        >
          {hoveredEvent === index && (
            <EventActionPopup
            selectedNomeEvento={eventTitle?.nome}
            selectedProposta={dataUser['entidade'].id}
            idEvento={eventTitle?.id}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(eventTitle?.id)}
              styleSheet={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 10
              }}
            />
          )}
          
          <Box styleSheet={{
            width: "84px",
            height: "84px",
            borderRadius: "100%",
            backgroundColor: theme.colors.primary.x1900,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image src={FileImage.src} alt="Ícone de arquivo"/>
          </Box>
          <Text tag="p" styleSheet={{textAlign: 'center'}}>{eventTitle?.nome}</Text>
        </BoxDash>
      ))}
    </Box>
  );
};

export default Events;
