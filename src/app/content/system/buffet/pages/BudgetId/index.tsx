
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import Text from "@src/app/theme/components/Text/Text";
import { useEffect, useState } from "react";
import BuffetService from "@src/app/api/BuffetService";
import InputDash from "@src/app/components/system/InputDash";
import Button from "@src/app/theme/components/Button/Button";
import moment from "moment-timezone";
import Input from "@src/app/theme/components/Input/Input";

const BudgetId = ({idEvent}) =>{

  const theme = useTheme();
  const [dataEvent, setDataEvent] = useState([]);
  const [selectedFileBudget, setSelectedFileBudget] = useState('');

  const [dispDataEvento, setDispDataEvento] = useState('');
  const [valorEvento, setValorEvento] = useState(null);
  const [idDocumento, setIdDocumento] = useState(null);
  const [obsEvento, setObsEvento] = useState('');
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleImageSelectOne = (event) => {
    let file = event.target.files[0];
    setSelectedFileBudget(file);
  };

  
function converterData(dataOriginal) {
  const dataFormatoISO = moment(dataOriginal).format('YYYY-MM-DD');
  const dataConvertida = moment(dataFormatoISO).format('DD/MM/YYYY');
  return dataConvertida;
}


async function enviarDadosProposta(id: any){
  const data = {
    "nome": dataEvent[0]?.['nome'],
    "observacoes": obsEvento,
    "valor": valorEvento,
    "status": String(dataEvent[0]?.['status']),
    "id_entidade": dataEvent[0]?.['entidade']?.id,
    "id_evento": dataEvent[0]?.id,
    "id_arquivo": id,
    "data_disponibilidade": `${dispDataEvento} 00:00:00`
  }
  BuffetService.sendProposta(data)
}

async function enviarDocumentoProposta(){
  try{
    await BuffetService.postFileBuffet(selectedFileBudget)
    .then(res=>{
      if(res?.id != null || res?.id != '' || res?.id != undefined){

        setIdDocumento(res?.id);
        setSuccess('Orçamento enviado com sucesso.');
        enviarDadosProposta(res?.id);
      }else{
        setError('Falha ao enviar orçamento, tente novamente.')
      }
      
    }).catch(err=>{
      console.log(err)
    })
  }catch(err){
    setError('Falha ao enviar orçamento, tente novamente.')
  }

}

function enviarProposta(e){
  e.preventDefault();
  enviarDocumentoProposta();

}


useEffect(() => {
  const clearMessages = () => {
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
  };

  if (error || success) {
    clearMessages();
  }
}, [error, success]);



  useEffect(()=>{
    BuffetService.showEventsById(idEvent)
      .then((response)=>{
        setDataEvent(response);
      })
  }, [])

 



  

  return(
    <Box styleSheet={{height: '100vh'}}>
      <Box 
        onSubmit={enviarProposta}
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
      }}
        tag="form"
      >

        <Box styleSheet={{display: 'grid', gridTemplateColumns: '4fr 1fr 1fr 1fr', gap: '1rem'}}>
          <Box>
            <Text>Nome do cliente</Text>
            <InputDash 
              type="text" 
              placeholder="Nome do cliente"
              value={idEvent? dataEvent[0]?.nome : ''}
              disabled={true}
            />  
          </Box>  
          <Box>
            <Text>N° de convidados</Text>
            <InputDash 
              type="text" 
              placeholder="N° de convidades"
              value={idEvent? dataEvent[0]?.['qtd_pessoas'] : ''}
              disabled={true}
            />  
          </Box> 
          <Box>
            <Text>Data do evento</Text>
            <InputDash
             disabled={true}
              type="text"
              value={idEvent? converterData(dataEvent[0]?.['created_at']) : ''} 
            />  
          </Box> 
          <Box>
            <Text>Tipo do evento</Text>

            {dataEvent[0]?.['tipo'] === "1" && 
                <InputDash 
              type="text" 
              placeholder="Tipo do evento"
              value="Infantil"
              disabled={true}
            /> 
                }
                {dataEvent[0]?.['tipo']=== "2" && 

                <InputDash 
              type="text" 
              placeholder="Tipo do evento"
              value="Domicílio"
              disabled={true}
            /> 
                }
                {dataEvent[0]?.['tipo'] === "3" && 
    
                <InputDash 
              type="text" 
              placeholder="Tipo do evento"
              value="Casamento"
              disabled={true}
            /> 
                }
                {dataEvent[0]?.['tipo'] === "4" && 
 
                <InputDash 
              type="text" 
              placeholder="Tipo do evento"
              value="Confraternização"
              disabled={true}
            /> 
                }
 
          </Box>
        </Box>
        
        <Box styleSheet={{marginTop: '2rem'}}>
          <Text>Observações</Text>
          <InputDash 
            tag="textarea" 
            placeholder="Observações da proposta" 
            styleSheet={{height: '205px'}}  
            required={true}
            value={idEvent? dataEvent[0]?.['observacoes'] : ''}
            disabled={true}
          />
        </Box>

        <Text variant="heading4Bold" styleSheet={{marginTop: '2rem', padding: '0 0 1rem 0'}}>Seu Orçamento</Text>
        <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr 3fr', gap: '1rem'}}>
          <Box>
              <Text>Disponibilidade da data</Text>
              <input 
                type="date" 
                placeholder="Disponibilidade da data"
                onChange={(e)=>setDispDataEvento(e.target.value)}
                required={true}
                style={{
                  width: '100%',
                  backgroundColor: theme.colors.neutral.x050,
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px'
                }}
              />  
            </Box>  
            <Box>
              <Text>Valor do orçamento</Text>
              <InputDash 
                type="text" 
                placeholder="R$"
                onChange={(e)=>setValorEvento(e)}
                required={true}
              />  
            </Box> 
            <Box>
              <Text>Arquivo</Text>
              <input 
                type="file" 
                onChange={(e)=>handleImageSelectOne(e)}
                required={true}
              />  
            </Box> 
        </Box>

        <Box styleSheet={{marginTop: '2rem'}}>
          <InputDash 
            tag="textarea" 
            placeholder="Observações do orçamento" 
            styleSheet={{height: '205px'}}  
            required={true}
            onChange={(e)=>setObsEvento(e)}
          />
        </Box>
        <Box styleSheet={{display: 'flezx', flexDirection:' row', gap: '1rem', alignItems: 'center'}}>
        <Button colorVariant="secondary" styleSheet={{width: '200px', marginTop: '1rem'}} type="submit">Enviar orçamento</Button>
                {error && <Text styleSheet={{color: 'red'}}>{error}</Text>}
                {success && <Text styleSheet={{color: 'green'}}>{success}</Text>}
        </Box>
       
      </Box>
      
    </Box>
  )
}

export default BudgetId;
