import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import Banner from "./Components/Banner/Banner";
import { useContext, useEffect, useState } from "react";
import Text from "@src/app/theme/components/Text/Text";
import Icon from "@src/app/theme/components/Icon/Icon";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import { Gallery} from "@src/app/components/site/Patterns/Gallery/Gallery";
import { ModalContext } from "@src/app/context/ModalContext";
import ModalLogin from "../HomeScreen/Components/Modals/LoginModal";
import useSize from "@src/app/theme/helpers/useSize";
import ModalBudget from "../HomeScreen/Components/Modals/BudgetModal";
import { UserContext } from "@src/app/context/UserContext";
import BuffetService from "@src/app/api/BuffetService";
import IconUserTemplate from '../../../../../../public/assets/icons/icons_template/users.jpg';
import IconMapTemplate from '../../../../../../public/assets/icons/icons_template/map_pin.jpg';
import IconAtendimentoTemplate from '../../../../../../public/assets/icons/icons_template/atendimento.jpg';
import IconPhoneTemplate from '../../../../../../public/assets/icons/icons_template/phone.jpg';
import IconZoomTemplate from '../../../../../../public/assets/icons/icons_template/zoom.jpg';
import Iconfacebook from '../../../../../../public/assets/icons/logo-facebook.png';
import IconInstagram from '../../../../../../public/assets/icons/logo-instagram.png';
import IconSocialTemplate from '../../../../../../public/assets/icons/icons_template/social.jpg';
import IconSiteTemplate from '../../../../../../public/assets/icons/icons_template/site.jpg';
import IconCheckTemplate from '../../../../../../public/assets/icons/icons_template/check.jpg';
import Image from "@src/app/theme/components/Image/Image";
import MapModal from "../SearchPage/Components/ModalMaps";
import GeolocalizationMapsService from "@src/app/api/GeolocalizationMapsService";
import { Relacionados } from "./Components/Relacionados";
import WhatsAppButton from "../HomeScreen/Components/WhatsappButton";

export default function SinglePageBuffet(){
  const {
    idBuffet,
    dataBuffet,
    buffetsRelacionados
  } = useContext(UserContext)
  
    const [attractions, setAttractions] = useState([])
    const [services, setServices] = useState([])
    const [securities, setSecurities] = useState([])
    const [details, setDetails] = useState([]);
    const [cep, setCep] = useState();
    const [coordinates, setCoordinates] = useState([]);
    

    const isMobile = useResponsive()
    const size = useSize()
    const theme = useTheme();

   
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [buffets, setBuffets] = useState([])

  
  

    const closeMapModal = () => {
      setIsMapModalOpen(false);
    };
  
  
    const {
      isModalOpen,
      closeModal,
      isNovoModalOpen,
      closeNovoModal,
      closeBudgetModal,
      isModalOpenBudget
    } = useContext(ModalContext)

    function formatarTelefone(telefone) {
      // Remove todos os caracteres não numéricos
      const numeroLimpo = telefone?.replace(/\D/g, '');
  
      // Verifica se o número é válido
      if (numeroLimpo?.length !== 11) {
          // Se não for um número de telefone válido, retorna uma mensagem de erro
          return 'Número de telefone inválido';
      }
  
      // Formata o número conforme o padrão (XX) XXXXX-XXXX
      const numeroFormatado = `(${numeroLimpo?.substring(0, 2)}) ${numeroLimpo?.substring(2, 7)}-${numeroLimpo?.substring(7)}`;
  
      return numeroFormatado;
  }

  function formatarNumero(numero) {
    return numero?.toLocaleString('pt-BR');
  }

  function primeiraLetraMaiuscula(string: string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1).toLowerCase();
  }

 


    useEffect(() => {
      BuffetService.showBuffetById(idBuffet ? idBuffet : JSON.parse(localStorage.getItem('ID_BUFFET')))
        .then((response) => {
  
          setDetails(response)
          const attractionPromises = response?.detalhes
            .filter((item) => item.id_atracao !== null)
            .map((item) => BuffetService.getAttractionsBuffetsById(item?.id_atracao));
    
          const servicePromises = response?.detalhes
            .filter((item) => item.id_servico !== null)
            .map((item) => BuffetService.getServicesBuffetsById(item?.id_servico));

            const securityPromises = response?.detalhes
            .filter((item) => item.id_seguranca !== null)
            .map((item) => BuffetService.getSecuritiesBuffetsById(item?.id_seguranca));
    
          Promise.all(attractionPromises)
            .then((attractionResponses) => {
              const attractions = attractionResponses.map((response) => response?.nome);
              setAttractions(attractions);
            })
            .catch((attractionError) => {
              console.error('Erro ao buscar atrações:', attractionError);
            });

            Promise.all(securityPromises)
            .then((securityResponses) => {
              const securities = securityResponses.map((response) => response?.nome);
              setSecurities(securities);
            })
            .catch((attractionError) => {
              console.error('Erro ao buscar atrações:', attractionError);
            });
    
          Promise.all(servicePromises)
            .then((serviceResponses) => {
              const services = serviceResponses.map((response) => response?.nome);
              setServices(services);
            })
            .catch((serviceError) => {
              console.error('Erro ao buscar serviços:', serviceError);
            });
        })
        .catch((error) => {
          console.error('Erro ao buscar detalhes do buffet:', error);
        });
    }, []);



    useEffect(()=>{
      let accumulatedCoordinates = [];
      buffetsRelacionados?.map((item,index)=>{
        GeolocalizationMapsService.geocodeAddressByCep(item?.['entidade']?.['enderecos'][0]?.['endereco']?.['cep'])
        .then((response)=>{
          accumulatedCoordinates.push(response);
          setCoordinates(accumulatedCoordinates);
        })
      })
      
    }, [details])

 

    useEffect(()=>{
      BuffetService.showBuffets()
        .then(res=>{
          setBuffets(res)
        })
    }, [])
  
    
    
    const removeMask = (formattedValue) => {
      // Remove todos os caracteres não numéricos
      return formattedValue.replace(/\D/g, '');
    };


    



    return(
        <Box tag="section" styleSheet={{width: '100%'}}>
          {details ? <Banner data={details}/> : <></>}
          
          {/* Novo modal que será aberto */}
          {isNovoModalOpen &&(
            <ModalLogin isOpen={isNovoModalOpen} onClose={closeNovoModal} />
          )}

          {isModalOpenBudget &&(
            <ModalBudget isOpen={isModalOpenBudget} onClose={closeBudgetModal} />
          )}  


          <Box styleSheet={{
            display: 'grid',
            gridTemplateColumns: `${!isMobile ? '2fr 1fr' : '1fr'}`,
            gap: '4rem',

            margin: !isMobile ? '5rem 4rem' : '1rem auto',
            padding: '0 1rem',
          }}>
           
             <>
                <Box tag="div" >
                  <Text tag="h3" variant="heading3semiBold" 
                    styleSheet={{
                      padding: '1rem 0',
                      borderBottom: `1px solid ${theme.colors.neutral.x100}`
                    }}>
                    Sobre o Buffet
                  </Text>

                  {/*Descrição do Buffet*/}
                  <Text tag="p" variant="body1"
                    styleSheet={{
                    padding: '3rem 0',
                  }}>
                    {details?.['sobre']}
                  </Text>

                  {/*Principais atrações*/}
                  <Box tag="div">
                    <Text tag="h3" variant="heading3semiBold" 
                      styleSheet={{
                        padding: '1rem 0',
                        borderBottom: `1px solid ${theme.colors.neutral.x100}`
                      }}>
                        Principais Comodidades
                    </Text>
                    <Box tag="div"                  
                      styleSheet={{                 
                        display: 'grid',                  
                        gridTemplateColumns: !(size < 450) ? 'repeat(4, 1fr)' : (!(size < 350) ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'),                  
                        gap: '1rem',                  
                        marginTop: '3rem'                 
                      }}                  
                    >                 
                      {attractions?.map((nome, index)=>{
                          return(
                              <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', padding: '1rem 0'}}>
                               <Image src={IconCheckTemplate.src} alt=""/>
                                <Text styleSheet={{wordWrap: 'break-word'}} variant="btnRegular">{nome}</Text>
                              </Box>
                          )
                      })
                      }                 
                    </Box>                
                  </Box>

                  {/*Serviços*/}
                  <Box tag="div">
                    <Text tag="h3" variant="heading3semiBold" 
                      styleSheet={{
                        padding: '1rem 0',
                        borderBottom: `1px solid ${theme.colors.neutral.x100}`,
                        marginTop: '3rem'
                      }}>
                        Serviços oferecidos
                    </Text>
                    <Box tag="div" 
                      styleSheet={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginTop: '3rem'
                      }}
                    >
                      {services?.map((nome, index)=>{
                          return(
                              <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', padding: '1rem 0'}}>
                                <Image src={IconCheckTemplate.src} alt=""/>
                                <Text styleSheet={{wordWrap: 'break-word'}} variant="btnRegular">{nome}</Text>
                              </Box>
                          )
                      })
                      }
                    </Box>
                  </Box>

                  {/*Segurança*/}
                  <Box tag="div">
                    <Text tag="h3" variant="heading3semiBold" 
                      styleSheet={{
                        padding: '1rem 0',
                        borderBottom: `1px solid ${theme.colors.neutral.x100}`,
                        marginTop: '3rem'
                      }}>
                        Segurança
                    </Text>
                    <Box tag="div" 
                      styleSheet={{
                        display: 'grid',
                        gridTemplateColumns: !(size < 450) ? 'repeat(4, 1fr)' : (!(size < 350) ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'),    
                        gap: '1rem',
                        marginTop: '3rem'
                      }}
                    >
                      {securities?.map((nome, index)=>{
                          return(
                              <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', padding: '1rem 0'}}>
                                <Image src={IconCheckTemplate.src} alt=""/>
                                <Text styleSheet={{wordWrap: 'break-word'}} variant="btnRegular">{nome}</Text>
                              </Box>
                          )
                      })
                      }
                    </Box>
                  </Box>

                  {/*Informações Técnicas*/}
                  <Box tag="div" >
                    <Text tag="h3" variant="heading3semiBold" 
                      styleSheet={{
                        padding: '1rem 0',
                        borderBottom: `1px solid ${theme.colors.neutral.x100}`,
                        marginTop: '3rem',
                     
                      }}>
                        Informações Técnicas
                    </Text>
                    <Box tag="div" 
                        styleSheet={{
                          display: 'grid',
                          gridTemplateColumns: !(size < 500) ? 'repeat(3, 1fr)' : '1fr',
                          gap: '2rem',
                          marginTop: '3rem',
                          flexWrap: 'wrap',
                          
                      }}
                    >
                      <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'left', alignItems: 'center'}}>
                        <Box>
                          <Image alt="Ícone de zoom" src={IconZoomTemplate.src} styleSheet={{
                            width: !(size < 500) ? 'auto' : '25px',
                            heigth: !(size < 500) ? 'auto' : '25px',
                          }}/>
                        </Box>
                        <Box>
                          <Text variant={!(size < 500) ? 'heading5Bold' : 'heading6Bold'} >Área Total</Text>
                          <Text styleSheet={{color: theme.colors.neutral.x999}} variant="btnRegular">{details?.['area_total']} m²</Text>
                        </Box>
                      </Box>

                      <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem', marginLeft: !(size < 500) ? '-4rem' : '0', justifyContent: 'left', alignItems: 'center'}}>
                        <Box>
                          <Image alt="Ícone de zoom" src={IconMapTemplate.src} styleSheet={{
                            width: !(size < 500) ? 'auto' : '25px',
                            heigth: !(size < 500) ? 'auto' : '25px',
                          }}/>
                        </Box>
                        <Box styleSheet={{width: '70%'}}>
                          <Text variant={!(size < 500) ? 'heading5Bold' : 'heading6Bold'}>Endereço</Text>
                          <Text styleSheet={{color: theme.colors.neutral.x999, width:'100%'}} variant="btnRegular">
                              Rua {details?.['entidade']?.enderecos[0]?.endereco?.rua}, 
                              N°  {details?.['entidade']?.enderecos[0]?.endereco?.numero}
                          </Text>
                          <Text styleSheet={{color: theme.colors.neutral.x999}} variant="btnRegular">
                              {primeiraLetraMaiuscula(details?.['entidade']?.enderecos[0]?.endereco?.cidade.nome) + ', ' + 
                                ( details?.['entidade']?.enderecos[0]?.endereco?.cidade.estado.sigla).toUpperCase()
                              } 
                          </Text>
                        </Box>
                      </Box>

                      
                      <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'left', alignItems: 'center'}}>
                        <Box>
                          <Image alt="Ícone de zoom" src={IconUserTemplate.src} styleSheet={{
                            width: !(size < 500) ? 'auto' : '25px',
                            heigth: !(size < 500) ? 'auto' : '25px',
                          }}/>
                        </Box>
                        <Box>
                          <Text variant={!(size < 500) ? 'heading5Bold' : 'heading6Bold'} >Capacidade Total</Text>
                          <Text styleSheet={{color: theme.colors.neutral.x999}} variant="btnRegular">{formatarNumero(details?.['capacidade_total'])} pessoas</Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  

                  <Box tag="div">
                    <Box tag="div" 
                        styleSheet={{
                          display: 'grid',
                          gridTemplateColumns: !(size < 500) ? 'repeat(3, 1fr)' : '1fr',
                          gap: '4rem',
                          marginTop: !(size < 500) ? '3rem' : '1rem',
                          justifyContent: 'space-between'
                      }}
                    >
                      <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'left', alignItems: 'center'}}>
                        <Box>
                          <Image alt="Ícone de zoom" src={IconPhoneTemplate.src} styleSheet={{
                            width: !(size < 500) ? 'auto' : '25px',
                            heigth: !(size < 500) ? 'auto' : '25px',
                          }}/>
                        </Box>
                        <Box>
                          <Text variant={!(size < 500) ? 'heading5Bold' : 'heading6Bold'} >Telefone</Text>
                          <Text styleSheet={{color: theme.colors.neutral.x999}} variant="btnRegular">{formatarTelefone(details?.['entidade']?.enderecos[0]?.telefone)}</Text>
                        </Box>
                      </Box>

                      <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem', marginLeft: !(size < 500) ? '-4rem' : '0', justifyContent: 'left', alignItems: 'center'}}>
                        <Box>
                          <Image alt="Ícone de zoom" src={IconAtendimentoTemplate.src} styleSheet={{
                            width: !(size < 500) ? 'auto' : '25px',
                            heigth: !(size < 500) ? 'auto' : '25px',
                          }}/>
                        </Box>
                        <Box styleSheet={{width: '90%'}}>
                          <Text variant={!(size < 500) ? 'heading5Bold' : 'heading6Bold'}>Atendimento</Text>
                          <Text styleSheet={{color: theme.colors.neutral.x999, width: !(size < 500) ? '100%' : '90%'}} variant="btnRegular">
                              De segunda às sextas, das {details?.['horario_atendimento']}. 
                          </Text>
                          <Text styleSheet={{color: theme.colors.neutral.x999}} variant="btnRegular"> 
                            Aos sábados, das {details?.['horario_atendimento_fds']}.
                          </Text>
                        </Box>
                      </Box>


                    </Box>
                  </Box>
                  <Box tag="div">
                    <Box tag="div" 
                        styleSheet={{
                          display: 'grid',
                          gridTemplateColumns: !(size < 500) ? 'repeat(3, 1fr)' : '1fr',
                          gap: '2rem',
                          marginTop: !(size < 500) ? '3rem' : '1rem',
                        
                      }}
                    >
                      <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'left', alignItems: 'center', marginLeft: '-2rem'}}>
                        <Box styleSheet={{width: '100px', height: '100px'}}>
                          <Image alt="Ícone de zoom" src={IconInstagram.src} styleSheet={{
                            width: !(size < 500) ? 'auto' : '25px',
                            heigth: !(size < 500) ? 'auto' : '25px',
                          }} />
                        </Box>
                        <Box>
                          <Text variant={!(size < 500) ? 'heading5Bold' : 'heading6Bold'} styleSheet={{ marginLeft: '-2rem'}}>Instagram</Text>
                          <Text variant="btnRegular" styleSheet={{color: theme.colors.neutral.x999,  marginLeft: '-2rem'}} >
                            <a href={`https://${details?.['entidade']?.redesSociais[0]?.descricao}`}>{details?.['entidade']?.redesSociais[0]?.descricao? details?.['entidade']?.redesSociais[0]?.descricao: ''}</a>
                            </Text>
                        </Box>
                      </Box>
                      <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'left', alignItems: 'center'}}>
                        <Box styleSheet={{width: '100px', height: '100px'}}>
                          <Image alt="Ícone de zoom" src={Iconfacebook.src} styleSheet={{
                            width: !(size < 500) ? 'auto' : '25px',
                            heigth: !(size < 500) ? 'auto' : '25px',
                          }} />
                        </Box>
                        <Box>
                          <Text variant={!(size < 500) ? 'heading5Bold' : 'heading6Bold'} styleSheet={{ marginLeft: '-2rem'}}>Facebook</Text>
                          <Text variant="btnRegular" styleSheet={{color: theme.colors.neutral.x999, marginLeft: '-2rem'}}>
                          <a href={`https://${details?.['entidade']?.redesSociais[0]?.descricao}`}>{details?.['entidade']?.redesSociais[1]?.descricao? details?.['entidade']?.redesSociais[1]?.descricao: ''}</a>
                          </Text>
                        </Box>
                      </Box>
                      <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'left', alignItems: 'center'}}>
                        <Box>
                          <Image alt="Ícone de zoom" src={IconSocialTemplate.src} styleSheet={{
                            width: !(size < 500) ? 'auto' : '25px',
                            heigth: !(size < 500) ? 'auto' : '25px',
                          }} />
                        </Box>
                        <Box>
                          <Text variant={!(size < 500) ? 'heading5Bold' : 'heading6Bold'}>Site</Text>
                          <Text variant="btnRegular" styleSheet={{color: theme.colors.neutral.x999}}>
                          <a href={`https://${details?.['entidade']?.redesSociais[2]?.descricao}`}>{details?.['entidade']?.redesSociais[1]?.descricao? details?.['entidade']?.redesSociais[2]?.descricao: ''}</a>
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  


                  {/*Galeria*/}
                  <Box tag="div">
                      <Text tag="h3" variant="heading3" 
                          styleSheet={{
                              padding: '1rem 0',
                              borderBottom: `1px solid ${theme.colors.neutral.x100}`,
                              marginTop: '3rem',
                              fontWeight: '600'
                          }}>
                          Galeria
                      </Text>
                      <Gallery dataBuffet={details} isMobile={isMobile}/>
                  </Box>

                  {/*CONHEÇA NOSSO ESPAÇO - PREMIUM*/}

                  {
                    details?.['entidade']?.assinaturas[0]?.id_plano == 3 ?
                    <Box tag="div" styleSheet={{marginTop: '2rem'}}>
                        <Text tag="h3" variant="heading3"
                        styleSheet={{
                            padding: '1rem 0',
                            borderBottom: `1px solid ${theme.colors.neutral.x100}`,
                            marginTop: '3rem'}}
                        >
                          Conheça nosso espaço
                        </Text>
                    
                      <Box tag="div" className="video" styleSheet={{height: '350px', marginTop: '1rem', borderRadius: '12px'}}>
                      <iframe width="640" height="360" src={details?.['youtube']}  allowFullScreen></iframe>

                      </Box>
                    </Box>: ''
                  }
                  
              </Box>


              {/*Buffets Relacionados*/}
              <Box tag="div" styleSheet={{height: 'auto', backgroundColor: '#F5F2F2', borderRadius:'8px', padding: '2rem'}}>
                <MapModal isOpen={isMapModalOpen} onRequestClose={closeMapModal} coordinates={coordinates}/>
                <Text styleSheet={{
                  padding: '2rem',
                  fontSize: '2rem',
                  textAlign: 'center',
                  marginTop: '2rem'
                }}>Destaques</Text>
                <Relacionados data={details}/>
              </Box>
            </>
          </Box>
          <WhatsAppButton number={details?.['entidade']?.enderecos[0]?.telefone? removeMask(details?.['entidade']?.enderecos[0]?.telefone): ''}/>
      </Box>
    )
}
