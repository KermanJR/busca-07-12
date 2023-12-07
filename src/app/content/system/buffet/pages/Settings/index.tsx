
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import InputDash from "@src/app/components/system/InputDash";
import Text from "@src/app/theme/components/Text/Text";
import Button from "@src/app/theme/components/Button/Button";
import { use, useContext, useEffect, useState } from "react";
import { UserContext } from "@src/app/context/UserContext";
import BuffetService from "@src/app/api/BuffetService";
import SelectWithClickToAddAttractives from "@src/app/components/system/SelectAttractives";
import SelectWithClickToAddServices from "@src/app/components/system/SelectServices";
import Icon from "@src/app/theme/components/Icon/Icon";
import Select from "@src/app/theme/components/Select/Select";
import Pagination from "@src/app/components/system/Pagination";
import PagBankService from "@src/app/api/PagBankService";
import Input from "@src/app/theme/components/Input/Input";
import email from "@src/app/theme/components/Icon/svgs/email";

const Settings = () =>{

  //Hooks
  const theme = useTheme();



  const [hoveredEvent, setHoveredEvent] = useState(false)
  const [dadosAssinante, setDadosAssinante] = useState([]);
  const [dadosAssinatura, setDadosAssinatura] = useState([]);

  const [codeCustomer, setCodeCustomer] = useState('');
  

  //Dados do assinante
  const [nomeAssinante, setNomeAssinante] = useState<string>(dadosAssinante?.['name']? dadosAssinante?.['name']: '');
  const [emailAssinante, setEmailAssinante] = useState<string>('');
  const [documentoAssinante, setDocumentoAssinante] = useState<string>('');
  const [telefoneAssinante, setTelefoneAssinante] = useState<string>('');
  const [dataNascimentoAssinante, setDataNascimentoAssinante] = useState<string>('');
  const [ruaAssinante, setRuaAssinante] = useState('');
  const [numeroAssinante, setNumeroAssinante] = useState('');
  const [complementoAssinante, setComplementoAssinante] = useState('');
  const [localidadeAssinante, setLocalidadeAssinante] = useState('');
  const [cidadeAssinante, setCidadeAssinante] = useState('');
  const [cepAssinante, setCepAssinante] = useState('');
  const [estadoAssinante, setEstadoAssinante] = useState('');
  const [dddAssinante, setDddAssinante] = useState('');


  //Contexts
  const {
    dataUser,
    setIdBuffet,
    idBuffet
  } = useContext(UserContext);


  

 
 
 
  const [modalCartao, setModalCartao] = useState(false);

  function ConfirmationModal(){
    return (
      <Box
        styleSheet={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Sobreposição escura
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999, // Garanta que esteja na parte superior
        }}
      >
        <Box
          styleSheet={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'left',

            height: 'auto',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          }}
        > <Button onClick={(e)=>setModalCartao(!modalCartao)} variant="outlined" styleSheet={{width: '10px', height: '30px', border: 'none', textAlign: 'left', cursor: 'pointer', marginLeft: '-20px', marginTop: '-1rem'}}>
        X
       </Button>
       <Box styleSheet={{display: 'grid',gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '1rem'}}>
       <Box>
        <Text>Nome vinculado ao cartão</Text>
        <InputDash placeholder="Digite o nome" type="text"  value={dadosAssinante?.['billing_info'][0]? dadosAssinante?.['billing_info'][0]?.card?.holder?.name: ''} styleSheet={{backgroundColor: theme.colors.neutral.x200}}/>
      </Box>
      <Box>
          <Text>N° Cartão</Text>
          <InputDash  
            placeholder="Digite o número"
            type="text"
        
            value={dadosAssinante?.['billing_info'][0]? dadosAssinante['billing_info'][0]?.card?.first_digits + 'XXXXXX': ''}  
            onChange={(e)=>setNomeAssinante(e)}
            styleSheet={{backgroundColor: theme.colors.neutral.x200}}
          />
      </Box>
      <Box>
        <Text>Data de expiração</Text>
        <InputDash placeholder="Digite a data" type="text"  value={dadosAssinante?.['billing_info'][0]? dadosAssinante['billing_info'][0].card?.exp_month+'/'+dadosAssinante['billing_info'][0].card?.exp_year: ''} styleSheet={{backgroundColor: theme.colors.neutral.x200}}/>
      </Box>
      <Box>
        <Text>Código de Segurança</Text>
        <InputDash placeholder="CVV" type="text" styleSheet={{backgroundColor: theme.colors.neutral.x200}}/>
      </Box>
      
    </Box>

    <Button styleSheet={{marginTop: '.5rem'}} >Editar</Button>
        </Box>
        
      </Box>
    );
  }

  


  useEffect(()=>{
    PagBankService.getCustomerPagBankById(codeCustomer)
    .then(res=>{
      setDadosAssinante(res)
      setNomeAssinante(res?.name)
      setEmailAssinante(res?.email)
      setTelefoneAssinante(res?.['phones'][0]? res?.['phones'][0]?.number: '')
      setDddAssinante(res?.['phones'][0]? res?.['phones'][0]?.area: '')
      setDocumentoAssinante(res?.tax_id)
      setDataNascimentoAssinante(res?.birth_date)
      console.log(res)
    }).then(err=>{
      console.log(err)
    })
  }, [codeCustomer])


  useEffect(() => {
    BuffetService.showSignaturesById(dataUser['entidade'].id)
    .then(res=>{
      getSignature(res[0]?.tipo)
    }).catch(err=>{
      console.log(err)
    })

  }, []);

  function getSignature(id){
    PagBankService.getSignaturesPagBankById(id)
    .then(res=>{
      setCodeCustomer(res?.customer?.id)
      setDadosAssinatura(res)
    }).catch(err=>{
      console.log(err)
    })
  }


 
console.log(dadosAssinatura)
  function editarDadosAssinante(e){
    e.preventDefault();
    const data = {
      
        "name": nomeAssinante,
        "email": emailAssinante,
        "tax_id": documentoAssinante,
        "phones": [
          {
            "country": "55",
            "area": dddAssinante,
            "number": telefoneAssinante
          }
        ],
        "birth_date": dataNascimentoAssinante
      
    }
    PagBankService.editCustomerPagBankById(codeCustomer, data)
    .then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }



  return(
    <Box 
      tag="form"
    onSubmit={editarDadosAssinante}
      styleSheet={{
      width: '100%',
      height: 'auto',
      backgroundColor: theme.colors.neutral.x000,
      borderRadius: '8px',
      padding: '2rem',
    }}>

{modalCartao && <ConfirmationModal />}
      <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Box>
        <Text styleSheet={{fontSize: '1.3rem'}}>Plano de Assinatura Atual</Text>
        </Box>

      <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
      <Button type="button" variant="outlined" styleSheet={{position: 'relative', right: '0'}} colorVariant="negative">Cancelar assinatura</Button>
      <Button type="button" variant="outlined" styleSheet={{position: 'relative', right: '0'}} onClick={(e)=>setModalCartao(true)}>Exibir dados do cartão</Button>
      </Box>
      
      </Box>
      
     <Box styleSheet={{display: 'grid',gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '2.5rem'}}>
      <Box>
          <Text>Plano</Text>
          <InputDash  
            placeholder="Digite o nome do plano"
            type="text"
            disabled={true}
            value={dadosAssinatura['plan']?.name}  
            onChange={(e)=>setNomeAssinante(e)}
            styleSheet={{backgroundColor: theme.colors.neutral.x200}}
          />
      </Box>
      <Box>
        <Text>Valor</Text>
        <InputDash 
          placeholder="Digite o e-mail" 
          type="text" 
          disabled={true} 
          value={(dadosAssinatura['amount']?.value/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
          styleSheet={{backgroundColor: theme.colors.neutral.x200}}
        />
      </Box>
      <Box>
        <Text>Status da assinatura</Text>
        <InputDash 
          placeholder="Digite o e-mail" 
          type="text" 
          disabled={true} 
          value={dadosAssinatura?.['status'] === 'ACTIVE' && 'Ativa' || dadosAssinatura?.['status'] === 'OVERDUE' && 'Em análise'} 
          styleSheet={{backgroundColor: theme.colors.neutral.x200}}
        />
      </Box>
    </Box>

     <Text styleSheet={{fontSize: '1.3rem', marginTop: '3rem'}}>Dados do assinante</Text>
     <Box styleSheet={{display: 'grid',gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '1rem'}}>
     <Box>
        <Text>Nome</Text>
        <InputDash  
          placeholder="Digite o nome do assinante"
          type="text"
          value={nomeAssinante}  
          onChange={(e)=>setNomeAssinante(e)}
          styleSheet={{backgroundColor: theme.colors.neutral.x200, paddingRight: '0'}}
        />
      </Box>
       <Box>
        <Text>E-mail</Text>
        <InputDash 
        placeholder="Digite o e-mail"
         type="text"
         onChange={(e)=>setEmailAssinante(e)}
          value={emailAssinante} 
          styleSheet={{backgroundColor: theme.colors.neutral.x200, paddingRight: '0'}}/>
       </Box>
       <Box>
       <Box>
          <Text>Documento</Text>
          <InputDash 
          placeholder="Digite o documento" 
          onChange={(e)=>setDocumentoAssinante(e)}
          type="text" 
          value={documentoAssinante} 
          styleSheet={{backgroundColor: theme.colors.neutral.x200, paddingRight: '0'}}/>
        </Box>
       </Box>

      <Box styleSheet={{ display:'flex', flexDirection: 'row',  justifyContent: 'left', gap: '2rem'}}>
        <Box styleSheet={{width: '100%'}}>
          <Text>Data de Nascimento</Text>
          <input  
            placeholder="Digite o nome do assinante"
            type="date"
            value={dataNascimentoAssinante}  
            onChange={(e)=>setDataNascimentoAssinante(e.target.value)}
            style={{backgroundColor: theme.colors.neutral.x200, width: '100%', border: 'none', padding: '1rem', borderRadius: '8px'}}
          />
        </Box>

        <Box styleSheet={{width: '20%'}}>
          <Text>DDD</Text>
          <InputDash 
            placeholder="(XX)"
            type="text"
            value={dddAssinante}  
            onChange={(e)=>setDddAssinante(e)}
            styleSheet={{backgroundColor: theme.colors.neutral.x200, width:'100%'}}
          />
        </Box>
      
        <Box styleSheet={{width: '60%'}}>
            <Text>Telefone</Text>
            <InputDash 
              onChange={(e)=>setTelefoneAssinante(e)}
              value={telefoneAssinante}  
              placeholder="XXXXXXXXXX" 
              type="text" 
              styleSheet={{backgroundColor: theme.colors.neutral.x200}}
            />
        </Box>
        </Box>
     </Box>
    
     <Button styleSheet={{marginTop: '1rem'}} >Salvar</Button>

    </Box>
  )
}

export default Settings;
