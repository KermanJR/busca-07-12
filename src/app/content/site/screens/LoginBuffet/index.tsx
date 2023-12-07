"use client"

import { ModalContext } from "@src/app/context/ModalContext";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";

import Input from "@src/app/theme/components/Input/Input";
import Link from "@src/app/theme/components/Link/Link";
import Text from "@src/app/theme/components/Text/Text";
import { useContext, useEffect, useState } from "react";
import IconPassword from '../../../../../../public/assets/icons/password_transparent_svg.png'
import IconUser from '../../../../../../public/assets/icons/user_transparent_svg.png'
import Image from "@src/app/theme/components/Image/Image";
import IconLoginBuffet1 from '../../../../../../public/assets/icons/icon_login_buffet_1.png';
import IconLoginBuffet2 from '../../../../../../public/assets/icons/icon_login_buffet_2.png';
import IconLoginBuffet3 from '../../../../../../public/assets/icons/icon_login_buffet_3.png';
import IconLoginBuffet4 from '../../../../../../public/assets/icons/icon_login_buffet_4.png';
import IconLoginBuffet5 from '../../../../../../public/assets/icons/icon_login_buffet_5.png';
import IconLoginBuffet6 from '../../../../../../public/assets/icons/icon_login_buffet_6.png';
import IconLoginBuffet7 from '../../../../../../public/assets/icons/icon_login_buffet_7.png';
import BuffetService from "@src/app/api/BuffetService";
import { UserContext } from "@src/app/context/UserContext";
import { useRouter } from "next/router";
import useSize from "@src/app/theme/helpers/useSize";
import { BsCheck } from "react-icons/bs";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import ModalBudget from "../HomeScreen/Components/Modals/BudgetModal";
import ModalLogin from "../HomeScreen/Components/Modals/LoginModal";
import FundoLogin from '../../../../../../public/assets/images/fundo-login.jpg';
import FundoLogin2 from '../../../../../../public/assets/images/fundo-login2.jpg';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ModalRecoveryPassword from "../HomeScreen/Components/Modals/RecoveryPassword";
import WhatsAppButton from "../HomeScreen/Components/WhatsappButton";

export default function LoginBuffet() {
  const theme = useTheme();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const size = useSize()
  const isMobile = useResponsive()
  const [isLoading, setIsLoading] = useState(false);

  const {
    setEmail,
    setPassword,
    email,
    setDataUser,
    setIdPerfil,
    setRememberMeToken,
    password
  } = useContext(UserContext);

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
    setModalOpen
  } = useContext(ModalContext)

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    const loginData = {
        email: email,
        password: password,
    };

    BuffetService.loginUser(loginData)
        .then(res => {
          if(res.user){
            window.localStorage.setItem('USER_TOKEN', res?.token?.token);
            window.localStorage.setItem('USER_ID', res?.user?.id_entidade);
            window.localStorage.setItem('USER_ROLE', res?.user?.id_perfil);
            setIdPerfil(res?.user?.id_entidade)
            setRememberMeToken(res?.token?.token)
            setDataUser(res)
            setSuccess('Login efetuado com sucesso!');
            setModalOpen(false)
            router.push('/dashboard/buffet')
          }
        })
        .catch(err => {
          setError(err.message);
        });
        setLoading(false)
  };

  useEffect(() => {
    const clearMessages = () => {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
    };

    if (error || success) {
      clearMessages();
    }
  }, [error, success]);
  
  return (
    <Box styleSheet={{display: 'flex', flexDirection: 'column', paddingTop: !(size < 910) ? '90px' : '60px'}}>
      
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
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: (!(size < 1230) ? '150px 75px 75px' : !(size < 410) ? '150px 30px 50px' : '150px 0px 30px'),
        background: size <= 1000 ? 'linear-gradient(90deg, #2649AC 11.02%, #BE6BE1 73.28%)': `URL(${FundoLogin.src})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center'
 
      }}>
        
        <ul>
          <li style={{display: 'flex', width: 'auto', alignItems: 'center'}}>
            <BsCheck style={{display: 'inline-block', width: !(size < 350) ? '50px' : '30px', fill: theme.colors.secondary.x500}}/>
            <p style={{width: 'auto', fontWeight: !(size < 1230) ? 'bold' : '500', color: '#fff', fontSize: !(size < 350) ? '1.2rem' : '0.6rem'}}>Sua empresa em evidência.</p>
          </li>
          <li style={{display: 'flex', alignItems: 'center'}}>
            <BsCheck style={{display: 'inline-block', width: !(size < 350) ? '50px' : '30px', fill: theme.colors.secondary.x500}}/>
            <p style={{width: 'auto', fontWeight: !(size < 1230) ? 'bold' : '500', color: '#fff', fontSize: !(size < 350) ? '1.2rem' : '0.6rem'}}>Receba solicitações de orçamento.</p>
          </li>
          <li style={{display: 'flex', alignItems: 'center'}}>
            <BsCheck style={{display: 'inline-block', width: !(size < 350) ? '50px' : '30px', fill: theme.colors.secondary.x500}}/>
            <p style={{width: 'auto', fontWeight: !(size < 1230) ? 'bold' : '500', color: '#fff', fontSize: !(size < 350) ? '1.2rem' : '0.6rem'}}>Plataforma intuitiva para gestão dos clientes.</p>
          </li>
          <li style={{display: 'flex', alignItems: 'center'}}>
            <BsCheck style={{display: 'inline-block', width: !(size < 350) ? '50px' : '30px', fill: theme.colors.secondary.x500}}/>
            <p style={{width: 'auto', fontWeight: !(size < 1230) ? 'bold' : '500', color: '#fff', fontSize: !(size < 350) ? '1.2rem' : '0.6rem'}}>Perfil exclusivo para sua empresa.</p>
          </li>
          <li style={{display: 'flex', alignItems: 'center'}}>
            <BsCheck style={{display: 'inline-block', width: !(size < 350) ? '50px' : '30px', fill: theme.colors.secondary.x500}}/>
            <p style={{width: 'auto', fontWeight: !(size < 1230) ? 'bold' : '500', color: '#fff', fontSize: !(size < 350) ? '1.2rem' : '0.6rem'}}>Cancele quando quiser, sem multa.</p>
          </li>
          <li>
          <Button
          type="submit"
          variant="contained"
          onClick={(e)=>router.push('/anuncie-seu-buffet')}
          disabled={isLoading}
          style={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '20px',
            marginLeft: '1rem',
            marginTop: '1rem'
          }}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? <Text color={theme.colors.neutral.x000}>Enviando...</Text> : <Text  color={theme.colors.neutral.x000}>Cadastre-se</Text>}
        </Button>
          </li>
        </ul>
  

        <Text tag={!(size < 610) ? 'h1' : 'h2'} variant={!(size < 610) ? 'heading1semiBold' : 'heading3semiBold'} styleSheet={{
          position: 'absolute',
          top: !(size < 320) ? '60px' : '30px',
          left: '50%',
          width: '100%',
          textAlign: 'center',
          color: theme.colors.neutral.x000,
          transform: 'translateX(-50%)',
        }}>
          EXPERIMENTE GRÁTIS POR 90 DIAS
        </Text>
        <Box
          styleSheet={{
            width: !isMobile ? '50%' : '100%',
            maxWidth: '500px',
            margin: !(size < 1110) ? '' : '20px auto 0',
            padding: !(size < 360) ? '2rem' : '2rem 0.5rem',
            borderRadius: '6px'
          }}
        >
          <Box tag="form" styleSheet={{display: 'flex', flexDirection: 'column', gap: '1rem'}} onSubmit={handleSubmit}>
            <Box styleSheet={{textAlign: 'center', display: 'flex', flexDirection: 'row', alignSelf: 'center', padding: '0 2rem', gap: '.5rem'}}>
              <Text variant={!(size < 360) ? "heading4Bold" : 'heading6Bold'} color={theme.colors.neutral.x000}>ACESSO EMPRESAS</Text>
            </Box>

            <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignContent: 'center', justifyContent: 'center', padding: '0 2rem'}}>
              <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x050, padding: '.6rem'}}>
              <Image src={IconUser.src} alt="" styleSheet={{width: '28px'}}/>
              </Box>
              <Input 
                type="email" 
                required={true}
                placeholder="Insira seu e-mail"
                onChange={(e)=>setEmail(e)}
                styleSheet={{
                  width: '100%',
                  borderRadius: '1px',
                  backgroundColor: theme.colors.neutral.x050,
                  padding: '.8rem 0rem',
                  border: 'none'
                }}
              />
            </Box>
            <Box styleSheet={{display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'center', padding: '0 2rem'}}>
              <Box styleSheet={{borderRadius: '1px', backgroundColor: theme.colors.neutral.x050, padding: '.6rem'}}>
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
                  backgroundColor: theme.colors.neutral.x050,
                  padding: '.8rem 0rem',
                  border: 'none',
                  height: '48px'
                }}
              />
            </Box>
            <Button
          type="submit"
          variant="contained"
          
          disabled={isLoading}
          style={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '0',
            width: '96%',
            margin: '0 auto'
          }}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? <Text color={theme.colors.neutral.x000}>Enviando...</Text> : <Text  color={theme.colors.neutral.x000}>Login</Text>}
            </Button>
    
              <Box  onClick={openRecoveryPassword} styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                <Text styleSheet={{textAlign: 'left', color: theme.colors.neutral.x000, cursor: 'pointer', marginLeft: '.5rem'}} variant="body1">Esqueci minha senha</Text>
              </Box>

              <Text color={theme.colors.negative.x700} styleSheet={{height: '20px', marginLeft: '8px'}}>{error && error}</Text>
              <Text color={theme.colors.positive.x700} styleSheet={{height: '20px',marginLeft: '8px', marginTop: '-1rem'}}>{success && success}</Text>
            </Box>
          </Box>
        </Box>

      <Box styleSheet={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5rem',
        padding: '5rem 10px',
        height: '350px'
      }}>
        <Box styleSheet={{width: '20%', minWidth: '180px', maxWidth: '350px'}}>
          <Image src={IconLoginBuffet1.src} alt="Icon" styleSheet={{width: '40%', margin: '0 auto', objectFit: 'contain'}}/>
          <Text styleSheet={{textAlign: 'center'}}>
            Receba solicitações de orçamento dos clientes interessados em realizar um evento.
          </Text>
        </Box>
        <Box styleSheet={{width: '20%', minWidth: '180px', maxWidth: '350px'}}>
          <Image src={IconLoginBuffet2.src} alt="Icon" styleSheet={{width: '40%', margin: '0 auto', objectFit: 'contain'}}/>
          <Text styleSheet={{textAlign: 'center'}}>
            Aumente a visibilidade da sua empresa na internet e seja visto por mais clientes.
          </Text>
        </Box>
        <Box styleSheet={{width: '20%', minWidth: '180px', maxWidth: '350px'}}>
          <Image src={IconLoginBuffet3.src} alt="Icon" styleSheet={{width: '40%', margin: '0 auto', objectFit: 'contain'}}/>
          <Text styleSheet={{textAlign: 'center'}}>
            Exponha sua empresa para o público alvo do seu negócio e obtenha melhores resultados.
          </Text>
        </Box>
        <Box styleSheet={{width: '20%', minWidth: '180px', maxWidth: '350px'}}>
          <Image src={IconLoginBuffet4.src} alt="Icon" styleSheet={{width: '40%', margin: '0 auto', objectFit: 'contain'}}/>
          <Text styleSheet={{textAlign: 'center'}}>
            Gerencie seus clientes e solicitações de orçamento através da nossa plataforma.
          </Text>
        </Box>
      </Box>

      <Box styleSheet={{
        display: 'flex',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '50px',
        marginBottom: '-65px',
        marginTop: '1rem',
        padding: (!(size < 1230) ? '75px' : !(size < 410) ? '10rem 30px' : '10rem 0px'),
        background: size <= 1000 ? 'linear-gradient(90deg, #2649AC 11.02%, #BE6BE1 73.28%)': `URL(${FundoLogin2.src})`,
        backgroundSize: '100% contain',
        backgroundPosition: 'center'

      }}>
        <Box>
          <Text tag={!(size < 610) ? 'h1' : 'h2'} variant={!(size < 610) ? 'heading1semiBold' : 'heading3semiBold'} styleSheet={{
            textAlign: 'center',
            color: theme.colors.neutral.x000
          }}>
            SOBRE A NOSSA PLATAFORMA
          </Text>
        </Box>
        <Box styleSheet={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 'max(10%, 40px)',
        }}>
          <Box styleSheet={{width: '20%', minWidth: '180px', maxWidth: '400px'}}>
            <Image src={IconLoginBuffet5.src} alt="Icon" styleSheet={{width: '60%', margin: '0 auto', objectFit: 'contain'}}/>
            <Text styleSheet={{textAlign: 'center', color: 'white'}}>
              Marketing digital com técnicas de SEO para expor sua empresa ao maior número de clientes.
            </Text>
          </Box>
          <Box styleSheet={{width: '20%', minWidth: '180px', maxWidth: '400px'}}>
            <Image src={IconLoginBuffet6.src} alt="Icon" styleSheet={{width: '60%', margin: '0 auto', objectFit: 'contain'}}/>
            <Text styleSheet={{textAlign: 'center', color: 'white'}}>
              Perfil exclusivo dedicado a sua empresa que pode ser utilizado como um mini-site.
            </Text>
          </Box>
          <Box styleSheet={{width: '20%', minWidth: '180px', maxWidth: '400px'}}>
            <Image src={IconLoginBuffet7.src} alt="Icon" styleSheet={{width: '60%', margin: '0 auto', objectFit: 'contain'}}/>
            <Text styleSheet={{textAlign: 'center', color: 'white'}}>
              Ferramenta para gestão dos clientes e dados estatísticos.
            </Text>
          </Box>
        </Box>
        <Box>
          <Text tag={!(size < 610) ? 'h2' : 'h3'} variant={!(size < 610) ? 'heading2semiBold' : 'heading4semiBold'} styleSheet={{
            textAlign: 'center',
            color: 'white'
          }}>
            EXPERIMENTE GRÁTIS POR 90 DIAS
          </Text>
          <Button
          type="submit"
          variant="contained"
          onClick={(e)=>router.push('/anuncie-seu-buffet')}
          disabled={isLoading}
          style={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '20px',
            width: '40%',
            margin: '.5rem auto'
          }}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? <Text color={theme.colors.neutral.x000}>Enviando...</Text> : <Text  color={theme.colors.neutral.x000}>Cadastre-se</Text>}
        </Button>
        </Box>
      </Box>

    </Box>
  )
}
