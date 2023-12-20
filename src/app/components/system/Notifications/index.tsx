import { useRouter } from 'next/router';
import Box from '@src/app/theme/components/Box/Box';
import Text from '@src/app/theme/components/Text/Text';
import { useTheme } from '@src/app/theme/ThemeProvider';
import { useContext, useEffect, useState } from 'react';
import ActivePageContext from '@src/app/context/ActivePageContext';
import Icon from '@src/app/theme/components/Icon/Icon';
import io from "socket.io-client";
import { UserContext } from '@src/app/context/UserContext';
import BuffetService from '@src/app/api/BuffetService';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import TableCell from '../Table/TableCell';
import TableBody from '../Table/TableBody';
import Button from '@src/app/theme/components/Button/Button';

const Notifications = () => {

  const theme = useTheme();
  const [newProposalsCount, setNewProposalsCount] = useState(0); 
  const [isModalOpen, setIsModalOpen] = useState(false); // Passo 1
  const [selectedProposal, setSelectedProposal] = useState(null); // Passo 2
  const [propostas, setPropostas] = useState([]);
  const [recentProposals, setRecentProposals] = useState([]);

  const [recentSignatures, setRecentSignatures] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);

  const markNotificationAsRead = (notification) => {
    // Marcar a notificação como lida (você pode fazer isso de acordo com sua lógica)
    // Por exemplo, você pode fazer uma chamada para o servidor para marcar a notificação como lida.
  
    // Remover a notificação da lista de notificações recentes
    const updatedRecentProposals = recentProposals.filter((item) => item.id !== notification.id);
    setRecentProposals(updatedRecentProposals);
  
    // Adicionar a notificação marcada como lida à lista de notificações lidas
    setReadNotifications((prevState) => [...prevState, notification]);
  
    // Atualizar o contador de notificações não lidas
    setNewProposalsCount(newProposalsCount - 1);
  
    // Armazenar a notificação marcada como lida no localStorage
    window?.localStorage.setItem('readNotifications', JSON.stringify([...readNotifications, notification]));
  };
  
  


  const openModal = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const{
    dataUser
  } = useContext(UserContext);
  
  const [usersAndSignatures, setUsersAndSignatures] = useState([])

  useEffect(() => {
    if (dataUser?.['usuario']?.id_perfil == 2) {
      BuffetService.showEventsByIdEntity(dataUser?.['entidade']?.id)
        .then((response) => {
          setNewProposalsCount(response.length);
          const recent = response.slice(0, 5);
          setRecentProposals(recent);
        });
    }else if(dataUser?.['usuario']?.id_perfil == 3){
      BuffetService.showBudgetsByStatus(dataUser?.['entidade']?.id)
        .then((response) => {
          setNewProposalsCount(response.length);
          const recent = response.slice(0, 5);
          setRecentProposals(recent);
        });
    }
    else if(dataUser?.['usuario']?.id_perfil == 1){
      BuffetService.showSignatures()
        .then((response) => {
          setNewProposalsCount(response.length);
          const recent = response.slice(0, 5);
          setRecentSignatures(recent);
        });

        BuffetService.showUsers()
        .then((response) => {
          setNewProposalsCount(response.length);
          const recent = response.slice(0, 5);
          setRecentUsers(recent);
        });
        setUsersAndSignatures([...recentSignatures, ...recentUsers])
     
    }
  }, []);

  useEffect(() => {
    // Recupere as notificações marcadas como lidas do localStorage
    const storedReadNotifications = window?.localStorage.getItem('readNotifications');
  
    if (storedReadNotifications) {
      const parsedReadNotifications = JSON.parse(storedReadNotifications);
      setReadNotifications(parsedReadNotifications);
    }
  
    // Resto do código do useEffect
  }, []);
  
  


 
  return (
    <Box styleSheet={{
      backgroundColor: theme.colors.primary.x1900,
      width: '66px',
      height: '70px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
     }}>
      <Icon  onClick={() => openModal(recentProposals)} name='notifications' styleSheet={{cursor: 'pointer', height: '30px', width: '30px', objectFit: 'contain', justifyContent: 'center', alignItems: 'center', marginTop: '1.2rem'}} />
      {newProposalsCount > 0 && (
        <Box  styleSheet={{ background: 'red', color: 'white', width: '20px',  borderRadius: '100px', position: 'relative', top: '-3.5rem', right: '-2rem', 
          textAlign: 'center'
        }}>
          {newProposalsCount}
        </Box>
      )}
      {isModalOpen && selectedProposal && (
  <Box
    styleSheet={{
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}
  >
  
    <Box tag="table" styleSheet={{ width: '60%', backgroundColor: theme.colors.neutral.x050, borderRadius: '8px', height: 'auto'}}>
  
  <TableHead>
    <Box styleSheet={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
      <Text styleSheet={{padding: '1rem', color: 'black', fontSize: '1rem'}}>Notificações Recentes</Text>
      <Text onClick={closeModal}  styleSheet={{padding: '1rem', cursor: 'pointer'}}>X</Text>
    </Box>

    {dataUser?.['usuario']?.id_perfil === 1 && (
    <TableRow styleSheet={{ justifyContent: 'center' }}>
      <TableCell>Nova Notificação</TableCell>
    </TableRow>
  )}
  

  {dataUser?.['usuario']?.id_perfil === 2 && (
    <TableRow styleSheet={{ justifyContent: 'center' }}>
      <TableCell>ID Proposta</TableCell>
      <TableCell>Nome da Proposta</TableCell>
      <TableCell>Ações</TableCell>
    </TableRow>
  )}
  
    
    {dataUser?.['usuario']?.id_perfil === 3 && (
    <TableRow styleSheet={{ justifyContent: 'center' }}>
      <TableCell>ID Orçamento</TableCell>
      <TableCell>Nome do buffet</TableCell>
      <TableCell>Ações</TableCell>
    </TableRow>
    )}
  </TableHead>


  
  <TableBody >
    {dataUser?.['usuario']?.id_perfil === 3 && (
      recentProposals.length > 0 ?recentProposals.map((item, index) => (
        <TableRow key={index} styleSheet={{alignItems: 'center'}}>
          <Text>{item?.['id']}</Text>
          <Text styleSheet={{textAlign: 'left'}}>{item?.entidade?.nome}</Text>
          <Button onClick={() => markNotificationAsRead(item)} styleSheet={{ width: '170px' }}>
            Marcar como Lida
          </Button>
        </TableRow>
      )): <Text styleSheet={{margin: '4rem auto'}}>Não há novas notificações</Text>
    )}

    {dataUser?.['usuario']?.id_perfil === 2 && (
      recentProposals.length > 0 ? recentProposals.map((item, index) => (
        <TableRow key={index} styleSheet={{alignItems: 'center'}}>
          <Text>{item?.['id']}</Text>
          <Text styleSheet={{textAlign: 'left'}}>{item?.['nome']}</Text>
          <Button onClick={() => markNotificationAsRead(item)} styleSheet={{ width: '170px' }}>
            Marcar como Lida
          </Button>
        </TableRow>
      )): <Text styleSheet={{margin: '4rem auto'}}>Não há novas notificações</Text>
    )}

{dataUser?.['usuario']?.id_perfil === 1 && (
      usersAndSignatures.length > 0 ? usersAndSignatures.map((item, index) => (
        <TableRow key={index} styleSheet={{alignItems: 'center'}}>
          <Text>{item?.['id']}</Text>
          <Text styleSheet={{textAlign: 'left'}}>{item?.['nome']}</Text>
          <Button onClick={() => markNotificationAsRead(item)} styleSheet={{ width: '170px' }}>
            Marcar como Lida
          </Button>
        </TableRow>
      )) : <Text styleSheet={{margin: '4rem auto'}}>Não há novas notificações</Text>
    )}

    
  </TableBody>
</Box>


  </Box>
)}

    </Box>
  );
};

export default Notifications;
