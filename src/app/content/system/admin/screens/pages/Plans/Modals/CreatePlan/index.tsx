'use client'

import BuffetService from "@src/app/api/BuffetService";
import InputDash from "@src/app/components/system/InputDash";
import ModalDashboard from "@src/app/components/system/Modal";
import Box from "@src/app/theme/components/Box/Box";
import Button from "@src/app/theme/components/Button/Button";
import Text from "@src/app/theme/components/Text/Text";
import theme from "@src/app/theme/theme";
import { useState } from "react";

const ModalDashboardCreatePlans = ({isModalOpenCreatePlan, setIsModalOpenCreatePlan, plans, setPlans}) =>{

  const [name, setName] = useState('')
  const [monthPrice, setMonthPrice] = useState('')
  const [yearPrice, setYearPrice] = useState('')
  const [tags, setTags] = useState('')

  function newPlan() {
    const id = (plans.at(-1)?.id ?? 0) + 1

    const newPlan = {nome: name, valor_mensal: monthPrice, valor_anual: yearPrice, tags: tags.split(',')}
    BuffetService.addPlan(newPlan)
    plans.push(Object.assign(newPlan, {id}))
    setPlans(plans)
  }

  return(
      <ModalDashboard 
        isOpen={isModalOpenCreatePlan}
        setIsModalOpen={setIsModalOpenCreatePlan}
        styleSheet={{
          width: '790px',
          height: '470px',
          textAlign: 'left'
        }}
      >
        <Text styleSheet={{padding: '.5rem 0', textAlign: 'left'}} variant="heading4Bold">Criar Plano</Text>
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
          <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '132px'}} fullWidth colorVariant="secondary" onClick={() => setIsModalOpenCreatePlan(false)}>Não</Button>
          <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '132px'}} fullWidth colorVariant="primary" onClick={() => {newPlan(), setIsModalOpenCreatePlan(false)}}>Sim</Button>
        </Box>
      </ModalDashboard>
  )
}

export default ModalDashboardCreatePlans;
