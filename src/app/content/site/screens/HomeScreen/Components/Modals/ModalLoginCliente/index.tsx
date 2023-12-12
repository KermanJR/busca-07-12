import { ModalContext } from "@src/app/context/ModalContext";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";

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
import GoogleLoginButton from "../../GoogleLoginButton";
import { Button as BtnMaterial} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import password from "@src/app/theme/components/Icon/svgs/password";
import BuffetService from "@src/app/api/BuffetService";
import { UserContext } from "@src/app/context/UserContext";
import useSize from "@src/app/theme/helpers/useSize";
import IconCnpj from '../../../../../../../../../public/assets/icons/cil_building.jpg'
import Button from "@src/app/theme/components/Button/Button";
export default function ModalBudgetCliente({ isOpen, onClose }) {
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
 
  const {
    openNovoModal,
    isModalOpen,
    setModalOpen
  } = useContext(ModalContext)
  const size = useSize()
  const {
    dataUser,
    setDataUser
  } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const buffetData = {
        nome: nome,
        email: email,
        password: password,
        documento: documento,
        id_perfil: 3
    };

    try{
      BuffetService.createUser(buffetData)
      .then(res => {
     
        res?.messages?.errors ? setErrors( res?.messages?.errors): ''
        if(res.result.status){
          setDataUser(res)
          setModalOpen(false)
          window.localStorage.setItem('ID_ENTITY', res?.result?.entidade?.id);
          window.localStorage.setItem('USER_NAME', res?.result?.entidade?.nome);
          window.localStorage.setItem('USER_TOKEN', res?.token?.token);
          window.localStorage.setItem('USER_ID', res?.result?.user?.id_entidade);
          window.localStorage.setItem('USER_ROLE', res?.result?.user?.id_perfil);
          setSuccess('Cadastro realizado com sucesso!')
          window.location.reload();

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
          type="submit"
          variant="contained"
          onClick={onClose}
          styleSheet={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '20px',
            position: 'relative',
            left: '0',
            top: '0',
            width: '20px',
            height: '20px'
          }}
        >
          X
        </Button>
      
        <Box tag="form" styleSheet={{display: 'flex', flexDirection: 'column', gap: '1rem'}} onSubmit={handleSubmit}>
          <Box styleSheet={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignSelf: 'center', padding: '0', width: '100%'}}>
            <Text variant="heading5semiBold">Quer solicitar orçamentos?</Text>
          </Box>
          
          <GoogleLoginButton/>
          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.6rem'}}>
            <Image src={IconUser.src} alt="" styleSheet={{width: '29px',  height: size <= 1366 ?  '13px':'auto', objectFit: 'contain'}}/>
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
                padding: size <= 1366 ?  '1rem':'.5rem .8rem',
                border: 'none',
                height: size <= 1366 ?  '25px':'auto',
                filter: 'dropShadow(0px 8px 40px rgba(0, 0, 0, 0.05))'
              }}
            />
          </Box>
          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.6rem'}}>
              <Image src={IconCnpj.src} alt="" styleSheet={{width: '29px',  height: size <= 1366 ?  '12px':'auto', objectFit: 'contain'}}/>
            </Box>
            <Input 
              type="text" 
              required={true}
              placeholder="CPF"
              onChange={(e)=>setDocumento(e)}
              styleSheet={{
                width: '101%',
                borderRadius: '1px',
                backgroundColor: theme.colors.neutral.x000,
                padding: size <= 1366 ?  '1rem':'.5rem .8rem',
                border: 'none',
                height: size <= 1366 ?  '25px':'auto',
                boxShadow: '(0px 8px 40px rgba(0, 0, 0, 0.05))'
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
              placeholder="Insira seu e-mail"
              onChange={(e)=>setEmail(e)}
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
              onChange={(e)=>setPassword(e)}
              placeholder="Insira sua senha"
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
          {isLoading ? <Text color={theme.colors.neutral.x000}>Entrando...</Text> : <Text  color={theme.colors.neutral.x000}>Confirmar</Text>}
        </BtnMaterial>
          <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
            <Text styleSheet={{textAlign: 'left', color: theme.colors.neutral.x999}} variant="body1">Você tem uma conta?</Text>
            <Box onClick={openNovoModal} styleSheet={{cursor: 'pointer'}}>
              <Text styleSheet={{color: theme.colors.secondary.x500}}>Entrar</Text>
            </Box>
          </Box>
          <Link href="/" styleSheet={{textAlign: 'left', color: theme.colors.neutral.x999}} variant="body1">Esqueceu sua senha?</Link>
          <Link href="/" styleSheet={{textAlign: 'left'}} colorVariant="secondary" variant="body1">Redefinir senha</Link>
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
