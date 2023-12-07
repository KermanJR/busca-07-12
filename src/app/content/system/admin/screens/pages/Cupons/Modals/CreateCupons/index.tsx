'use client'

import BuffetService from "@src/app/api/BuffetService";
import InputDash from "@src/app/components/system/InputDash";
import ModalDashboard from "@src/app/components/system/Modal";
import Box from "@src/app/theme/components/Box/Box";
import Button from "@src/app/theme/components/Button/Button";
import Input from "@src/app/theme/components/Input/Input";
import Text from "@src/app/theme/components/Text/Text";
import theme from "@src/app/theme/theme";
import { useEffect, useState } from "react";
import { format } from 'date-fns';

const ModalDashboardCreateCupons = ({isModalOpenCreateCupom, setIsModalOpenCreateCupom, cupons, setCupons}) =>{
  const [code, setCode] = useState('')
  const [price, setPrice] = useState('')
  const [percentage, setPercentage] = useState('')
  const [description, setDescription] = useState('')
  const [initialDate, setInitialDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  
  function newCupom(e) {
    e.preventDefault();
    const id = (cupons.at(0)?.id ?? 0) + 1
    const newCupom = {
      codigo: code,
      valor: price,
      porcentagem: percentage,
      descricao: description,
      data_inicio: `${initialDate} 00:00:00`, 
      data_fim: `${endDate} 00:00:00`, 
      dias: 90,
      id: id
    }
    setCupons(cupons)
    BuffetService.addCupom(newCupom)
    cupons.push(Object.assign(newCupom, {id}))
    //getCupons();
    setIsModalOpenCreateCupom(false)
  }

 

  function getCupons(){
    BuffetService.showCupoms()
    .then(res=>{
      setCupons(res)
    })
  }



  return(
    <ModalDashboard 
    isOpen={isModalOpenCreateCupom}
    setIsModalOpen={setIsModalOpenCreateCupom}
    styleSheet={{
      width: '790px',
      height: '470px',
      textAlign: 'left'
    }}
    >
      <Text styleSheet={{padding: '.5rem 0', textAlign: 'left'}} variant="heading4Bold">Criar Cupom</Text>
      <Box tag="form" onSubmit={newCupom}>
        <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'repeat(2, 1fr)', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
        
          <Box>
            <Text>Código</Text>
            <InputDash value={code} onChange={setCode} styleSheet={{backgroundColor: theme.colors.neutral.x100}} placeholder="Digite o código" maxLength={12} required={true}/>
          </Box>
          <Box>
            <Text>Valor do plano</Text>
            <InputDash value={price} onChange={setPrice} styleSheet={{backgroundColor: theme.colors.neutral.x100}} placeholder="Digite o valor" required={true}/>
          </Box>
            <Box>
              <Text>Porcentagem de Desconto</Text>
              <InputDash value={percentage} onChange={setPercentage} styleSheet={{backgroundColor: theme.colors.neutral.x100}} required={true} placeholder="Digite o valor (%)" type="number" min={0} max={100}/>
            </Box>
          <Box styleSheet={{width: '100%', gridColumn: '1/4'}}>
            <Text>Descrição</Text>
            <InputDash value={description} onChange={setDescription} styleSheet={{backgroundColor: theme.colors.neutral.x100, width: '100%'}} required={true}  placeholder="Digite a descrição"/>
          </Box>
        </Box>
        <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '1rem', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
          <Box>
            <Text>Data início</Text>
              <input type="date" value={initialDate} onChange={(e)=>setInitialDate(e.target.value)} required={true} style={{
                backgroundColor: theme.colors.neutral.x100,
                border: 'none',
                borderRadius: '6px',
                padding: '1rem'
              }}
            />
          </Box>
          <Box>
            <Text>Data fim (Expiração)</Text>
            <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} required={true}  style={{
                backgroundColor: theme.colors.neutral.x100,
                border: 'none',
                borderRadius: '6px',
                padding: '1rem'

              }}
            />
          </Box>
        </Box>

        <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'left', gap: '1rem', marginTop: '1rem'}}>
          <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '132px'}} fullWidth colorVariant="secondary" onClick={() => setIsModalOpenCreateCupom(false)}>Não</Button>
          <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '132px'}} fullWidth colorVariant="primary" type="submit">Sim</Button>
        </Box>
      </Box>
    </ModalDashboard>
  )
}

export default ModalDashboardCreateCupons;
