'use client'

import BuffetService from "@src/app/api/BuffetService";
import InputDash from "@src/app/components/system/InputDash";
import ModalDashboard from "@src/app/components/system/Modal";
import Box from "@src/app/theme/components/Box/Box";
import Button from "@src/app/theme/components/Button/Button";
import Text from "@src/app/theme/components/Text/Text";
import theme from "@src/app/theme/theme";
import { useState } from "react";

const ModalDashboardEditCupons = ({isModalOpenEditCupom, setIsModalOpenEditCupom, cupons, setCupons, index, id}) =>{

  const [code, setCode] = useState(cupons[index].codigo ?? '')
  const [price, setPrice] = useState(cupons[index].valor ?? '')
  const [percentage, setPercentage] = useState(cupons[index].porcentagem ?? '')
  const [description, setDescription] = useState(cupons[index].descricao ?? '')
  const [initialDate, setInitialDate] = useState((cupons[index].data_inicio).split('T')[0]?? null)
  const [endDate, setEndDate] = useState((cupons[index].data_fim).split('T')[0]?? null)


  function saveEdit() {
    const editCupom = {
      codigo: code,
      valor: price,
      porcentagem: percentage,
      descricao: description,
      data_inicio: `${initialDate} 00:00:00`, 
      data_fim: `${endDate} 00:00:00`,
      dias: 90,
      id
    }
    cupons[index] = editCupom
    BuffetService.editCupom(editCupom, id)
    setCupons(cupons)
  }


  return(
      <ModalDashboard 
        isOpen={isModalOpenEditCupom}
        setIsModalOpen={setIsModalOpenEditCupom}
        styleSheet={{
          width: '790px',
          height: '470px',
          textAlign: 'left'
        }}
      >
        <Text styleSheet={{padding: '.5rem 0', textAlign: 'left'}} variant="heading4Bold">Editar Cupom</Text>
        <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'repeat(2, 1fr)', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
        
          <Box>
            <Text>Código</Text>
            <InputDash value={code} onChange={setCode} styleSheet={{backgroundColor: theme.colors.neutral.x100}} placeholder="Digite o código" maxLength={12}/>
          </Box>
          <Box>
            <Text>Valor do cupom</Text>
            <InputDash value={price} onChange={setPrice} styleSheet={{backgroundColor: theme.colors.neutral.x100}} placeholder="Digite o valor"/>
          </Box>
          <Box>
            <Text>Porcentagem de Desconto</Text>
            <InputDash value={percentage} onChange={setPercentage} styleSheet={{backgroundColor: theme.colors.neutral.x100}} placeholder="Digite o valor (%)" type="number" min={0} max={100}/>
          </Box>
          <Box styleSheet={{width: '100%', gridColumn: '1/4'}}>
            <Text>Descrição</Text>
            <InputDash value={description} onChange={setDescription} styleSheet={{backgroundColor: theme.colors.neutral.x100, width: '100%', gridColumns: '0/3'}} placeholder="Digite a descrição"/>
          </Box>
        </Box>
        <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '1rem', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
          <Box>
            <Text>Data início</Text>
            <input type="date" value={initialDate}  onChange={(e)=>setInitialDate(e.target.value)}  style={{
              backgroundColor: theme.colors.neutral.x100,
              border: 'none',
              borderRadius: '6px',
              padding: '1rem',

            }}
          />
          
          </Box>
          <Box>
            <Text>Data fim (Expiração)</Text>
            <input type="date" value={endDate}  onChange={(e)=>setEndDate(e.target.value)}  style={{
              backgroundColor: theme.colors.neutral.x100,
              border: 'none',
              borderRadius: '6px',
              padding: '1rem',

            }}
          />
            
          </Box>
        </Box>

        <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'left', gap: '1rem', marginTop: '1rem'}}>
          <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '132px'}} fullWidth colorVariant="primary" onClick={() => setIsModalOpenEditCupom(false)}>Não</Button>
          <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '132px'}} fullWidth colorVariant="secondary" onClick={() => {saveEdit(), setIsModalOpenEditCupom(false)}}>Sim</Button>
        </Box>
      </ModalDashboard>
  )
}

export default ModalDashboardEditCupons;
