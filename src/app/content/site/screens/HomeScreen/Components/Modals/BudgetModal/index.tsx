import { ModalContext } from "@src/app/context/ModalContext";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import Button from "@src/app/theme/components/Button/Button";
import Icon from "@src/app/theme/components/Icon/Icon";
import Image from "@src/app/theme/components/Image/Image";
import Input from "@src/app/theme/components/Input/Input";
import Link from "@src/app/theme/components/Link/Link";
import Text from "@src/app/theme/components/Text/Text";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import IconPassword from '../../../../../../../../../public/assets/icons/password_svg.jpg'
import IconUser from '../../../../../../../../../public/assets/icons/user_svg.jpg'
import IconEmail from '../../../../../../../../../public/assets/icons/email_svg.jpg'
import IconDocument from '../../../../../../../../../public/assets/icons/cil_building.jpg'
import GoogleLoginButton from "../../GoogleLoginButton";

import {Button as BtnMaterial} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import BuffetService from "@src/app/api/BuffetService";
import { UserContext } from "@src/app/context/UserContext";
import useSize from "@src/app/theme/helpers/useSize";
import path from "path";

export default function ModalBudget({ isOpen, onClose }) {
  const theme = useTheme();


  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [documento, setDocumento] = useState('');
  const [nome, setNome] = useState('');

  const[errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('')
  const [href, sethref] = useState('')
 
  const {
    openNovoModal,
    isModalOpen,
    setModalOpen,
    openRecoveryPassword,
    closeRecoveryPassword
  } = useContext(ModalContext)

  const size = useSize()

  const {
    dataUser,
    setDataUser
  } = useContext(UserContext)


  useEffect(()=>{
    const href = router.pathname;
    sethref(href)
  }, [href])

   
    
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
      setDocumento(formattedValue);
    } else if (cleanedValue.length === 14) {
      // É um CNPJ, aplica a máscara
      const formattedValue = cleanedValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
      setDocumento(formattedValue);
    } else {
      // Valor inválido, não aplica máscara
      setDocumento(cleanedValue);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const buffetData = {
        nome: nome,
        email: email,
        password: password,
        id_perfil: 3
    };

    try{
      BuffetService.createUser(buffetData)
      .then(res => {
        res?.messages?.errors ? setErrors( res?.messages?.errors): ''
        if(res?.result?.status){
          setDataUser(res)
          setModalOpen(false)
          
          window.localStorage.setItem('ID_ENTITY', res?.result?.entidade?.id);
          window.localStorage.setItem('USER_NAME', res?.result?.entidade?.nome);
          window.localStorage.setItem('USER_TOKEN', res?.token?.token);
          window.localStorage.setItem('USER_ID', res?.result?.user?.id_entidade);
          window.localStorage.setItem('USER_ROLE', res?.result?.user?.id_perfil);
          setSuccess('Cadastro realizado com sucesso!');
          href === '/orcamento-por-regiao' ? window?.location?.reload() : router.push('/dashboard/cliente')

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

    setTimeout(()=>{
      setIsLoading(false)
    }, 1000)
      
  };

  useEffect(() => {
    const clearMessages = () => {
      setTimeout(() => {
        setErrors(null);
      }, 3000);
    };

    if (errors || success) {
      clearMessages();
    }
  }, [errors, success]);


  return (
    <Box
      styleSheet={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: '120'
      }}
    >
      <Box
        styleSheet={{
          width: '570px',
          padding: '2rem',
          backgroundColor: theme.colors.neutral.x050,
          borderRadius: '1rem'
        }}
      >
        <Button
          onClick={onClose}
          fullWidth={false}
          styleSheet={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '100%',
            height: '30px',
            width: '25px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: '1rem',
            position: 'relative',
            alignSelf: 'end',
            marginTop: '-1rem',
            marginRight: '-1rem',
            boxShadow: '0.5px 1px 3px 1px #969BA0'
          }}
        >
          X
      </Button>
      
      
        <Box tag="form" styleSheet={{display: 'flex', flexDirection: 'column', gap: '1rem'}} onSubmit={handleSubmit}>
          <Box styleSheet={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignSelf: 'center', padding: '0', width: '100%'}}>
            <Text  variant="heading4" styleSheet={{fontWeight: 'bold'}}>Quer solicitar orçamentos?</Text>
          </Box>
          
          <GoogleLoginButton/>

          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.585rem'}}>
            <Image src={IconUser.src} alt="" styleSheet={{width: '29px'}}/>
            </Box>
            <Input 
              type="text" 
              required={true}
              placeholder="Insira seu nome"
              onChange={(e)=>setNome(e)}
              styleSheet={{
                width: '100%',
                borderRadius: '1px',
                backgroundColor: theme.colors.neutral.x000,
                padding: '.8rem',
                border: 'none',
              }}
            />
          </Box>
          
          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.585rem'}}>
            <Image src={IconEmail.src} alt="" styleSheet={{width: '29px'}}/>
            </Box>
            <Input 
              type="email" 
              required={true}
              onChange={(e)=>setEmail(e)}
              placeholder="Insira seu e-mail"
              styleSheet={{
                width: '100%',
                borderRadius: '1px',
                backgroundColor: theme.colors.neutral.x000,
                padding: '.8rem',
                border: 'none',
              }}
            />
          </Box>
     
          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.6rem'}}>
              <Image src={IconPassword.src} alt="" styleSheet={{width: '29px'}}/>
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
                padding: '.8rem',
                border: 'none',
              }}
            />
          </Box>
         

          <Box styleSheet={{display: 'grid', gridTemplateColumns: '2fr 30fr', padding: '0.5rem'}}>
              <Input type="checkbox" styleSheet={{width: '15px', height: '15px'}} required={true}/>
              <Text variant="body1">Eu concordo com todas as declarações incluídas nos <b>Termos de Uso</b></Text>
          </Box>
          
          <BtnMaterial
          type="submit"
          variant="contained"
          disabled={isLoading}
          style={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '20px'
          }}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? <Text color={theme.colors.neutral.x000}>Cadastrando...</Text> : <Text  color={theme.colors.neutral.x000}>Cadastrar</Text>}
        </BtnMaterial>

          <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '.8rem'}}>
            <Text styleSheet={{textAlign: 'left', color: theme.colors.neutral.x999}} variant="body1">Você tem uma conta?</Text>
            <Box onClick={openNovoModal} styleSheet={{cursor: 'pointer'}}>
              <Text styleSheet={{color: theme.colors.secondary.x500}}>Entrar</Text>
            </Box>
          </Box>

          <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
            <Text styleSheet={{textAlign: 'left', color: theme.colors.neutral.x999}} variant="body1">Esqueceu sua senha?</Text>
              <Box onClick={openRecoveryPassword} styleSheet={{cursor: 'pointer'}}>
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
         {success && (
             <Text color="green">Cadastro realizado com sucesso!</Text>
         )}
        </Box>
      </Box>
    </Box>
  );
}
