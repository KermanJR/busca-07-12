
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import InputDash from "@src/app/components/system/InputDash";
import Text from "@src/app/theme/components/Text/Text";
import Button from "@src/app/theme/components/Button/Button";
import { use, useContext, useEffect, useState } from "react";
import { UserContext } from "@src/app/context/UserContext";
import BuffetService from "@src/app/api/BuffetService";
import {encryptCardPagSeguro} from "@src/app/api/encryptPagSeguro.js";
import PagBankService from "@src/app/api/PagBankService";


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

  //Dados do cartao
    //Dados do cartão de credito
    const [cypherCard, setCypherCard] = useState('');
    const [numberCard, setNumberCard] = useState('');
    const [cvvCard, setCvvCard] = useState('');
    const [expirationCard, setExpirationCard] = useState('');
    const [storeCard, setStoreCard] = useState('');
    const [nameCard, setNameCard] = useState('');


  //Contexts
  const {
    dataUser,
    setIdBuffet,
    idBuffet
  } = useContext(UserContext);

  const [modalCartao, setModalCartao] = useState(false);

  async function createPaymentPagBank(){
    const partesData = expirationCard.split("/");
    const exp_month = partesData[0];
    const exp_year = partesData[1]; 

    let cypherCard = encryptCardPagSeguro({
      publicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/dXanZK+XD3aImnF3nAkf5ijDedp9Lk2vnhxosd0BqQ/74PoXmeHU7XLt1Iu+o4OIBf1C12rVGULzl2zjUJDlI0QZp+wmLVEJkauboB7sG0BZzKbp0TlNmgX6VOtJ0/91e826wCkZ13FzOmLG+g1BAFhoLHHP3Cq4zO98yF/pw7k/n+P4QgOyEhUvk2LX4x1eqfo1u7GDPJ5wCJoNB9B4GLIPvAMrWDV/6EGern7EDf6q2ljUPHy2zXXOManf4s7NT2U9YahiCNMbiRVi4aJ8DwjuYKkYDvsVV2xn0eiNkXoqY02p1QtZ+ZyTPRWeJr0enHpEGeXRbdosXPhMk/twIDAQAB",
      number: numberCard,
      holder: nameCard,
      expYear:exp_year,
      expMonth: exp_month,
      securityCode: cvvCard,
    })
    const encrypted = cypherCard?.encryptedCard;
    const hasErrors = cypherCard?.hasErrors;
    const errors = cypherCard?.errors;
    setCypherCard(encrypted)
    return encrypted;
  }


  async function editDataPayment(e){
    e.preventDefault();
    const data = {
        "billing_info": [
          {
            "type": "CREDIT_CARD",
            "capture": true,
            "card": {
              "encrypted": await createPaymentPagBank(),
              "security_code": cvvCard,
              "store": true
            }
          }
        ],
    }
    PagBankService.editPaymentPagBankById(codeCustomer, data)
    .then(res=>{
      console.log(res)
    }).then(err=>{
      console.log(err)
    })
  }

  

  function ConfirmationModal(){
    return (
      <Box
        tag="form"
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
       <Text styleSheet={{fontSize: '1.4rem'}}>Dados do Cartão</Text>
       <Box styleSheet={{display: 'grid',gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '1rem'}}>
        
       <Box>
        <Text>Nome vinculado ao cartão</Text>
        <InputDash 
          placeholder="Digite o nome"
          type="text"
          onChange={(e)=>setNomeAssinante(e)}
          defaultValue={dadosAssinatura? 
            dadosAssinatura?.['payment_method'][0]?.card?.holder?.name: ''} 
            styleSheet={{backgroundColor: theme.colors.neutral.x200}}
          />
      </Box>
      <Box>
          <Text>N° Cartão</Text>
          <InputDash  
            placeholder="Digite o número"
            type="text"
            defaultValue={dadosAssinatura? dadosAssinatura['payment_method'][0]?.card?.first_digits + 'XXXXXX': ''}  
            onChange={(e)=>setNumberCard(e)}
            styleSheet={{backgroundColor: theme.colors.neutral.x200}}
          />
      </Box>
      <Box>
        <Text>Data de expiração</Text>
        <InputDash 
          placeholder="Digite a data"
          type="text" 
          onChange={(e)=>setExpirationCard(e)}
          defaultValue={dadosAssinatura? dadosAssinatura['payment_method'][0].card?.exp_month+'/'+dadosAssinatura['payment_method'][0].card?.exp_year: ''} styleSheet={{backgroundColor: theme.colors.neutral.x200}}/>
      </Box>
      <Box>
        <Text>Código de Segurança</Text>
        <InputDash 
          placeholder="CVV" 
          onChange={(e)=>setCvvCard(e)}
          type="text" 
          value={cvvCard}
          styleSheet={{backgroundColor: theme.colors.neutral.x200}}/>
      </Box>
      
        </Box>

        <Button styleSheet={{marginTop: '1rem'}} onClick={(e)=>editDataPayment(e)}>Editar</Button>
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
    }).then(err=>{
      console.log(err)
    })
  }, [codeCustomer])


  useEffect(() => {
    BuffetService.showSignaturesById(dataUser['entidade'].id)
    .then(res=>{
      console.log(res)
      getSignature(res[0]?.tipo?.id)
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

  const formatDocument = (value) => {
    // Remove caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

    // Verifica se é um CNPJ ou CPF
    if (cleanedValue.length === 11) {
      // É um CPF, aplica a máscara
      const formattedValue = cleanedValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
      );
      setDocumentoAssinante(formattedValue);
    } else if (cleanedValue.length === 14) {
      // É um CNPJ, aplica a máscara
      const formattedValue = cleanedValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
      setDocumentoAssinante(formattedValue);
    } else {
      // Valor inválido, não aplica máscara
      setDocumentoAssinante(cleanedValue);
    }
  }
  
  const formatDocumentValue = (value) => {
    // Remove caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

    // Verifica se é um CNPJ ou CPF
    if (cleanedValue.length === 11) {
      // É um CPF, aplica a máscara
      const formattedValue = cleanedValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
      );
      return(formattedValue);
    } else if (cleanedValue.length === 14) {
      // É um CNPJ, aplica a máscara
      const formattedValue = cleanedValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
      return(formattedValue);
    } else {
      // Valor inválido, não aplica máscara
      return(cleanedValue);
    }
  }

  const removeMask = (formattedValue) => {
    // Remove todos os caracteres não numéricos
    return formattedValue.replace(/\D/g, '');
  };


  



  function editarDadosAssinante(e){
    e.preventDefault();
    const data = {
        "name": nomeAssinante,
        "email": emailAssinante,
        "tax_id": removeMask(documentoAssinante),
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
            value={dadosAssinatura['plan']?.name? dadosAssinatura['plan']?.name: 'Carregando...'}  
            onChange={(e)=>setNomeAssinante(e)}
            styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc',
          borderRadius: '1px'}}
          />
      </Box>
      <Box>
        <Text>Valor</Text>
        <InputDash 
          placeholder="R$" 
          type="text" 
          disabled={true} 
          value={dadosAssinatura['amount']?.value? (dadosAssinatura['amount']?.value/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }): 'Carregando...'} 
          styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
        />
      </Box>
      <Box>
        <Text>Status da assinatura</Text>
        <InputDash 
          placeholder="Digite o e-mail" 
          type="text" 
          disabled={true} 
          value={dadosAssinatura?.['status'] === 'ACTIVE' && 'Ativa' || dadosAssinatura?.['status'] === 'OVERDUE' && 'Em análise'
          || dadosAssinatura?.['status'] === 'TRIAL' && 'Período Gratuito'? dadosAssinatura?.['status'] === 'ACTIVE' && 'Ativa' || dadosAssinatura?.['status'] === 'OVERDUE' && 'Em análise'
          || dadosAssinatura?.['status'] === 'TRIAL' && 'Período Gratuito': 'Carregando...'} 
          styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
        />
      </Box>
    </Box>

     <Text styleSheet={{fontSize: '1.3rem', marginTop: '3rem'}}>Dados do assinante</Text>

    <Box styleSheet={{gap: '2rem', marginTop: '1rem'}}>

      <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem'}}>

      <Box styleSheet={{width: '100%'}}>
        <Text>Nome</Text>
        <InputDash  
          placeholder="Digite o nome do assinante"
          type="text"
          value={nomeAssinante? nomeAssinante : 'Carregando...'} 
          onChange={(e)=>setNomeAssinante(e)}
          styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
        />
      </Box>

      <Box styleSheet={{width: '100%'}}>
        <Text>E-mail</Text>
        <InputDash 
          placeholder="Digite o e-mail"
          type="text"
          onChange={(e)=>setEmailAssinante(e)}
          value={emailAssinante? emailAssinante : 'Carregando...'} 
          styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}/>
      </Box>

      <Box styleSheet={{width: '100%'}}>
        <Box>
          <Text>Documento</Text>
          <InputDash 
          placeholder="Digite o documento" 
          onChange={(e)=>formatDocument(e)}
          type="text" 
          value={formatDocumentValue(documentoAssinante)? formatDocumentValue(documentoAssinante) : 'Carregando...'} 
          styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}/>
        </Box>
      </Box>
      </Box>
      
    

      <Box styleSheet={{ display: 'flex', flexDirection: 'row',  justifyContent: 'left', gap: '2rem'}}>
        <Box styleSheet={{width: '25%'}}>
          <Text>Data de Nascimento</Text>
          <input  
            placeholder="Digite o nome do assinante"
            type="date"
            value={dataNascimentoAssinante? dataNascimentoAssinante : 'Carregando...'} 
            onChange={(e)=>setDataNascimentoAssinante(e.target.value)}
            style={{padding: '1rem .5rem', backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}/>
          
        </Box>

        <Box styleSheet={{width: '15%'}}>
          <Text>DDD</Text>
          <InputDash 
            placeholder="(XX)"
            type="text"
            value={dddAssinante? dddAssinante : 'Carregando...'} 
            onChange={(e)=>setDddAssinante(e)}
            styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
          />
        </Box>
      
        <Box styleSheet={{width: '33%'}}>
            <Text>Telefone</Text>
            <InputDash 
              onChange={(e)=>setTelefoneAssinante(e)}
              value={telefoneAssinante? telefoneAssinante : 'Carregando...'} 
              placeholder="XXXXXXXXXX" 
              type="text" 
              styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
            />
        </Box>
      </Box>
     </Box>
    
     <Button styleSheet={{marginTop: '2rem'}} >Salvar</Button>

    </Box>
  )
}

export default Settings;
