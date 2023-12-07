import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import InputDash from "@src/app/components/system/InputDash";
import Button from "@src/app/theme/components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@src/app/context/UserContext";
import BuffetService from "@src/app/api/BuffetService";
import Text from "@src/app/theme/components/Text/Text";

const EditPerfil = () =>{

  const theme = useTheme();
  
  //Data Address BUFFET
  const [cep, setCep] = useState<string>('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState<string>('');
  const [numero, setNumero] = useState<string>('');
  const [complemento, setComplemento] = useState<string>('');
  const [cidade, setCidade] = useState<string>(null);
  const [idCidade, setIdCidade] = useState<number>(null);
  const [idAddress, setIdAddress] = useState<number>(null);
  const [estado, setEstado] = useState<string>(null);
  const [nome, setNome] = useState<string>(null);
  const [idEstado, setIdEstado] = useState<number>(null);
  const [addressBuffet, setAddressBuffet] = useState<[]>([])

  const [phoneBuffet, setPhoneBuffet] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [message, setMessage] = useState<string>('');

  //Estados que estão no banco de dados
  const [states, setStates] = useState([]);

    //Variável de controle: EDIÇÃO || CRIAÇÃO do endereço do buffet
    const [modeAddress, setModeAddress] = useState('create');


  const {
    dataUser
  } = useContext(UserContext)

  async function CreateAddressUser(){
    BuffetService.createAddressBuffets(dataUser?.['entidade']?.id, {
      id_cidade: idCidade,
      cep: cep,
      bairro: bairro,
      complemento: complemento,
      rua: rua,
      numero: numero,
      contato: "",
      telefone: "",
      email: "",
      tipo: "C"
    }).then((response)=>{
     
        setMessage('Dados salvos com sucesso.')
    }).catch((error)=>{
      setMessage('Erro ao salvar dados, tente novamente.')
      console.log(error)
    })
  }

  async function EditAddressUser(){
    BuffetService.editAddressBuffets(idAddress, {
      id_cidade: idCidade,
      cep: cep,
      bairro: bairro,
      complemento: complemento,
      rua: rua,
      numero: numero,
      contato: " ",
      telefone: phoneBuffet,
      email: "",
      tipo: "C"
    }).then((response)=>{
      setRua(response?.rua)
      setBairro(response?.bairro)
      setCidade(response?.entidade?.enderecos[0].endereco.cidade.nome)
      setNumero(response?.numero)
      setCep(response?.cep)
      setIdCidade(response?.id_cidade)
      setAddressBuffet(response?.entidade?.enderecos);
      setIdAddress(response?.id);
      setMessage('Dados salvos com sucesso.')
    }).catch((error)=>{
      console.log(error)
      setMessage('Erro ao salvar dados, tente novamente.')
    })
  }
  

  function showStateBd(){
    BuffetService.showStatesBd()
      .then((response)=>{
        setStates(response);
        states.map(async (state)=>{
          if(state['sigla'] === estado){
            setIdEstado(state?.id)
            showCitiesBd(state?.id)
          }
        })
      }).catch((error)=>{
        console.log(error)
      })
  }

  function showCitiesBd(idEstado: number){
    BuffetService.showCitiesByIdState(idEstado)
      .then((response)=>{
        response.map(async (city)=>{
          if(city['nome'] === cidade.toUpperCase()){
            setIdCidade(city?.id)
          }else{
           ''
          }
        })
      }).catch((error)=>{
        console.log(error)
      })
  }
  



  
  //RETORNA OS DADOS DO BUFFET PELO SEU ID
  function GetUserById(){
    BuffetService.showUserByIdEntity(dataUser['entidade']?.id)
    .then((response) => {
        setNome(response?.entidade?.nome)
        setRua(response?.entidade?.enderecos[0].endereco.rua)
        setBairro(response?.entidade?.enderecos[0].endereco.bairro)
        setCidade(response?.entidade?.enderecos[0].endereco.cidade.nome)
        setNumero(response?.entidade?.enderecos[0].endereco.numero)
        setCep(response?.entidade?.enderecos[0].endereco.cep)
        setEstado(response?.entidade?.enderecos[0].endereco?.cidade?.estado?.sigla)
        setComplemento(response?.entidade?.enderecos[0].endereco?.complemento)
        setIdCidade(response?.entidade?.enderecos[0].endereco.cidade.id)
        setPhoneBuffet(response?.entidade?.enderecos[0].telefone)
        setAddressBuffet(response?.entidade?.enderecos);
        setIdAddress(response?.entidade?.enderecos[0].endereco.id);

        if(response?.entidade?.enderecos.length > 0){
          setModeAddress('edit')
        }
      
    })
    .catch((error) => {
      console.error('Erro ao buscar dados do Buffet:', error);
    });
  }

  useEffect(() => {
    showStateBd();
    GetUserById()
  }, []);

  useEffect(() => {
    const clearMessages = () => {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    };

    if (message) {
      clearMessages();
    }
  }, [message]);




  useEffect(()=>{
    BuffetService.getAddressByCEP(cep)
    .then((response)=>{
      setRua(response?.logradouro);
      setBairro(response?.bairro);
      setCidade(response?.localidade);
      setEstado(response?.uf);
      setCep(response?.cep)
      showStateBd();
    }).catch(err=>{
      console.log(err)
    })
  }, [cep.length === 8])

  async function handleSubmitCreate(e){
    e.preventDefault();
    const data = {
      "nome": nome
    }
    BuffetService.editUser(dataUser?.['entidade']?.id, data)
    if(modeAddress == 'edit'){
      await EditAddressUser();
    }else if(modeAddress == 'create'){
      await CreateAddressUser();
    }
   
  }



  return(
    <Box tag="form" styleSheet={{
      width: '100%',
      height: 'auto',
      backgroundColor: theme.colors.neutral.x000,
      borderRadius: '8px',
      padding: '3rem'
    }} onSubmit={handleSubmitCreate}>
      <Text styleSheet={{fontSize: '1.2rem', padding: '1rem 0', color: 'black'}}> Meus Dados</Text>
     <Box styleSheet={{display: 'grid',gridTemplateColumns: '3fr 1fr 2fr 2fr', gap: '2rem'}}>
      <Box>
        <Text>E-mail</Text>
        <InputDash placeholder="E-mail" type="text"  defaultValue={dataUser['usuario']?.email} disabled={true} onChange={(e)=>setEmail(e)}/>
      </Box>
      <Box>
        <Text>Nome</Text>
        <InputDash placeholder="Nome" type="text" value={nome} onChange={(e)=>setNome(e)}/>
      </Box>
       
       
     </Box>

     <Text styleSheet={{fontSize: '1.2rem', padding: '1rem 0', color: 'black', marginTop: '1rem'}}> Endereço</Text>
     <Box styleSheet={{display: 'grid',gridTemplateColumns: '3fr 1fr 2fr 2fr', gap: '2rem'}}>
     <Box>
        <Text>CEP</Text>
        <InputDash placeholder="Digite seu CEP" type="text"  onChange={(e)=>setCep(e)} value={cep}/>
      </Box>
      <Box>
        <Text>Cidade</Text>
        <InputDash placeholder="Cidade" type="text" onChange={(e)=>setCidade(e)} value={cidade} disabled={true}/>
      </Box>
      <Box>
        <Text>Estado (UF)</Text>
        <InputDash placeholder="Estado" type="text" onChange={(e)=>setEstado(e)} value={estado} disabled={true}/>
      </Box>
       
       
       
        
     </Box>

     <Box styleSheet={{display: 'grid', gridTemplateColumns: '3fr 1fr 2fr 2fr', gap: '2rem', padding: '2rem 0 2rem 0'}}>
        
     <Box>
        <Text>Rua</Text>
        <InputDash placeholder="Rua" type="text" value={rua} disabled={true}/>
      </Box>
      <Box>
        <Text>Nº</Text>
        <InputDash placeholder="N°" type="text" value={numero} onChange={(e)=>setNumero(e)} required={true}/>
      </Box>
      <Box>
        <Text>Complemento</Text>
        <InputDash placeholder="Complemento" type="text" value={complemento} onChange={(e)=>setComplemento(e)}/>
      </Box>
      
        
       
     </Box>


     <Box styleSheet={{display:'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
     <Button colorVariant="secondary" styleSheet={{width: '143px', height: '37px'}} type="submit">Salvar</Button>
     {
      message == 'Erro ao salvar dados, tente novamente.' &&
      <Text styleSheet={{fontSize: '.875rem', color: 'red'}}>Erro ao salvar dados.</Text>
     }
     {
      message == 'Dados salvos com sucesso.' &&
      <Text styleSheet={{fontSize: '.875rem', color: 'green'}}>Dados salvos dados com sucesso.</Text>
     }
     </Box>
    
    </Box>
  )
}

export default EditPerfil;
