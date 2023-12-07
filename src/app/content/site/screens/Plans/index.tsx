import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import { useContext, useEffect, useState } from "react";
import Text from "@src/app/theme/components/Text/Text";
import Icon from "@src/app/theme/components/Icon/Icon";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import BannerAnotherPages from '../../../../../../public/assets/images/banner_another_pages.webp';
import Button from "@src/app/theme/components/Button/Button";
import { useRouter } from "next/router";
import { ModalContext } from "@src/app/context/ModalContext";
import ModalRegister from "../HomeScreen/Components/Modals/RegisterModal";
import ModalLogin from "../HomeScreen/Components/Modals/LoginModal";
import ModalBudget from "../HomeScreen/Components/Modals/BudgetModal";
import useSize from "@src/app/theme/helpers/useSize";
import { BoxInfo } from "./BoxInfo";
import BuffetService from "@src/app/api/BuffetService";
import { UserContext } from "@src/app/context/UserContext";
import useFormatarMoeda from "@src/app/theme/helpers/useFormatarMoeda";
import PagBankService from "@src/app/api/PagBankService";
import ModalRecoveryPassword from "../HomeScreen/Components/Modals/RecoveryPassword";
export default function Plans(){

  //hooks
    const isMobile = useResponsive()
    const size = useSize()
    const theme = useTheme();
    const router = useRouter();
    const formatarMoeda = useFormatarMoeda();

  //Datas
    const [dataPlans, setDataPlans] = useState([]);
    const [planosPagBank, setPlanosPagBank] = useState([]);
    const [planoSelecionadoPagBank, setPlanoSelecionadoPagBank] = useState('');
   


  //Contexts

  
  const {
    isModalOpen,
    closeModal,
    isNovoModalOpen,
    closeNovoModal,
    closeBudgetModal,
    isModalOpenBudget,
    isModalRecoveryPassword,
    closeRecoveryPassword,
    openRecoveryPassword
  } = useContext(ModalContext)

    const {
      setSelectedPlan
    } = useContext(UserContext)

    
  //Functions
    const navigateCheckout = (data, id_plano)=>{
      setSelectedPlan(data)
      window.localStorage.setItem('VALUE_PLAN', formatarMoeda(data?.valor_mensal));
      window.localStorage.setItem('NAME_PLAN', data?.nome)
      window.localStorage.setItem('ID_PLAN', id_plano)

      router.push('/checkout')
    }
    

    useEffect(()=>{
      PagBankService.getPlansPagBank()
      .then(res=>{
        setPlanosPagBank(res?.plans)
      }).catch(err=>{
        console.log(err)
      })
    }, [])
    
    

  useEffect(()=>{
    BuffetService.showPlans()
    .then(res => {
      setDataPlans(res)
    })
    .catch(err => {
      console.log(err)
    });


  }, [])

   
  
    return(
        <Box tag="main"
            styleSheet={{
            alignItems: 'center',
            margin: '0 auto'
        }}>

          {/* Novo modal que será aberto */}
       {isNovoModalOpen &&(
            <ModalLogin isOpen={isNovoModalOpen} onClose={closeNovoModal} />
          )}

          {isModalOpenBudget &&(
            <ModalBudget isOpen={isModalOpenBudget} onClose={closeBudgetModal} />
          )}  

{isModalRecoveryPassword &&(
            <ModalRecoveryPassword isOpen={isModalRecoveryPassword} onClose={closeRecoveryPassword} />
          )} 

        {/*Banner Principal*/}      
        <Box styleSheet={{
            width: '100%',
            height: '281px',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            background: `url(${BannerAnotherPages.src})`,
            padding: `${isMobile ? '5rem': '6rem'}`
        }}>
            <Text 
            tag="h1" 
            variant="heading1Bold" 
            styleSheet={{color: theme.colors.neutral.x000}}>
                Planos
            </Text>
        </Box> 

        <Box styleSheet={{margin: '0 auto', textAlign: 'center', padding: !isMobile ? '4rem 6.5rem' : (!(size < 380) ? '3rem 5rem' : '3rem')}}>
          <Text variant="heading1semiBold" styleSheet={{width: '90%', margin: '0 auto'}}>Escolha seu plano e comece a degustar o período de teste grátis</Text>
          <Text variant="body2" styleSheet={{paddingTop: '.7rem'}}>Anuncie seu buffet e receba orçamentos</Text>
        </Box>  
          
        <Box styleSheet={{display: 'grid', gridTemplateColumns: !(size < 1100) ? 'repeat(3, 1fr)' : '1fr', gap: '2rem', paddingBottom: '5rem'}}>
          <Box styleSheet={{boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x050}`, width: !(size < 1100) ? '30vw' : (!(size < 380) ? '23.5625rem': '100vw'), maxWidth: '23.5625rem', height: 'auto', borderRadius: '1.25rem', padding: '2rem'}}>
              <Text color={theme.colors.neutral.x999}>Basic</Text>
              <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1rem'}}>
                <Text variant="heading3Bold" color={theme.colors.neutral.x999}>{formatarMoeda(dataPlans[0]?.valor_mensal)}</Text>
                <Text variant="body2" color={theme.colors.neutral.x400}>/mês</Text>
              </Box>
              {/*<Text color={theme.colors.neutral.x999} styleSheet={{padding: '1rem 0'}}>Total de {formatarMoeda(dataPlans[0]?.valor_anual)}</Text>*/}
              <Box tag="ul" styleSheet={{marginTop: '1rem'}}>

                {dataPlans[0]?.tags?.map((element, index) => (
                  <Box tag="li" key={index} 
                  styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '.5rem 0'}}>
                  <Text variant="body1" color={theme.colors.neutral.x999} styleSheet={!(size < 380) ? {width: '80%'} : {fontSize: '0.7rem'}}>{element}</Text>
                  <Icon name="checkCircle"/>
                  </Box>
                ))}
              </Box>
              <Button styleSheet={{alignSelf: 'center', marginTop: 'auto', width: '100%', padding: '1rem'}} size="lg" fullWidth onClick={(e)=>navigateCheckout(dataPlans[0], 1)}>CONTINUAR</Button>
          </Box>
          <Box styleSheet={{boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x050}`, width: !(size < 1100) ? '30vw' : (!(size < 380) ? '23.5625rem' : '100vw'), maxWidth: '23.5625rem', height: '33.6875rem', borderRadius: '1.25rem', padding: '2rem', border: `1px solid ${theme.colors.primary.x1000}`}}>
                <Text color={theme.colors.neutral.x999}>Standard</Text>
                <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1rem'}}>
                  <Text variant="heading3Bold" color={theme.colors.neutral.x999}>{formatarMoeda(dataPlans[1]?.valor_mensal)}</Text>
                  <Text variant="body2" color={theme.colors.neutral.x400}>/mês</Text>
                </Box>
                 {/*<Text color={theme.colors.neutral.x999} styleSheet={{padding: '1rem 0'}}>Total de {formatarMoeda(dataPlans[1]?.valor_anual)}</Text>*/}
                 <Box tag="ul" styleSheet={{marginTop: '1rem'}}>
                  {dataPlans[1]?.tags?.map((element, index) => (
                    <Box tag="li" key={index} 
                    styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '.5rem 0'}}>
                    <Text variant="body1" color={theme.colors.neutral.x999} styleSheet={!(size < 380) ? {width: '80%'} : {fontSize: '0.7rem'}}>{element}</Text>
                    <Icon name="checkCircle"/>
                </Box>
                 ))}
               
              </Box>
              <Button styleSheet={{alignSelf: 'center', marginTop: 'auto', width: '100%', padding: '1rem'}} size="lg" colorVariant="secondary" onClick={(e)=>navigateCheckout(dataPlans[1], 2)}>CONTINUAR</Button>
            </Box>
            <Box styleSheet={{boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x050}`, width: !(size < 1100) ? '30vw' : (!(size < 380) ? '23.5625rem' : '100vw'), maxWidth: '23.5625rem', height: '33.6875rem', borderRadius: '1.25rem', padding: '2rem'}}>
                <Text color={theme.colors.neutral.x999}>Premium</Text>
                <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1rem'}}>
                  <Text variant="heading3Bold" color={theme.colors.neutral.x999}>{formatarMoeda(dataPlans[2]?.valor_mensal)}</Text>
                  <Text color={theme.colors.neutral.x400} variant="body2">/mês</Text>
                </Box>
             {/*<Text color={theme.colors.neutral.x999} styleSheet={{padding: '1rem 0'}}>Total de {formatarMoeda(dataPlans[2]?.valor_anual)}</Text>*/}
                <Box tag="ul" styleSheet={{marginTop: '1rem'}}>

                  {dataPlans[2]?.tags?.map((element, index) => (
                    <Box tag="li" key={index} 
                    styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '.5rem 0'}}>
                    <Text variant="body1" color={theme.colors.neutral.x999} styleSheet={!(size < 380) ? {width: '80%'} : {fontSize: '0.7rem'}}>{element}</Text>

                    <Icon name="checkCircle"/>
                </Box>
                 ))}
                
                </Box>
                <Button styleSheet={{alignSelf: 'center', marginTop: 'auto', width: '100%', padding: '1rem'}} size="lg" onClick={(e)=>navigateCheckout(dataPlans[2], 3)}>CONTINUAR</Button>
            </Box>
           
            
        </Box>
        <Text styleSheet={{marginTop: '-2rem'}}>Cancele quando quiser e sem multa.</Text>
        </Box>
    )

}
