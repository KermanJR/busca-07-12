
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
    idBuffet,
    dataBuffet
  } = useContext(UserContext);

  const [modalCartao, setModalCartao] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const [responseCancel, setResponseCancel] = useState(false);
 

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
          <Text>Data Nascimento</Text>
          <InputDash  
            placeholder="Digite o número"
            type="text"
            defaultValue={dadosAssinatura['payment_method'][0]? dadosAssinatura['payment_method'][0]?.card?.first_digits + 'XXXXXX': ''}  
            onChange={(e)=>setNumberCard(e)}
            styleSheet={{backgroundColor: theme.colors.neutral.x200}}
          />
      </Box>
      <Box>
          <Text>Documento</Text>
          <InputDash  
            placeholder="Digite o número"
            type="text"
            defaultValue={dadosAssinatura['payment_method'][0]? dadosAssinatura['payment_method'][0]?.card?.first_digits + 'XXXXXX': ''}  
            onChange={(e)=>setNumberCard(e)}
            styleSheet={{backgroundColor: theme.colors.neutral.x200}}
          />
      </Box>
     
      
      
        </Box>

        <Button styleSheet={{marginTop: '1rem'}} onClick={(e)=>editDataPayment(e)}>Editar</Button>
        </Box>
      </Box>
    );
  }


  function cancelSignature(e){
    e.preventDefault();
    PagBankService.cancelSignaturePagBankById(dadosAssinatura?.['id'])
    .then(res=>{
      setResponseCancel(true);
      EditBuffet();
      console.log(res)
    })


  }

  //EDITAR BUFFET
  function EditBuffet(){
    BuffetService.editBuffets(idBuffet, {
      slug: dataBuffet?.['slug'],
      capacidade_total: dataBuffet?.['capacidade_total'],
      area_total: dataBuffet?.['area_total'],
      sobre: dataBuffet?.['sobre'],
      horario_atendimento: dataBuffet?.['horario_atendimento'],
      horario_atendimento_fds: dataBuffet?.['horario_atendimento_fds'],
      youtube: dataBuffet?.['youtube'],
      status: 'I',
      redes_sociais: [
        {
            "descricao": "https://www.youtube.com/",
            "tipo":  dataBuffet?.['youtube'] ? dataBuffet?.['youtube']:'Nenhum'
        }
      ]
    })
    .then(async (response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  }

  function CancelModal(){
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
        > <Button onClick={(e)=>setCancelModal(!cancelModal)} variant="outlined" styleSheet={{width: '10px', height: '30px', border: 'none', textAlign: 'left', cursor: 'pointer', marginLeft: '-20px', marginTop: '-1rem'}}>
        X
       </Button>

       {responseCancel == false ? 
       <Text  styleSheet={{fontSize: '1.4rem', textAlign: 'center'}} color={theme.colors.negative.x500}>Cancelar Assinatura</Text>
       :
       <Text  styleSheet={{fontSize: '1.4rem', textAlign: 'center', padding: '.5rem'}} color={theme.colors.negative.x500}>Cancelamento Concluído</Text>
        }
       
       
       {responseCancel == false?   
        <Text styleSheet={{textAlign: 'center', padding: '1rem'}}>
          Deseja realmente cancelar sua assinatura do plano { dadosAssinatura['plan']?.name}? 
        </Text>: ''
       }
       
     
        
        {responseCancel == true && (
          <Box styleSheet={{width: '70%', textAlign: 'center', borderRadius: '8px', padding: '1rem', alignSelf: 'center',
            backgroundColor: theme.colors.neutral.x050
          }}>
          <Text>Assinatura cancelada com sucesso.</Text>
          <Text>Você tem até o dia {new Date(dadosAssinatura?.['trial']?.end_at).toLocaleDateString()} para continuar usufruindo do {dadosAssinatura?.['plan']?.name}!
          </Text>
          </Box>
        )}
        
        {responseCancel == false ? <Button
        styleSheet={{marginTop: '1rem', alignSelf:'center'}} 
        colorVariant="secondary" onClick={(e)=>cancelSignature(e)}>Cancelar assinatura</Button> : ''}
        
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
      let id = JSON.parse(res[0]?.tipo)
      getSignature(id?.id)
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

  const extrairConteudoAntesDoHifen = (nome) => {
    const partes = nome.split('-');

    if (partes.length >= 2) {
      const conteudoAntesDoHifen = partes[0].trim();
      return conteudoAntesDoHifen;
    } else {
      return nome.trim();
    }
  };

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

  console.log(dadosAssinante)
  console.log(dadosAssinatura)


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

    {cancelModal && <CancelModal />}

      <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Box>
          <Text styleSheet={{fontSize: '1.3rem'}}>Plano de Assinatura Atual</Text>
          Aproveite até {new Date(dadosAssinatura?.['trial']?.end_at).toLocaleDateString()}
        </Box>

        <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
          {dadosAssinatura?.['status'] != 'CANCELED' ? (
            <Button 
              disabled={dadosAssinatura?.['status'] === 'CANCELED'? true: false}
              type="button" 
              variant="outlined" 
              styleSheet={{position: 'relative', right: '0'}} 
              colorVariant="negative" 
              onClick={(e)=>setCancelModal(true)}
            >
              Cancelar assinatura
            </Button>
          ): <></>
        }
          
  
       
        </Box>
       
      </Box>
    
     <Box styleSheet={{display: 'grid',gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '2.5rem'}}>
      <Box>
          <Text>Plano</Text>
          <InputDash  
            placeholder="Carregando..."
            type="text"
            disabled={true}
            value={dadosAssinatura['plan']?.name? dadosAssinatura['plan']?.name: ''}  
            onChange={(e)=>setNomeAssinante(e)}
            styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc',
          borderRadius: '1px'}}
          />
      </Box>
      <Box>
        <Text>Valor</Text>
        <InputDash 
          placeholder="Carregando..."
          type="text" 
          disabled={true} 
          value={dadosAssinatura['amount']?.value? (dadosAssinatura['amount']?.value/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }): ''} 
          styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
        />
      </Box>
      <Box>
        <Text>Status da assinatura</Text>
        <InputDash 
         placeholder="Carregando..."
          type="text" 
          disabled={true} 
          value={dadosAssinatura ?
            dadosAssinatura?.['status'] === 'CANCELED' && 'Cancelado' ||
            dadosAssinatura?.['status'] === 'ACTIVE' && 'Ativa' ||
            dadosAssinatura?.['status'] === 'OVERDUE' && 'Pagamento atrasado'||
            dadosAssinatura?.['status'] === 'TRIAL' && 'Período Gratuito' 
              :
              'Carregando...'
          } 
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
          placeholder="Carregando..."
          type="text"
          value={nomeAssinante? extrairConteudoAntesDoHifen(nomeAssinante) : ''} 
          onChange={(e)=>setNomeAssinante(e)}
          styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
        />
      </Box>

      <Box styleSheet={{width: '100%'}}>
        <Text>E-mail</Text>
        <InputDash 
           placeholder="Carregando..."
          type="text"
          onChange={(e)=>setEmailAssinante(e)}
          value={emailAssinante? emailAssinante : ''} 
          styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}/>
      </Box>

      <Box styleSheet={{width: '100%'}}>
        <Box>
          <Text>Documento</Text>
          <InputDash 
          placeholder="Carregando..." 
          onChange={(e)=>formatDocument(e)}
          type="text" 
          value={formatDocumentValue(documentoAssinante)? formatDocumentValue(documentoAssinante) : ''} 
          styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}/>
        </Box>
      </Box>
      </Box>
      
    

      <Box styleSheet={{ display: 'flex', flexDirection: 'row',  justifyContent: 'left', gap: '2rem'}}>
        <Box styleSheet={{width: '25%'}}>
          <Text>Data de Nascimento</Text>
          <input  
            placeholder="Carregando..."
            type="date"
            value={dataNascimentoAssinante? dataNascimentoAssinante : ''} 
            onChange={(e)=>setDataNascimentoAssinante(e.target.value)}
            style={{padding: '1rem .5rem', backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}/>
          
        </Box>

        <Box styleSheet={{width: '15%'}}>
          <Text>DDD</Text>
          <InputDash 
           placeholder="Carregando..."
            type="text"
            value={dddAssinante? dddAssinante : ''} 
            onChange={(e)=>setDddAssinante(e)}
            styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
          />
        </Box>
      
        <Box styleSheet={{width: '33%'}}>
            <Text>Telefone</Text>
            <InputDash 
              onChange={(e)=>setTelefoneAssinante(e)}
              value={telefoneAssinante? telefoneAssinante : ''} 
              placeholder="Carregando..."
              type="text" 
              styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
            />
        </Box>
      </Box>

      
      <Text styleSheet={{fontSize: '1.3rem', marginTop: '.8rem'}}>Dados do pagamento</Text>
      <Box styleSheet={{ display: 'flex', flexDirection: 'row',  justifyContent: 'left', gap: '2rem'}}>
        <Box>
          <Text>Nome vinculado ao cartão</Text>
          <InputDash 
               placeholder="Carregando..."
            type="text"
            onChange={(e)=>setNomeAssinante(e)}
            value={dadosAssinatura?.['payment_method']?.[0]? 
              dadosAssinatura?.['payment_method']?.[0]?.card?.holder?.name: nomeAssinante} 
              styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
            />
        </Box>

        <Box>
            <Text>N° Cartão</Text>
            <InputDash  
                placeholder="Carregando..."
              type="text"
              value={dadosAssinatura['payment_method']?.[0]? dadosAssinatura['payment_method']?.[0]?.card?.first_digits + 'XXXXXX': numberCard}  
              onChange={(e)=>setNumberCard(e)}
              styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
            />
        </Box>
        <Box>
          <Text>Data de expiração</Text>
          <InputDash 
              placeholder="Carregando..."
            type="text" 
            maxLength={7}
            onChange={(e)=>setExpirationCard(e)}
            value={dadosAssinatura['payment_method']?.[0]? dadosAssinatura['payment_method']?.[0].card?.exp_month+'/'+dadosAssinatura['payment_method'][0].card?.exp_year: expirationCard} 
            styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}
            />
        </Box>
        <Box styleSheet={{width: '15%'}}>
        <Text>Cód. Segurança</Text>
        <InputDash 
             placeholder="cvv"
          onChange={(e)=>setCvvCard(e)}
          type="text" 
          value={cvvCard}
          styleSheet={{backgroundColor: theme.colors.neutral.x000, borderBottom: '1px solid #ccc', borderRadius: '1px'}}/>
      </Box>
            </Box>

     </Box>
     {dadosAssinatura?.['status'] == 'CANCELED' ? (
 <Button styleSheet={{marginTop: '2rem'}} colorVariant="positive">Reativar minha assinatura</Button>
     ): <></>}
    
    </Box>
  )
}

export default Settings;
