import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import { useContext, useEffect, useState } from "react";
import Text from "@src/app/theme/components/Text/Text";
import Icon from "@src/app/theme/components/Icon/Icon";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import BannerAnotherPages from '../../../../../../public/assets/images/banner_another_pages.webp';

import Input from "@src/app/theme/components/Input/Input";
import { ModalContext } from "@src/app/context/ModalContext";
import ModalRegister from "../HomeScreen/Components/Modals/RegisterModal";
import ModalLogin from "../HomeScreen/Components/Modals/LoginModal";
import { Button as BtnMaterial } from '@mui/material';
import useSize from "@src/app/theme/helpers/useSize";
import InputDash from "@src/app/components/system/InputDash";
import Select from "@src/app/theme/components/Select/Select";
import ModalBudget from "../HomeScreen/Components/Modals/BudgetModal";
import BuffetService from "@src/app/api/BuffetService";
import { UserContext } from "@src/app/context/UserContext";
import {BsCheckCircle} from 'react-icons/bs'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import Close from '../../../../../../public/assets/images/close.png'
import Correct from '../../../../../../public/assets/images/correct.png'
import Image from "@src/app/theme/components/Image/Image";
import Button from "@src/app/theme/components/Button/Button";
import CircularProgress from '@mui/material/CircularProgress';
import ModalRecoveryPassword from "../HomeScreen/Components/Modals/RecoveryPassword";
import WhatsAppButton from "../HomeScreen/Components/WhatsappButton";
import CategoryFilter from "./CategoryFilter";
export default function BudgetByRegion(){

  
  
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
    openBudgetModal
  } = useContext(ModalContext)


  const {
    dataBuffet,
    dataUser,
    setDataUser
  } = useContext(UserContext)

     //Dados de configurações
     const [loadingState, setLoadingState] = useState(false);
     const [loadingCities, setLoadingCity] = useState(false);
     const size = useSize();
     const isMobile = useResponsive()
     const theme = useTheme();

     const [error, setError] = useState('');

      const [isLoading, setIsLoading] = useState(false);
  

    

    //Dados de endereços
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [neighbourhood, setNeighbourhood] = useState([]);
    const [selectedStateId, setSelectedStateId] = useState(null);

    const [idUser, setIdUser] = useState('');

    const [nome, setNome] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [qtdPessoas, setQtdPessoas] = useState(null);
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState("");
    const [idEntidade, setIdEntidade] = useState(null);
    const [periodo, setPeriodo] = useState("");
    const [idCidade, setIdCidade] = useState(null);
    const [bairro, setBairro] = useState("");
    const [dataDoEvento, setDataDoEvento] = useState("");
  

    const [idCidadesBuffets, setIdCidadesBuffet] = useState([]);


  

    const options = [
      {
        value: 'Período',
        label: 'Período'
      },
      {
        value: 'Manhã',
        label: 'Manhã'
      },
      {
        value: 'Tarde',
        label: 'Tarde'
      },
      {
        value:'Noite',
        label: 'Noite'
      }
    ]

    
    const optionsTipo = [
      {
        value: '0',
        label: 'Tipo de festa'
      },
      {
        value: '1',
        label: 'Infantil'
      },
      {
        value: '2',
        label: 'Domicílio'
      },
      {
        value: '3',
        label: 'Casamento'
      },
      {
        value: '4',
        label: 'Confraternização'
      }
    ]

    const handleStateChange = async (selectedOption?) => {
      setSelectedStateId(selectedOption);
      setLoadingCity(true)
      try {
        const stateIdentifier = selectedOption; // Use o ID ou o nome do estado
        const response = await BuffetService.getCitiesByState(stateIdentifier);
        let dadosFormatados = response?.map((cidade, index)=>({
          value: cidade?.id,
          label: cidade.nome
        }))
        dadosFormatados.unshift({
          value: '0',
          label: 'Selecione a cidade',
          disabled: true,
          selected: true,
        });
        setCities(dadosFormatados);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      }
      setLoadingCity(false)
    };


      
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showNegationModal, setShowNegationModal] = useState(false);
    function ConfirmationModal() {
      return (
        <Box
          styleSheet={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Sobreposição escura
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999, // Garanta que esteja na parte superior
          }}
        >
          <Box styleSheet={{
            backgroundColor: 'white',
            borderRadius: '8px',
            height: '300px',
            width: '50%'
          }}>

       

<Button
          onClick={(e)=>setShowConfirmationModal(!showConfirmationModal)}
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
            marginTop: '1rem',
            marginRight: '1rem',
            boxShadow: '0.5px 1px 3px 1px #969BA0'
          }}
        >
          X
      </Button>
        
         <Text variant="heading5" color="green" styleSheet={{display:' flex', flexDirection: 'row', height: '60%',justifyContent: 'center', alignItems: 'center', marginTop: '-1rem'}}>
           {dataUser['entidade']?.nome}, orçamento enviado com sucesso!
         </Text>
         <Image src={Correct.src} alt="" styleSheet={{width: '70px', textAlign: 'center', alignSelf: 'center', marginTop: '-2rem'}}/>
         </Box>
          </Box>
        
      );
    }
    function NegationModal() {
      return (
        <Box
          styleSheet={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Sobreposição escura
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999, // Garanta que esteja na parte superior
          }}
        >
           <Box styleSheet={{
            backgroundColor: 'white',
            borderRadius: '8px',
            height: '300px',
            width: '50%'
          }}>

              

<Button
          onClick={(e)=>setShowNegationModal(!showNegationModal)}
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
            marginTop: '1rem',
            marginRight: '1rem',
            boxShadow: '0.5px 1px 3px 1px #969BA0'
          }}
        >
          X
      </Button>

        
           
            <Text variant="heading5" color="red" styleSheet={{display:' flex', flexDirection: 'row', height: '60%',justifyContent: 'center', alignItems: 'center',  marginTop: '-2rem'}}>
              Não há buffets cadastrados nessa região.
            </Text>
            <Image src={Close.src} alt="" styleSheet={{width: '70px', textAlign: 'center', alignSelf: 'center', marginTop: '-2rem'}}/>
          
          </Box>
        </Box>
      );
    }
    
    

    

    useEffect(() => {
      BuffetService.showStates()
        .then((response) => {
          setLoadingState(true)
          let dadosFormatados = response?.map((estado, index) => ({
            value: estado?.id,
            label: estado.nome
          }));
         
          let dadosOrdenados = dadosFormatados.sort((a, b) => a.label.localeCompare(b.label));
          dadosOrdenados.unshift({
            value: '0',
            label: 'Selecione o estado',
            selected: true,
            disabled: true
          });
          setStates(dadosOrdenados);
        
          setLoadingState(false)
        });

        handleStateChange();
    }, []);




    let idsCidadesIguais = [];
    const [cidadesIguais, setCidadesIguais] = useState([]);
    useEffect(() => {
      BuffetService.showBuffets()
        .then(res => {
         
          if(idCidade){
            res.map((item, index)=>{
              if(item?.entidade?.enderecos[0]?.endereco?.cidade?.id == idCidade){
                idsCidadesIguais.push(item.id_entidade)
              }
            })
          }

          idsCidadesIguais = idsCidadesIguais?.filter((valor, indice, self) => {
            return self.indexOf(valor) === indice;
          });

          if (!idsCidadesIguais.includes(dataUser['entidade']?.id)) {
            idsCidadesIguais.unshift(dataUser['entidade']?.id);
          }

       

          setCidadesIguais(idsCidadesIguais)

      
        });
    }, [idCidade]);
    


   

   function handleSubmit(e){
    setIsLoading(true)
      e.preventDefault()
      if(dataUser['usuario']?.id_perfil == 3){
        if(cidadesIguais.length > 1){
            cidadesIguais.map((item, index)=>{
            let data = {
              "nome": nome,
              "observacoes": observacoes,
              "qtd_pessoas": Number(qtdPessoas),
              "tipo": tipo,
              "status": String(cidadesIguais[0]),
              "id_entidade": item,
              "periodo": periodo,
              "id_cidade": Number(idCidade),
              "bairro": bairro,
              "data_do_evento": `${dataDoEvento} 00:00:00`
            }
            BuffetService.sendEvento(data)
            .then(async res=>{
              setShowConfirmationModal(true);
            }).catch(err=>{
              console.log(err)
            })
          })
        }else{
          setShowNegationModal(true)
        }
        
      }else{
        setError('Faça Login como cliente para enviar orçamentos.')
      }

        setIsLoading(false)

    }

    
    useEffect(()=>{
      let id = JSON.parse(localStorage.getItem('USER_ID'))
      if(id){
        BuffetService.getUserData(id)
        .then(res=>{
          setDataUser(res)
        })
        setIdUser(id)
      }
    }, [])

    useEffect(() => {
      const clearMessages = () => {
        setTimeout(() => {
          setError(null);
        }, 3000);
      };
  
      if (error) {
        clearMessages();
      }
    }, [error]);

    const categories1 = [
      {
        value: '8',
        label: 'Aniversário'
      },
      {
        value: '9',
        label: 'Bar e Bat Mitzvah'
      },
      {
        value: '3',
        label: 'Casamento'
      },
      {
        value: '5',
        label: 'Debutante'
      },
      {
        value: '2',
        label: 'Domicílio'
      },
      {
        value: '1',
        label: 'Festa infantil'
      },
      {
        value: '7',
        label: 'Formatura'
      },
    ]
  
    const categories2 = [
      {
        value: '10',
        label: 'Almoço/Jantar empresarial'
      },
      {
        value: '4',
        label: 'Confraternização'
      },
      {
        value: '11',
        label: 'Palestra'
      },
      {
        value: '12',
        label: 'Treinamento'
      },
      {
        value: '13',
        label: 'Workshop'
      },
  
    ]

    
  const {
    setSelectedCategory,
    selectedCategory,
    setSelectedCity,
    selectedCity
  } = useContext(UserContext);
  
    const [selectedCategories, setSelectedCategories] = useState<any>([]);
    const handleCategoryChange = (categoryValue) => {
      if (selectedCategories.includes(categoryValue)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== categoryValue));
      } else {
        setSelectedCategories([...selectedCategories, categoryValue]);
      }
    };
 

  
    return(
        <Box tag="main"
          styleSheet={{
          alignItems: 'center',
          margin: '0 auto'
        }}
        >
          {showConfirmationModal && <ConfirmationModal />}
          {showNegationModal && <NegationModal />}


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
              padding: `${isMobile ? '5rem': '6rem'}`,
              marginTop: '5rem'
          }}>
              <Text 
                tag="h1" 
                variant="heading1Bold" 
                styleSheet={{color: theme.colors.neutral.x000, fontSize: !(size < 600) ? '2.5rem' : '1.5rem'}}
              >
                  Faça seu orçamento
              </Text>
          </Box> 

            <Box styleSheet={{
              width: size <= 820? '95%':'45%',
              padding:  size <= 820? '2rem':'2rem 3rem',
              marginTop: '4rem',
              borderRadius: '8px',
              boxShadow: `2px 2px 10px 2px ${theme.colors.neutral.x050}`
            }}>
              <Text variant="heading4Bold" styleSheet={{textAlign: 'left'}} color={theme.colors.primary.x500}>
                Evento
              </Text>
              <Box tag="form" styleSheet={{marginTop: '.5rem'}}  onSubmit={handleSubmit}>
                <Box styleSheet={{
                  display: 'grid',
                  gridTemplateColumns:  size <= 820? '1fr':'65% 33%',
                  gap: '1rem',
                  paddingTop: '1rem'
                }}>
                  <InputDash  
                  required={true}
                  onChange={(e)=>setNome(e)}
                    type="text" placeholder="Nome do evento" styleSheet={{padding: '.5rem', borderRadius: '5px', backgroundColor: theme.colors.neutral.x050}}/>
                  <InputDash type="number" onChange={(e)=>setQtdPessoas(e)} placeholder="Quantidade de pessoas" styleSheet={{padding: '.5rem',  borderRadius: '5px', backgroundColor: theme.colors.neutral.x050}}/>
                </Box>
                <Box styleSheet={{
                  display: 'grid',
                  gridTemplateColumns:  size <= 820? '1fr':'49% 49%',
                  gap: '1rem',
                  paddingTop: '1rem'
                }}>
                  <label htmlFor="dateInput" style={{width: '100%'}}>
                    <input id="dateInput" name="dateInput" type="date" placeholder="Data do evento"  onChange={(e)=>setDataDoEvento(e.target.value)} style={{borderRadius: '5px', backgroundColor: theme.colors.neutral.x050, padding: '.5rem', color: 'black', height: '48px', width: '100%'}}/>
                  </label>
                  <Select 
                  
                    options={options}
                    onChange={(e)=>setPeriodo(e)}
                    styleSheet={{
                      borderRadius: '5px',
                      backgroundColor: theme.colors.neutral.x050,
                      color: 'black',
                      fontSize: '.875rem',
                      padding: '.8rem',
                      border: 'none'
                    }}
                  />
                </Box>
                <Box styleSheet={{
                  display: 'grid',
                  gridTemplateColumns:  size <= 820? '1fr':'49% 49%',
                  gap: '1rem',
                  paddingTop: '1rem'
                }}>
                  <CategoryFilter 
                    categories1={categories1}
                    categories2={categories2} 
                    onCategoryChange={handleCategoryChange} 
                    selectedCategories={selectedCategories}/>
                  
                  <Select
                    onChange={handleStateChange}
                    loading={loadingState}
                    value={states.find((state) => state.value === selectedStateId)}   
                    options={states} 
                    styleSheet={{
                        padding: '.5rem',
                        borderRadius: '5px',
                        fontSize: '.875rem',
                        border: 'none',
                        backgroundColor: theme.colors.neutral.x050
                      }}
                  />
                </Box>
                <Box styleSheet={{
                  display: 'grid',
                  gridTemplateColumns:  size <= 820? '1fr':'49% 49%',
                  gap: '1rem',
                  paddingTop: '1rem'
                }}>
                  <Select
                   loading={loadingCities}
                   onChange={(e)=>setIdCidade(e)}
                    options={cities} 
                    styleSheet={{
                      padding: '.5rem',
                      fontSize: '.875rem',
                      borderRadius: '5px',
                        backgroundColor: theme.colors.neutral.x050, border: 'none'
                      }}
                  />
                  
                  <InputDash onChange={(e)=>setBairro(e)} type="text"  placeholder="Bairro" styleSheet={{padding: '.5rem',  borderRadius: '5px', backgroundColor: theme.colors.neutral.x050}}/>
                </Box>
                
                <Box styleSheet={{paddingTop: '1rem'}}>
                  <InputDash 
                  onChange={(e)=>setObservacoes(e)}
                  required={true}
                    tag="textarea"  
                    placeholder="Observações: Descreva detalhadamente o que precisa para seu evento." 
                    styleSheet={{height: '133px',padding: '.5rem',  borderRadius: '5px', backgroundColor: theme.colors.neutral.x050, width: 'auto'}}/>
                </Box>

  
              <BtnMaterial
          type="submit"
          variant="contained"
    
          disabled={isLoading}
          style={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '20px',
            marginTop: '1rem',
            textAlign: 'center',
            margin: '1rem auto',
            width: '50%'
          }}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? <Text color={theme.colors.neutral.x000}>Enviando...</Text> : <Text  color={theme.colors.neutral.x000}>Enviar para todos os buffets da região</Text>}
        </BtnMaterial>
              
              {error ? <Text styleSheet={{color:' red', textAlign: 'center', marginTop: '1rem', fontSize: '.875rem'}}>{error}</Text>: ''}
              </Box>
              {
                idUser == null || idUser == undefined || idUser == '' ? 
                <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem', marginTop: '1rem', alignSelf: 'center'}}>
                <Text styleSheet={{textAlign: 'left', color: theme.colors.neutral.x999}} variant="body1">Ainda não tem uma conta?</Text>
                <Box onClick={openBudgetModal} styleSheet={{cursor: 'pointer'}}>
                  <Text styleSheet={{color: theme.colors.secondary.x500}}>Cadastre-se</Text>
                </Box>
              </Box>:''
                
              }
              
            </Box>
          <Box>
        </Box>

      </Box>
    )

}
