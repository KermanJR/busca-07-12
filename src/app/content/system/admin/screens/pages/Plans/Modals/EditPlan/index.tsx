'use client'

import BuffetService from "@src/app/api/BuffetService";
import InputDash from "@src/app/components/system/InputDash";
import ModalDashboard from "@src/app/components/system/Modal";
import Box from "@src/app/theme/components/Box/Box";
import Button from "@src/app/theme/components/Button/Button";
import Text from "@src/app/theme/components/Text/Text";
import theme from "@src/app/theme/theme";
import { useState } from "react";

const ModalDashboardEditPlans = ({isModalOpenEditPlan, setIsModalOpenEditPlan, plans, setPlans, index, id}) =>{

  const [name, setName] = useState(plans[index].nome ?? '')
  const [monthPrice, setMonthPrice] = useState(plans[index].valor_mensal ?? '')
  const [yearPrice, setYearPrice] = useState(plans[index].valor_anual ?? '')
  const [tags, setTags] = useState(plans[index].tags?.join(',') ?? '')

  function saveEdit() {
    const editPlan = {nome: name, valor_mensal: monthPrice, valor_anual: yearPrice, id, tags: tags.split(',')}
    plans[index] = editPlan
    BuffetService.editPlan(editPlan, id)
    setPlans(plans)
  }

  return(
      <ModalDashboard 
        isOpen={isModalOpenEditPlan}
        setIsModalOpen={setIsModalOpenEditPlan}
        styleSheet={{
          width: '790px',
          height: '470px',
          textAlign: 'left'
        }}
      >
        <Text styleSheet={{padding: '.5rem 0', textAlign: 'left'}} variant="heading4Bold">Editar Plano</Text>
        <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
        
        <Box>
            <Text>Nome</Text>
            <InputDash value={name} onChange={setName} styleSheet={{backgroundColor: theme.colors.neutral.x100}} placeholder="Digite o nome"/>
          </Box>
          <Box>
            <Text>Valor mensal</Text>
            <InputDash value={monthPrice} onChange={setMonthPrice} styleSheet={{backgroundColor: theme.colors.neutral.x100}} placeholder="Digite o valor mensal"/>
          </Box>
          <Box>
            <Text>Valor anual</Text>
            <InputDash value={yearPrice} onChange={setYearPrice} styleSheet={{backgroundColor: theme.colors.neutral.x100}} placeholder="Digite o valor anual" type="number" min={0} max={100}/>
          </Box>
          <Box styleSheet={{gridColumn: '1/4'}}>
            <Text>Funcionalidades</Text>
            <InputDash value={tags} onChange={setTags} styleSheet={{width: '100%', backgroundColor: theme.colors.neutral.x100}} placeholder="Funcionalidades (separadas por vírgula sem espaço, ex: piscina infantil,jardim)"/>
          </Box>
        </Box>


        <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'left', gap: '1rem', marginTop: '1rem'}}>
          <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '132px'}} fullWidth colorVariant="secondary" onClick={() => setIsModalOpenEditPlan(false)}>Não</Button>
          <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '132px'}} fullWidth colorVariant="primary" onClick={() => {saveEdit(), setIsModalOpenEditPlan(false)}}>Sim</Button>
        </Box>
      </ModalDashboard>
  )
}

export default ModalDashboardEditPlans;
