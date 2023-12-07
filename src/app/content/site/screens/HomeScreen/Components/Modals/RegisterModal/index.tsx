import { ModalContext } from "@src/app/context/ModalContext";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import Button from "@src/app/theme/components/Button/Button";
import Image from "@src/app/theme/components/Image/Image";
import Input from "@src/app/theme/components/Input/Input";
import Link from "@src/app/theme/components/Link/Link";
import Text from "@src/app/theme/components/Text/Text";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import IconPassword from '../../../../../../../../../public/assets/icons/password_svg.jpg'
import IconUser from '../../../../../../../../../public/assets/icons/user_svg.jpg'
import IconEmail from '../../../../../../../../../public/assets/icons/email_svg.jpg'
import IconCnpj from '../../../../../../../../../public/assets/icons/cil_building.jpg'
import { GoogleLoginButton } from "../../GoogleLoginButton";
import { UserContext } from "@src/app/context/UserContext";
import BuffetService from "@src/app/api/BuffetService";

export default function ModalRegister({ isOpen, onClose }) {

  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    setEmail,
    setNome,
    setPassword,
    setDocumento,
    nome,
    email,
    documento,
    password,
    setDataUser
  } = useContext(UserContext);
  
  const theme = useTheme();

  if (!isOpen) return null;
  const router = useRouter();

  
  const {
    openNovoModal,
    setModalOpen
  } = useContext(ModalContext)



  const handleSubmit = (e) => {
    e.preventDefault();
    const buffetData = {
        nome: nome,
        email: email,
        password: password,
        documento: documento,
        id_perfil: 2
    };

    BuffetService.createUser(buffetData)
        .then(res => {
          if(res.result.status){
            setResponse(res);
            setDataUser(res)
            setModalOpen(false)
            window.localStorage.setItem('ID_ENTITY', res?.result?.entidade?.id);
            window.localStorage.setItem('USER_NAME', res?.result?.entidade?.nome);
            router.push('/planos')
          }
        })
        .catch(err => {
            console.log(err)
            setError(err.message);
        });
  };






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
          padding: '1rem 2rem',
          backgroundColor: theme.colors.neutral.x050,
          borderRadius: '1rem'
        }}
      >
        <Button
          onClick={onClose}
          fullWidth={false}
          styleSheet={{
            justifyContent: 'flex-end',
            backgroundColor: theme.colors.primary.x700
          }}
        >
          X
      </Button>
      
        <Box tag="form" styleSheet={{display: 'flex', flexDirection: 'column', gap: '0.7rem'}} onSubmit={handleSubmit}>
          <Box styleSheet={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignSelf: 'center', padding: '0', width: '100%'}}>
            <Text variant="heading5semiBold">Quer começar a anunciar seu espaço?</Text>
            <Text variant="small" styleSheet={{width: '90%', textAlign: 'center', margin: '0 auto'}}>
              Crie sua conta abaixo, ative sua conta, adicione as informações do seu espaço
              e aproveite dos benefícios.
            </Text>
          </Box>

          <GoogleLoginButton/>

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
                padding: '.5rem .8rem',
                border: 'none',
              }}
            />
          </Box>
          
          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.6rem'}}>
            <Image src={IconUser.src} alt="" styleSheet={{width: '29px'}}/>
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
                padding: '.5rem .8rem',
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
                padding: '.5rem .8rem',
                border: 'none',
              }}
            />
          </Box>
          <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
            <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x000, padding: '.6rem'}}>
              <Image src={IconCnpj.src} alt="" styleSheet={{width: '24px'}}/>
            </Box>
            <Input 
              type="text" 
              required={true}
              placeholder="CNPJ"
              onChange={(e)=>setDocumento(e)}
              styleSheet={{
                width: '100%',
                borderRadius: '1px',
                backgroundColor: theme.colors.neutral.x000,
                padding: '.5rem .8rem',
                border: 'none',
              }}
            />
          </Box>

          <Box styleSheet={{display: 'grid', gridTemplateColumns: '2fr 30fr', padding: '0.5rem'}}>
              <Input type="checkbox" styleSheet={{width: '15px', height: '15px'}} required={true}/>
              <Text variant="body1">Eu concordo com todas as declarações incluídas nos <b>Termos de Uso</b></Text>
          </Box>
          
          <Button fullWidth colorVariant="secondary" type="submit" >
            Confirmar
          </Button>
          <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
            <Text styleSheet={{textAlign: 'left', color: theme.colors.neutral.x999}} variant="body1">Você tem uma conta?</Text>
            <Box onClick={openNovoModal} styleSheet={{cursor: 'pointer'}}>
              <Text styleSheet={{color: theme.colors.secondary.x500}}>Entrar</Text>
            </Box>
          </Box>
          <Link href="/" styleSheet={{textAlign: 'left', color: theme.colors.neutral.x999}} variant="body1">Esqueceu sua senha?</Link>
          <Link href="/" styleSheet={{textAlign: 'left'}} colorVariant="secondary" variant="body1">Redefinir senha</Link>
        </Box>
      </Box>
    </Box>
  );
}
