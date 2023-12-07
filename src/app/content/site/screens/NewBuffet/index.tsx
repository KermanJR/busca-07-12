"use client"

import { ModalContext } from "@src/app/context/ModalContext";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import axios from "axios";
import Image from "@src/app/theme/components/Image/Image";
import Input from "@src/app/theme/components/Input/Input";
import Link from "@src/app/theme/components/Link/Link";
import Text from "@src/app/theme/components/Text/Text";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import IconPassword from '../../../../../../public/assets/icons/password_svg.jpg'
import IconUser from '../../../../../../public/assets/icons/user_svg.jpg'
import IconEmail from '../../../../../../public/assets/icons/email_svg.jpg'
import IconCnpj from '../../../../../../public/assets/icons/cil_building.jpg'
import { UserContext } from "@src/app/context/UserContext";
import BuffetService from "@src/app/api/BuffetService";
import { BsCheck } from "react-icons/bs";
import useSize from "@src/app/theme/helpers/useSize";
import ModalBudget from "../HomeScreen/Components/Modals/BudgetModal";
import ModalLogin from "../HomeScreen/Components/Modals/LoginModal";
import FundoLogin from '../../../../../../public/assets/images/fundo-login2.jpg';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ModalRecoveryPassword from "../HomeScreen/Components/Modals/RecoveryPassword";
import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { BsBuilding } from "react-icons/bs";
export default function NewBuffet() {
 
  const [response, setResponse] = useState<any>(null);
  const [errors, setErrors] = useState<[]>([]);
  const [errorDocument, setErrorDocument] = useState('');

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null);
  const [valorPlanoBasico, setValorPlanoBasico] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setEmail,
    setNome,
    setPassword,
    setDocumento,
    nome,
    email,
    setIdPerfil,
    setRememberMeToken,
    documento,
    password,
    setDataUser
  } = useContext(UserContext);

  
  
  const theme = useTheme();
  const size = useSize()
  const router = useRouter();

  
  const {
    isModalOpen,
    closeModal,
    isNovoModalOpen,
    closeNovoModal,
    closeBudgetModal,
    isModalOpenBudget,
    isModalRecoveryPassword,
    closeRecoveryPassword,
    openRecoveryPassword,
    setModalOpen
  } = useContext(ModalContext)
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const buffetData = {
        nome: nome,
        email: email,
        password: password,
        documento: documento,
        id_perfil: 2
    };

    try{
      BuffetService.createUser(buffetData)
      .then(res => {
        res?.messages?.errors ? setErrors( res?.messages?.errors): ''
        if(res.result.status){
          setResponse(res);
          setDataUser(res);
          setModalOpen(false)
          window.localStorage.setItem('ID_ENTITY', res?.result?.entidade?.id);
          window.localStorage.setItem('USER_NAME', res?.result?.entidade?.nome);
          window.localStorage.setItem('USER_TOKEN', res?.token?.token);
          window.localStorage.setItem('USER_ID', res?.result?.user?.id_entidade);
          window.localStorage.setItem('USER_ROLE', res?.result?.user?.id_perfil);
          setSuccess('Cadastro realizado com sucesso!')
          router.push('/planos')

        }else if(res?.messages?.errors){
          setErrors(res?.messages?.errors);
        }
       
      })
      .catch(err => {
        console.log(err)
      });
     
    }catch(err){
      console.log(err)
    }
      setIsLoading(false)
  };

 
  useEffect(()=>{
    BuffetService.showPlans()
    .then(res=>{
      setValorPlanoBasico(res[0].valor_mensal)
    })
  }, [])

  useEffect(() => {
    const clearMessages = () => {
      setTimeout(() => {
        setErrors(null);
        setErrorDocument('')
      }, 3000);
    };

    if (errors || success || errorDocument) {
      clearMessages();
    }
  }, [errors, success, errorDocument]);

  const validarCPF = async (cpf) => {
    const apiUrl = `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${removeMask(cpf)}`;
    try {
      const response = await axios.get(apiUrl);
      if (response.data.STATUS === 'ATIVA') {
        setDocumento(cpf)
      } else {
        setErrorDocument('Documento inválido.');
      }
    } catch (error) {
      console.error('Erro ao validar CPF:', error);
      setErrorDocument('Erro o verificar validade o documento.');
    }
  };

  const formatDocument = (value) => {
    // Remove caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');
  
    // Limita a quantidade de caracteres a 14
    if (cleanedValue.length <= 14) {
      if (cleanedValue.length === 14) {
        // É um CNPJ, aplica a máscara
        const formattedValue = cleanedValue.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          '$1.$2.$3/$4-$5'
        );
        validarCPF(formattedValue)
        // Atualiza o estado com o CNPJ formatado
        setDocumento(formattedValue);
      } else {
        // Valor inválido ou não completo, não aplica a máscara
        setDocumento(cleanedValue);
      }
    }
  };

  const removeMask = (formattedCNPJ) => {
    // Remove todos os caracteres não numéricos
    return formattedCNPJ.replace(/\D/g, '');
  };



  return (
    <Box styleSheet={{ 
    backgroundColor:theme.colors.neutral.x050, 
    display: 'flex', 
     flexWrap: 'wrap', 
     flexDirection: 'row', 
     justifyContent: 'center',
      gap: (size < 910) && '30px', paddingTop: !(size < 910) ? '90px' : '60px', height: size <= 800 ? 'auto' : '80vh'}}>
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
      <Box styleSheet={{
        display: 'flex',
        width: size <= 800 ? '100%' : '50%',
        flexDirection: 'column',
        gap: (!(size < 1230) ? '15%' : !(size < 910) ? '5%' : '20px'),
        marginLeft: (!(size < 1230) ? '0' : '0px'),
        padding: (!(size < 1230) ? '7rem' : !(size < 410) ? '50px 30px' : '30px 0px'),
        backgroundImage: `URL(${FundoLogin.src})`,
        backgroundSize: 'cover 100% 100%',
        
      }}>
        <Text tag={!(size < 1230) ? "h3" : 'h5'} variant={!(size < 1230) ? "heading3semiBold" : "heading5semiBold"} color="#fff" styleSheet={{textAlign: 'center'}}>EXPERIMENTE GRÁTIS POR 90 DIAS</Text>
        <ul>
          <li style={{display: 'flex', width: 'auto', alignItems: 'center'}}>
            <BsCheck style={{display: 'inline-block', width: !(size < 350) ? '50px' : '30px', fill: theme.colors.secondary.x500}}/>
            <p style={{width: 'auto', fontWeight: !(size < 1230) ? 'bold' : '500', color: '#fff', fontSize: (size < 350) && '0.6rem'}}>Sua empresa em evidência.</p>
          </li>
          <li style={{display: 'flex', alignItems: 'center'}}>
            <BsCheck style={{display: 'inline-block', width: !(size < 350) ? '50px' : '30px', fill: theme.colors.secondary.x500}}/>
            <p style={{width: 'auto', fontWeight: !(size < 1230) ? 'bold' : '500', color: '#fff', fontSize: (size < 350) && '0.6rem'}}>Receba solicitações de orçamento.</p>
          </li>
          <li style={{display: 'flex', alignItems: 'center'}}>
            <BsCheck style={{display: 'inline-block', width: !(size < 350) ? '50px' : '30px', fill: theme.colors.secondary.x500}}/>
            <p style={{width: 'auto', fontWeight: !(size < 1230) ? 'bold' : '500', color: '#fff', fontSize: (size < 350) && '0.6rem'}}>Plataforma intuitiva para gestão dos clientes.</p>
          </li>
          <li style={{display: 'flex', alignItems: 'center'}}>
            <BsCheck style={{display: 'inline-block', width: !(size < 350) ? '50px' : '30px', fill: theme.colors.secondary.x500}}/>
            <p style={{width: 'auto', fontWeight: !(size < 1230) ? 'bold' : '500', color: '#fff', fontSize: (size < 350) && '0.6rem'}}>Perfil exclusivo para sua empresa.</p>
          </li>
          <li style={{display: 'flex', alignItems: 'center'}}>
            <BsCheck style={{display: 'inline-block', width: !(size < 350) ? '50px' : '30px', fill: theme.colors.secondary.x500}}/>
            <p style={{width: 'auto', fontWeight: !(size < 1230) ? 'bold' : '500', color: '#fff', fontSize: (size < 350) && '0.6rem'}}>Cancele quando quiser, sem multa.</p>
          </li>
        </ul>
      </Box>

      <Box
        styleSheet={{
          marginTop: size <= 800 ? '0' : '2.5rem',
          marginBottom: size <= 800 ? '-5rem' : '0',
          padding: size <= 800 ? '3rem .8rem' : '1rem',
          height: size <= 800 ? '110vh' : '75vh', 
          width: size <= 800 ? '100%' : '50%',
          backgroundColor: theme.colors.neutral.x050,
        
        }}
      >
        <Box tag="form" styleSheet={{display: 'flex', flexDirection: 'column', gap: '0.7rem', width: '100%',
         padding:  size <= 1366 && '0rem 3rem' || size >= 1366 && '4rem 20%' }} onSubmit={handleSubmit}>
          <Box styleSheet={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignSelf: 'center', padding: '0', width: '100%'}}>
            <Text variant="heading5semiBold">Quer começar a anunciar seu espaço?</Text>
            <Text variant="small" styleSheet={{width: '90%', textAlign: 'center', margin: '0 auto'}}>
              Crie sua conta abaixo, ative sua conta, adicione as informações do seu espaço
              e aproveite dos benefícios!
            </Text>
          </Box>

          <Box>
            <span style={{display: 'inline-block', width: '50%', height: '3px', margin: '10px auto', backgroundColor: '#EA760A88'}}></span>
          </Box>

          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.585rem'}}>
            <CiMail fill={theme.colors.secondary.x500} size={22}/>
            </Box>
            <Input 
              type="email" 
              required={true}
              placeholder="Insira seu e-mail"
              onChange={(e)=>setEmail(e)}
              styleSheet={{
                width: '100%',
                borderRadius: '1px',
                backgroundColor: theme.colors.neutral.x000,
                padding: size <= 1366 ?  '1.25999rem':'.5rem .8rem',
                height: size <= 1366 ?  '25px':'auto',
                border: 'none'
              }}
            />
          </Box>
          
          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.6rem'}}>
            <CiUser fill={theme.colors.secondary.x500} size={22}/>
            </Box>
            <Input 
              type="text" 
              required={true}
              placeholder="Nome do seu espaço"
              onChange={(e)=>setNome(e)}
              styleSheet={{
                width: '100%',
                borderRadius: '1px',
                backgroundColor: theme.colors.neutral.x000,
                padding: size <= 1366 ?  '1.25999rem':'.5rem .8rem',
                border: 'none',
                height: size <= 1366 ?  '25px':'auto',
                filter: 'dropShadow(0px 8px 40px rgba(0, 0, 0, 0.05))'
              }}
            />
          </Box>

          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.6rem'}}>
            <IoLockClosedOutline  color={theme.colors.secondary.x500} fill={theme.colors.secondary.x500} size={22}/>
            </Box>
            <Input 
              type="password" 
              required={true}
              placeholder="Insira sua senha"
              onChange={(e)=>setPassword(e)}
              styleSheet={{
                width: '100%',
                borderRadius: '1px',
                backgroundColor: theme.colors.neutral.x000,
                padding: size <= 1366 ?  '1.25999rem':'.5rem .8rem',
                height: size <= 1366 ?  '25px':'auto',
                border: 'none'
              }}
            />
          </Box>
          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.6rem'}}>
            <BsBuilding   fill={theme.colors.secondary.x500} size={21}/>
            </Box>
            <Input 
              type="text" 
              required={true}
              placeholder="CNPJ"
              onChange={(e)=>formatDocument(e)}
              value={documento}
              styleSheet={{
                width: '100%',
                borderRadius: '1px',
                backgroundColor: theme.colors.neutral.x000,
                padding: size <= 1366 ?  '1.25999rem':'.5rem .8rem',
                border: 'none',
                height: size <= 1366 ?  '25px':'auto',
                boxShadow: '(0px 8px 40px rgba(0, 0, 0, 0.05))'
              }}
            />
          </Box>

          <Box styleSheet={{display: 'grid', gridTemplateColumns: '2fr 30fr', padding: '0.5rem', width: '100%'}}>
              <Input type="checkbox" styleSheet={{width: '15px', height: '15px'}} required={true}/>
              <Text variant="body1">Eu concordo com todas as declarações incluídas nos Termos de Uso</Text>
          </Box>
          
      

          <Button
          type="submit"
          variant="contained"
          
          disabled={isLoading}
          style={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '20px'
          }}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? <Text color={theme.colors.neutral.x000}>Enviando...</Text> : <Text  color={theme.colors.neutral.x000}>Enviar</Text>}
        </Button>

          
          <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
            <Text styleSheet={{textAlign: 'left', color: theme.colors.neutral.x999}} variant="body1">Você tem uma conta?</Text>
            <Box styleSheet={{cursor: 'pointer'}}>
              <Text styleSheet={{color: theme.colors.secondary.x500}} onClick={(e)=>router.push('/login')}>Entrar</Text>
            </Box>
          </Box>
          <Box  onClick={openRecoveryPassword} styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
            <Text styleSheet={{textAlign: 'left', color: theme.colors.neutral.x999}} variant="body1">Esqueceu sua senha?</Text>
              <Box  styleSheet={{cursor: 'pointer'}}>
                <Text styleSheet={{color: theme.colors.secondary.x500}}>Redefinir senha</Text>
              </Box>
          </Box>
          {errors && errors?.map((item, index)=>{
          return <>
            {item?.['message'] === 'unique validation failure' && item?.['field'] === 'email' &&
             <Text key={index} color="red" styleSheet={{fontWeight: '400', fontSize: '.875rem'}}>E-mail já utilizado, tente novamente.</Text>
            }

            {item?.['message'] === 'unique validation failure' && item?.['field'] === 'documento' &&
             <Text key={index} color="red" styleSheet={{fontWeight: '400', fontSize: '.875rem'}}>Documento já utilizado, tente novamente.</Text>
            }
            </>
         
        })}

        {errorDocument &&   <Text color="red" styleSheet={{fontWeight: '400', fontSize: '.875rem'}}>{errorDocument}</Text>}

        {success && (
             <Text color="green">{success}</Text>
         )}
        </Box>
        
      </Box>
     
    </Box>
  )
}
