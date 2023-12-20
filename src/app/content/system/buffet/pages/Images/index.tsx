
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import Text from "@src/app/theme/components/Text/Text";
import Image from "@src/app/theme/components/Image/Image";
import Icon from "@src/app/theme/components/Icon/Icon";
import BuffetService from "@src/app/api/BuffetService";
import {useContext, useEffect, useState } from "react";

import { UserContext } from "@src/app/context/UserContext";
import MockImage1 from 'public/assets/images/mock_image.jpg';
import MockImage2 from 'public/assets/images/mock_image_2.jpg'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import PagBankService from "@src/app/api/PagBankService";


const ImagesBuffet = () =>{

  const [selectedImageOne, setSelectedImageOne] = useState(null);
  const [selectedImageTwo, setSelectedImageTwo] = useState(null);
  const [selectedImageThree, setSelectedImageThree] = useState([]);

  const [idImageOne, setIdImageOne] = useState(null);
  const [idImageTwo, setIdImageTwo] = useState(null);
  const [idImageThree, setIdImageThree] = useState([]);


  const [hoveredEvent, setHoveredEvent] = useState(false);
  
  const [hoveredEvent2, setHoveredEvent2] = useState(false);
  const [loading, setLoading] = useState(false);

  const [imagesBuffetDatabase, setImagesBuffetDatabase] = useState([]);



  const [modeFirstImage, setModeFirstImage] = useState('create');
  const [modeSecondImage, setModeSecondImage] = useState('create');
  const [modeGalleryImage, setModeGalleryImage] = useState('create');

  const [messageFirstImage, setMessageFirstImage] = useState('');
  const [messageSecondImage, setMessageSecondImage] = useState('');
  const [messageThreeImage, setMessageThreeImage] = useState('');

  const [modeGallery, setModeGallery] = useState('create');

  const [capacityTotalBuffet, setCapacityTotalBuffet] = useState(null);
  const [areaTotal, setAreaTotal] = useState('');
  const [aboutBuffet, setAboutBuffet] = useState<string>('');
  const [phoneBuffet, setPhoneBuffet] = useState<string>('');
  const [urlYoutube, setUrlYoutube] = useState<string>('');
  const [attractionsBuffets, setAttractionsBuffets] = useState<[]>([]);
  const [servicesBuffets, setServicesBuffets] = useState<[]>([]);
  const [youtube, setYoutube] = useState('')


  const [auxAttractiveBuffets, setAuxAttractivesBuffet] = useState([]);
  const [auxServicesBuffets, setAuxServicesBuffet] = useState([]);


  const [detailsBuffet, setDetailsBuffet] = useState([]);
  const [idDetailsBuffet, setIdDetailsBuffet] = useState([]);
  const [idBuffetLocal, setIdBuffetLocal] = useState('');
  const [hoursWeek, setHoursWeek] = useState<string>('');
  const [hoursWeekend, setHoursWeekend] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [addressBuffet, setAddressBuffet] = useState<[]>([])

  const [typeSignature, setTypeSignature] = useState('')

  
  const [messageQtdImages, setMessageQtdImages] = useState('')


  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [message, setMessage] = useState('');

  //Data Address BUFFET
  const [cep, setCep] = useState<string>('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState<string>('');
  const [numero, setNumero] = useState<string>('');
  const [complemento, setComplemento] = useState<string>('');
  const [cidade, setCidade] = useState<string>(null);
  const [idCidade, setIdCidade] = useState<number>(null);
  const [idAddress, setIdAddress] = useState<number>(null);
  const [estado, setEstado] = useState<string>(null);
  const [idEstado, setIdEstado] = useState<number>(null);



  let idImagesGallery = []

  const theme = useTheme();

  const {
    idBuffet,
    dataBuffet,
    dataUser,
    setDataBuffet
  } = useContext(UserContext)

  //Selecionar Imagens
  const handleImageSelectOne = (event) => {
    const file = event.target.files[0];
    setSelectedImageOne(file);
  };

  const handleImageSelectTwo = (event) => {
    const file = event.target.files[0];
    setSelectedImageTwo(file);
  };

  const handleImageSelectThree = (event) => {
    const files = event.target.files;
    let newImages = [...selectedImageThree];
    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);
    }
    setSelectedImageThree(newImages);
    
  };

  const removeAllImages = ()=>{  setSelectedImageThree([])
    selectedImageThree.map((item, index)=>{
      BuffetService.deleteFiles(item?.id_arquivo)
      .then(res=>{
        setSelectedImageThree([])
      }).catch(err=>{
        console.log(err)
      })
    })
  }


  //Remover Imagens
  const removeImage = (index) => {
    const newImages = [...selectedImageThree];
  
    // Encontre o índice da imagem no array
    const imageIndex = newImages.findIndex((image) => image.id_arquivo === index.id_arquivo);
  
    if (imageIndex !== -1) {
      // Remove a imagem do array
      newImages.splice(imageIndex, 1);
  
      // Atualize o estado com as novas imagens
      setSelectedImageThree(newImages);
    }
  
    // Agora, você pode continuar com a exclusão do arquivo
    BuffetService.deleteFiles(index.id_arquivo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  
    if (newImages.length === 0) {
      // Se não houver mais imagens, defina o estado inicial
      setSelectedImageThree([]);
      setModeGalleryImage('create');
    }
  };
  
  


//Postar Imagens
async function PostFirstImageBuffetOne() {
  setIsLoading1(true)
  if(selectedImageOne){
    BuffetService.postFileBuffetImageOne({
      selectedImageOne,
      tipo: "capa"
    })
    .then(async (response) => {
      try {
        const imageUrl = await loadImagePreview(selectedImageOne);
        await setIdImageOne(response?.id)
        createGalleryBuffet(response?.id);
        setModeFirstImage('edit')
        setMessageFirstImage('Imagem cadastrada com sucesso.')
        setMessageSecondImage('')
        setMessageThreeImage('')
        EditBuffet()
      } catch (error) {
        setMessageFirstImage('Erro no cadastro da imagem.')
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar dados do usuário:', error);
    });
  }else if(selectedImageOne == null){
    setMessageFirstImage('Por favor, selecione uma imagem.')
  }

  setTimeout(()=>{
    setIsLoading1(false)
  }, 1000)

}

async function PostFirstImageBuffetTwo() {
  setIsLoading2(true)
  if(selectedImageTwo){
    BuffetService.postFileBuffetImageTwo({
      selectedImageTwo,
      tipo: "card"
    })
    .then(async (response) => {
      try {
        const imageUrl = await loadImagePreview(selectedImageTwo);
        await setIdImageTwo(response?.id);
        createGalleryBuffet(response?.id);
        setModeSecondImage('edit')
        setMessageSecondImage('Imagem cadastrada com sucesso.')
        setMessageFirstImage('')
        setMessageThreeImage('')
        EditBuffet()
      } catch (error) {
        setMessageSecondImage('Erro no cadastro da imagem.')
        console.error('Erro ao carregar e exibir a imagem:', error);
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar dados do usuário:', error);
    });
  }else if(selectedImageTwo == null){
    setMessageSecondImage('Por favor, selecione uma imagem.')
  }
   setTimeout(()=>{
    setIsLoading2(false)
  }, 1000)
  
}

async function PostFirstImageBuffetThree() {
  setIsLoading3(true)
  if(selectedImageThree?.length > 0){
    if(typeSignature == 'PLANO STANDARD' && selectedImageThree?.length > 10){
      setMessageThreeImage('Por favor, remova alguma imagem.')
    }
    if(typeSignature == 'PLANO PREMIUM' && selectedImageThree?.length > 16){
      setMessageThreeImage('Por favor, remova alguma imagem.')
    }else if(typeSignature == 'PLANO BASICO' && selectedImageThree?.length > 8){
      setMessageThreeImage('Por favor, remova alguma imagem.')
    }else{
      selectedImageThree.forEach((imageFile) => {
        BuffetService.postFileBuffetImageThree({
          imageFile,
          tipo: "galeria"
        })
          .then(async (response) => {
            const imageUrl = await loadImagePreview(imageFile);
            setModeGalleryImage('edit')
            setIdImageThree([...idImageThree, await response?.id])
            createGalleryBuffet(await response?.id)
            setMessageThreeImage('Imagens cadastradas com sucesso.')
            setMessageFirstImage('')
            setMessageSecondImage('')
            
          })
          .catch((error) => {
            setMessageThreeImage('Erro no cadastro das imagens.')
          });
      });
    }
    
  }else if(selectedImageThree?.length == 0){
    setMessageThreeImage('Por favor, selecione uma imagem.')
  }
  
  setTimeout(()=>{
    setIsLoading3(false)
  }, 1000);
  
}

//Editar Imagens
async function EditFirstImageBuffetOne() {
  setIsLoading1(true)
  if(selectedImageOne){
  BuffetService.editFileBuffet(selectedImageOne, idImageOne)
    .then(async (response) => {
      try {
        const imageUrl = await loadImagePreview(selectedImageOne);
        setMessageFirstImage('Imagem editada com sucesso.')
        setMessageSecondImage('')
        setMessageThreeImage('')
        await setIdImageOne(response?.id)
       
      } catch (error) {
        setMessageFirstImage('Falha ao editar imagem.')
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar dados do usuário:', error);
    });
  }else if(selectedImageOne == null){
      setMessageFirstImage('Por favor, selecione uma imagem.')
    }
     setTimeout(()=>{
    setIsLoading1(false)
  }, 1000)
  
}

async function EditFirstImageBuffetTwo() {
  setIsLoading2(true)
  if(selectedImageTwo){
  BuffetService.editFileBuffet(selectedImageTwo, idImageTwo)
    .then(async (response) => {
      try {
        const imageUrl = await loadImagePreview(selectedImageTwo);
        await setIdImageTwo(response?.id)
        setMessageSecondImage('Imagem editada com sucesso.')
        setMessageFirstImage('')
        setMessageThreeImage('')
      } catch (error) {
        setMessageFirstImage('Falha ao editar imagem.')
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar dados do usuário:', error);
    });
  }else if(selectedImageTwo == null){
      setMessageSecondImage('Por favor, selecione uma imagem.')
    }
     setTimeout(()=>{
    setIsLoading2(false)
  }, 1000)
  
}

console.log(selectedImageThree)

async function EditFirstImageBuffetThree() {
  setIsLoading3(true)
  if(selectedImageThree?.length > 0){
    if(typeSignature == 'PLANO STANDARD' && selectedImageThree?.length > 10){
      setMessageThreeImage('Por favor, remova alguma imagem.')
    }
    if(typeSignature == 'PLANO PREMIUM' && selectedImageThree?.length > 16){
      setMessageThreeImage('Por favor, remova alguma imagem.')
    }else if(typeSignature == 'PLANO BASICO' && selectedImageThree?.length > 8){
      setMessageThreeImage('Por favor, remova alguma imagem.')
    }else{
      selectedImageThree.forEach((imageFile) => {
        console.log(imageFile)
        BuffetService.postFileBuffetImageThree({
          imageFile: imageFile,
          tipo: "galeria"
        })
          .then(async (response) => {
            idImagesGallery.push(await response?.id)
            createGalleryBuffet(response?.id)
            setMessageThreeImage('Imagens editadas com sucesso.')
            setMessageFirstImage('')
            setMessageSecondImage('')
          })
          .catch((error) => {
            setMessageFirstImage('Falha ao editar imagens.')
            console.error('Erro ao editar imagens da galeria:', error);
          });
      });
    }
    
  }else if(selectedImageThree?.length == 0){
    setMessageThreeImage('Por favor, selecione uma imagem.')
  }
   setTimeout(()=>{
    setIsLoading3(false)
  }, 1000)
  
  
}



//Pré renderizar imagens
function loadImagePreview(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(imageFile);
  });
}



function createGalleryBuffet(id_image){
  setTimeout(()=>{
      BuffetService.postGalleryBuffet(idBuffet, id_image)
      .then((response)=>{
        console.log('response')
      })
      .catch((error)=>{
        console.log(error)
      })
  }, 4000)
}



  useEffect(()=>{
    BuffetService.getImagesGallery(idBuffet)
    .then((response)=>{
      console.log(response)
      setImagesBuffetDatabase(response);
      if(response[0]){
        setIdImageOne(response[0]?.arquivo?.id)
        setSelectedImageOne(response[0]?.arquivo?.path);
        setModeFirstImage('edit')
      }
      if(response[1]){
        setSelectedImageTwo(response[1]?.arquivo?.path);
        setModeSecondImage('edit')
        setIdImageTwo(response[1]?.arquivo?.id)
      }

      if(response[2]){
        setSelectedImageThree(response?.slice(2).map((item, index)=>{
          return item
        }))
        setIdImageThree(response?.slice(2).map((item, index)=>{
          return item.id
        }))
        setModeGalleryImage('edit')
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])

   //RETORNA OS DADOS DO BUFFET PELO SEU ID
   function GetBuffetById(){
    BuffetService.showBuffetByIdEntity(dataBuffet?.['id'],)
    .then((response) => {
        setSlug(response?.slug)
        setAreaTotal(response?.area_total);
        setAboutBuffet(response?.sobre);
        setCapacityTotalBuffet(response?.capacidade_total);
       
        setHoursWeek(response?.horario_atendimento);
        setHoursWeekend(response?.horario_atendimento_fds);
        setYoutube(response?.youtube)
  
    })
    .catch((error) => {
      console.error('Erro ao buscar dados do Buffet:', error);
    });
  }





  function EditBuffet(){
    BuffetService.editBuffets(dataBuffet?.['id'], {
      slug: dataBuffet?.['slug'],
      capacidade_total: dataBuffet?.['capacidade_total'],
      area_total: dataBuffet?.['area_total'],
      sobre: dataBuffet?.['sobre'],
      horario_atendimento: dataBuffet?.['horario_atendimento'],
      horario_atendimento_fds: dataBuffet?.['horario_atendimento_fds'],
      youtube: dataBuffet?.['youtube'],
      status: "A",
      redes_sociais: [
        {
            "descricao": "https://www.youtube.com/",
            "tipo": dataBuffet?.['youtube']? dataBuffet?.['youtube']: 'Nenhum'
        }
      ]
    })
    .then(async (response)=>{
      console.log(response)
      setDataBuffet(dataBuffet)
    }).catch((error)=>{
      setMessage('Erro ao salvar dados, tente novamente');
      console.log(error)
    })
  }

  
 
  useEffect(() => {
    const clearMessages = () => {
      setTimeout(() => {
        setMessageFirstImage(null);
        setMessageSecondImage(null)
        setMessageThreeImage(null)
      }, 3000);
    };

    if (messageFirstImage || messageSecondImage || messageThreeImage || messageQtdImages) {
      clearMessages();
    }
  }, [messageFirstImage, messageSecondImage, messageThreeImage, messageQtdImages]);



  function getSignature(id){
    PagBankService.getSignaturesPagBankById(id)
    .then(res=>{
      setTypeSignature(res?.plan?.name)
    }).catch(err=>{
      console.log(err)
    })
  }




  
  useEffect(() => {
    BuffetService.showSignaturesById(dataUser['entidade'].id)
    .then(res=>{
      let id = JSON.parse(res[0]?.tipo)
      getSignature(id?.id)
    }).catch(err=>{
      console.log(err)
    })
  }, []);

  useEffect(()=>{
    GetBuffetById();

  }, [])

  

  const EventActionPopup = () => (
    <Box styleSheet={{ 
      display: 'flex',
      flexDirection: 'row',
      gap: '8px' ,
      borderRadius: '4px',
      padding: '8px',
      backgroundColor: theme.colors.neutral.x000,
      boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x050}`,
      zIndex: 1,
      }}>
        <Text variant="small">
         Capa do perfil: 1920 x 850
        </Text>
     
    </Box>
  );

  const EventActionPopup2 = () => (
    <Box styleSheet={{ 
      display: 'flex',
      flexDirection: 'row',
      gap: '8px' ,
      borderRadius: '4px',
      padding: '8px',
      position: 'static',
      right: 0,
      top: '0',
      backgroundColor: theme.colors.neutral.x000,
      boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x050}`,
      }}>
        <Text variant="small">
         Capa do card: 1920 x 490
        </Text>
     
    </Box>
  );




  return(
    <Box  styleSheet={{
      width: '100%',
      height: 'auto',
      backgroundColor: theme.colors.neutral.x000,
      borderRadius: '8px',
      padding: '2rem',
    }}>
      {idBuffet == null || idBuffet == undefined ? (
        <Box
          styleSheet={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fundo branco transparente
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2
          }}
        >
          <Text styleSheet={{ fontSize: '18px', color: theme.colors.secondary.x500 }}>
            Por favor, preencha os dados do Buffet para inserir as imagens.
          </Text>
        </Box>
      ) : null}
     <Box styleSheet={{display: 'grid',gridTemplateColumns: '1fr 1fr', gap: '4rem'}}>
        <Box>
          <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px', position: 'relative'}}>
            <Text variant="small" color={theme.colors.neutral.x500}>Recomendação</Text>
            <Icon 
              name="default_icon" 
              size="sm" 
              fill={theme.colors.secondary.x600}  
              onMouseEnter={(e)=>setHoveredEvent(!hoveredEvent)}
              onMouseLeave={(e) => setHoveredEvent(!hoveredEvent)}
            />
              {hoveredEvent  && (
                <EventActionPopup/>
              )}
          </Box>

          <label 
            htmlFor="capaPerfil" 
            style={{
              cursor: 'pointer', 
              backgroundColor: theme.colors.neutral.x050,
              padding: '.875rem',
              borderRadius: '8px',
              marginTop: '1rem'
            }}>
              <Text color={theme.colors.neutral.x800} styleSheet={{fontWeight: '400'}}>Selecione a imagem de capa do perfil</Text>
              <input id="capaPerfil" name="capaPerfil" placeholder="Nome do buffet" type="file" required={true} onChange={(e)=>handleImageSelectOne(e)} style={{
                display: 'none'
              }}/>
          </label>
        </Box>
        <Box>
        <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px'}}>
            <Text variant="small" color={theme.colors.neutral.x500}>Recomendação</Text>
            <Icon 
              name="default_icon" 
              size="sm" 
              fill={theme.colors.secondary.x600}  
              onMouseEnter={(e)=>setHoveredEvent2(!hoveredEvent2)}
              onMouseLeave={(e) => setHoveredEvent2(!hoveredEvent2)}
            />
              {hoveredEvent2  && (
                <EventActionPopup2/>
              )}
          </Box>
          <label 
            htmlFor="capaCard" 
            style={{
              cursor: 'pointer', 
              backgroundColor: theme.colors.neutral.x050,
              padding: '.875rem',
              borderRadius: '8px',
              marginTop: '1rem'
            }}>
              <Text color={theme.colors.neutral.x800} styleSheet={{fontWeight: '400'}}>Selecione a imagem de capa do card</Text>
              <input id="capaCard" name="capaCard" placeholder="Nome do buffet" type="file" required={true} onChange={(e)=>handleImageSelectTwo(e)}  style={{
                display: 'none'
              }}/>
          </label>
          
        </Box>
        
     </Box>

     <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4.235rem', padding: '1rem 0', justifyContent: 'space-between'}}>
        <Box>
          {selectedImageOne ? (
              <Box>
                <Image
                  src={typeof selectedImageOne === "string" ?
                      selectedImageOne?.startsWith('/')? 
                      `https://buscabuffet.com.br${selectedImageOne}` : '': URL.createObjectURL(selectedImageOne)
                  }
                  alt="Pré-visualização da imagem"
                  styleSheet={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px'}}
                />
              </Box>
            ):
            (
              <Box>
              <img
                src={MockImage1.src}
                alt="Pré-visualização da imagem"
                style={{ maxWidth: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px'}}
              />
            </Box>
            
            )
          }
          <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Button
          type="submit"
          variant="contained"
           onClick={modeFirstImage == 'create'? PostFirstImageBuffetOne : EditFirstImageBuffetOne}
          disabled={isLoading1}
          style={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '20px',
            marginTop: '1rem',
            zIndex: 1
          }}
          startIcon={isLoading1 ? <CircularProgress size={20} color="inherit" /> : null}
        >
          
          {isLoading1 ? <Text color={theme.colors.neutral.x000}>Salvando...</Text> : <Text  color={theme.colors.neutral.x000}>Salvar</Text>}
      
        </Button>
            {messageFirstImage == 'Imagem cadastrada com sucesso.' && 
              <Text styleSheet={{color: 'green', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Imagem cadastrada com sucesso.</Text>
            }

            {messageFirstImage == 'Imagem editada com sucesso.' && 
              <Text styleSheet={{color: 'green', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Imagem editada com sucesso.</Text>
            }


              {messageFirstImage == 'Erro no cadastro da imagem.' && 
              <Text styleSheet={{color: 'red', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Erro no cadastro da imagem.</Text>
            }

            {messageFirstImage == 'Por favor, selecione uma imagem.' && 
              <Text styleSheet={{color: 'red', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Por favor, selecione uma imagem.</Text>
            }
          </Box>
            
        </Box>
        
        <Box>
          {selectedImageTwo ?(
            <Box>
              <Image
                src={typeof selectedImageTwo === "string" ?
                  selectedImageTwo?.startsWith('/')? 
                  `https://buscabuffet.com.br${selectedImageTwo}` : '': URL.createObjectURL(selectedImageTwo)
                }
                alt="Pré-visualização da imagem"
                styleSheet={{ maxWidth: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px'}}
              />
            </Box>
          ):
          (
            <Box>
            <img
              src={MockImage1.src}
              alt="Pré-visualização da imagem"
              style={{ maxWidth: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px'}}
            />
          </Box>
          )}
          
        <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Button
          type="submit"
          variant="contained"
            onClick={modeSecondImage == 'create'? PostFirstImageBuffetTwo : EditFirstImageBuffetTwo}
          disabled={isLoading2}
          style={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '20px',
            marginTop: '1rem'
          }}
          startIcon={isLoading2 ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading2 ? <Text color={theme.colors.neutral.x000}>Salvando...</Text> : <Text  color={theme.colors.neutral.x000}>Salvar</Text>}
        </Button>
            {messageSecondImage == 'Imagem cadastrada com sucesso.' && 
              <Text styleSheet={{color: 'green', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Imagem cadastrada com sucesso.</Text>
            }

            {messageSecondImage == 'Imagem editada com sucesso.' && 
              <Text styleSheet={{color: 'green', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Imagem editada com sucesso.</Text>
            }


              {messageSecondImage == 'Erro no cadastro da imagem.' && 
              <Text styleSheet={{color: 'red', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Erro no cadastro da imagem.</Text>
            }

            {messageSecondImage == 'Por favor, selecione uma imagem.' && 
              <Text styleSheet={{color: 'red', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Por favor, selecione uma imagem.</Text>
            }

          {messageSecondImage == 'Por favor, primeiro selecione a foto de capa do perfil.' && 
              <Text styleSheet={{color: 'red', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Por favor, primeiro selecione a foto de capa do perfil.</Text>
            }
          
          
        </Box>
        </Box>

     </Box>

     <Box styleSheet={{marginTop: '3rem'}}>
        <label 
            htmlFor="galeriaBuffet" 
            style={{
              cursor: 'pointer', 
              backgroundColor: theme.colors.neutral.x050,
              padding: '.875rem',
              borderRadius: '8px',
              marginTop: '1rem',
              width: '50%'
            }}>
              <Text color={theme.colors.neutral.x800} styleSheet={{fontWeight: '400'}}>Selecione as imagens da galeria</Text>
              <input id="galeriaBuffet" name="galeriaBuffet" placeholder="Nome do buffet" type="file" onChange={(e)=>handleImageSelectThree(e)}  style={{
                display: 'none'
              }}/>
          </label>
      
     </Box>

     <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', marginTop: '1rem', height: 'auto', gap: '1rem'}}>
        {selectedImageThree.length > 0 ? selectedImageThree.map((image, index) => (
          <Box key={index} className="thumbnail">
            <Box className="overlay">
              <button className="remove-button" onClick={() => removeImage(image)}>
                X
              </button>
            </Box>
            <Image src={modeGalleryImage === 'edit'? image?.arquivo?.nome ? `https://buscabuffet.com.br/api/uploads/${image?.arquivo?.nome} `: URL.createObjectURL(image): URL.createObjectURL(image)} alt={`Miniatura ${index + 1}`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover', borderRadius: '8px'}}/>
          </Box>
        )) 
        :
        <Box styleSheet={{display: 'flex', flexDirection: 'column', marginTop: '1rem', height: 'auto', gap: '1.5rem'}}>
          <Box styleSheet={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}}/>
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}}/>
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}}/>
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}}/>
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}}/>
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}} />
          </Box>

          <Box  styleSheet={{display: 'flex', flexDirection: 'row',gap: '1rem'}}>
          <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}} />
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}} />
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}} />
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}} />
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}} />
            <Image src={MockImage2.src} alt={`Miniatura`} styleSheet={{height: '168px', width: '261px', objectFit: 'cover'}} />
          </Box>
        </Box>
      }
     </Box>
     <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
     <Button
          type="submit"
          variant="contained"
            onClick={modeGalleryImage === 'create'? PostFirstImageBuffetThree:EditFirstImageBuffetThree}
          disabled={isLoading3}
          style={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '20px',
            marginTop: '1rem'
          }}
          startIcon={isLoading3 ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading3 ? <Text color={theme.colors.neutral.x000}>Salvando...</Text> : <Text  color={theme.colors.neutral.x000}>Salvar</Text>}
        </Button>
     

        <Button
          type="submit"
          variant="contained"
               onClick={(e)=>removeAllImages()}
          style={{
            backgroundColor: theme.colors.primary.x500,
            borderRadius: '20px',
            marginTop: '1rem'
          }}
        >
   <Text  color={theme.colors.neutral.x000}>Remover imagens</Text>
        </Button>

    
    <Box styleSheet={{alignSelf: 'center', marginTop: '0rem'}}>
    {messageThreeImage == 'Imagens cadastradas com sucesso.' && 
              <Text styleSheet={{color: 'green', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Imagens cadastradas com sucesso.</Text>
            }

            {messageThreeImage == 'Imagem editada com sucesso.' && 
              <Text styleSheet={{color: 'green', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Imagem editada com sucesso.</Text>
            }


              {messageThreeImage == 'Erro no cadastro das imagens.' && 
              <Text styleSheet={{color: 'red', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Erro no cadastro das imagens.</Text>
            }

            {messageThreeImage == 'Por favor, selecione uma imagem.' && 
              <Text styleSheet={{color: 'red', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>Por favor, selecione uma imagem.</Text>
            }

            {messageThreeImage == 'Por favor, primeiro selecione a foto de capa e perfil do buffet.' && 
              <Text styleSheet={{color: 'red', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>
              Por favor, primeiro selecione a foto de capa e perfil do buffet.</Text>
            }

            {messageThreeImage == 'Por favor, remova alguma imagem.' && 
              <Text styleSheet={{color: 'red', fontSize: '.8rem', alignSelf:' center', padding: '1rem', height: '10px'}}>
              Você excedeu o limite de imagens permitidas do seu plano.</Text>
            }

    </Box>
      
          
      </Box>
    
      {typeSignature == 'PLANO BASICO' && <Text styleSheet={{padding: '1rem 0', fontWeight: '500'}} color={theme.colors.neutral.x700}>Obs: Seu plano permite 8 imagens na galeria.</Text>}
      {typeSignature == 'PLANO STANDARD' && <Text styleSheet={{padding: '1rem 0', fontWeight: '500'}} color={theme.colors.neutral.x700}>Obs: Seu plano permite 10 imagens na galeria.</Text>}
      {typeSignature == 'PLANO PREMIUM' && <Text styleSheet={{padding: '1rem 0', fontWeight: '500'}} color={theme.colors.neutral.x700}>Obs: Seu plano permite 16 imagens na galeria.</Text>}

    </Box>
  )
}

export default ImagesBuffet;
