import { ModalContext } from "@src/app/context/ModalContext";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import Input from "@src/app/theme/components/Input/Input";
import Link from "@src/app/theme/components/Link/Link";
import Text from "@src/app/theme/components/Text/Text";
import { useContext, useEffect, useState } from "react";
import IconPassword from '../../../../../../../../../public/assets/icons/password_svg.jpg'
import IconEmail from '../../../../../../../../../public/assets/icons/email_svg.jpg'
import Image from "@src/app/theme/components/Image/Image";
import GoogleLoginButton from "../../GoogleLoginButton";
import BuffetService from "@src/app/api/BuffetService";
import { UserContext } from "@src/app/context/UserContext";
import { useRouter } from "next/router";
import { Button as BtnMaterial } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@src/app/theme/components/Button/Button";
import email from "@src/app/theme/components/Icon/svgs/email";

export default function ModalRecoveryPassword({ isOpen, onClose }) {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState('');

  const {
    setEmail,
    setPassword,
    email,
    setErrorLogin,
    setSuccessLogin,
    login, 
    errorLogin,
    successLogin
  } = useContext(UserContext);


  if (!isOpen) return null;

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();
    const data = {
      "email": email,
      "url": "https://buscabuffet.com.br"
    }
    BuffetService.recoveryPassword(data)
    .then(res=>{
      if(res?.message === "E-mail enviado com sucesso"){
        setMessage('E-mail enviado com sucesso.')
      }
    }).catch(err=>{
      if(err?.response?.data?.message == "Not Found"){
        setMessage("Usuário não encontrado.")
      }
    })
    setTimeout(()=>{
      setIsLoading(false)
    }, 1300)
    
  };

  useEffect(() => {
    const clearMessages = () => {
      setTimeout(() => {
        setMessage('');
      }, 3000);
    };

    if (message) {
      clearMessages();
    }
  }, [message]);


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
      
        <Box tag="form" styleSheet={{display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '.5rem'}} onSubmit={handleSubmit}>
          <Box styleSheet={{textAlign: 'center', display: 'flex', flexDirection: 'row', alignSelf: 'center', padding: '0 2rem', gap: '.5rem'}}>
            <Text variant="heading4" styleSheet={{fontWeight: 'bold'}}>Recuperação de senha</Text>
          </Box>


      
          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.6rem'}}>
            <Image src={IconEmail.src} alt="" styleSheet={{width: '28px'}}/>
            </Box>
            <Input 
              type="email" 
              placeholder="Insira seu e-mail"
              onChange={(e)=>setEmail(e)}
              required={true}
              styleSheet={{
                width: '100%',
                borderRadius: '1px',
                backgroundColor: theme.colors.neutral.x000,
                padding: '.8rem',
                border: 'none',
              }}
            />
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
          {isLoading ? <Text color={theme.colors.neutral.x000}>Enviando...</Text> : <Text  color={theme.colors.neutral.x000}>Recuperar senha</Text>}
        </BtnMaterial>

        <Box styleSheet={{height: '20px'}}>
        {message == "Usuário não encontrado." && (
            <Text color={theme.colors.negative.x700}>Usuário não encontrado.</Text>
          )}
          {message == "E-mail enviado com sucesso." && (
            <Text color={theme.colors.positive.x700}>E-mail enviado com sucesso, por favor, verifique sua caixa de entrada.</Text>
          )}
        </Box>
          
        </Box>
      </Box>
    </Box>
  );
}
