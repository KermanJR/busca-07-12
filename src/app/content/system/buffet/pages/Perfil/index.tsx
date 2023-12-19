
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import InputDash from "@src/app/components/system/InputDash";
import Text from "@src/app/theme/components/Text/Text";

import { use, useContext, useEffect, useState } from "react";
import { UserContext } from "@src/app/context/UserContext";
import BuffetService from "@src/app/api/BuffetService";
import SelectWithClickToAddAttractives from "@src/app/components/system/SelectAttractives";
import SelectWithClickToAddServices from "@src/app/components/system/SelectServices";
import Icon from "@src/app/theme/components/Icon/Icon";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SelectWithClickToAddCategory from "@src/app/components/system/SelectCategories";
import SelectHours from "@src/app/components/system/SelectHours";

const EditPerfil = () =>{

  //Hooks
  const theme = useTheme();

  //Datas
  const [capacityTotalBuffet, setCapacityTotalBuffet] = useState(null);
  const [areaTotal, setAreaTotal] = useState('');
  const [aboutBuffet, setAboutBuffet] = useState<string>('');
  const [phoneBuffet, setPhoneBuffet] = useState<string>('');
  const [urlYoutube, setUrlYoutube] = useState<string>('');
  const [urlInstagram, setUrlInstagram] = useState<string>('');
  const [urlFacebook, setUrlFacebook] = useState<string>('');
  const [urlSite, setUrlSite] = useState<string>('');

  const [attractionsBuffets, setAttractionsBuffets] = useState<[]>([]);
  const [securityBuffets, setSecurityBuffets] = useState<[]>([]);
  const [servicesBuffets, setServicesBuffets] = useState<[]>([]);
  const [categoriesBuffets, setCategoriesBuffets] = useState<[]>([]);

  const [categoriesBuffetsById, setCategoriesBuffetsById] = useState<[]>([]);
  const [hoursBuffetsById, setHoursBuffetsById] = useState('');

  const [youtube, setYoutube] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const [auxAttractiveBuffets, setAuxAttractivesBuffet] = useState([]);
  const [auxServicesBuffets, setAuxServicesBuffet] = useState([]);
  const [auxSecurityBuffets, setAuxSecurityBuffet] = useState([]);
  const [auxCategoriesBuffets, setAuxCategoriesBuffet] = useState([]);
  const [auxHoursBuffets, setAuxHoursBuffet] = useState('');
  const [auxHoursWeekBuffets, setAuxHoursWeekBuffet] = useState('');


  const [detailsBuffet, setDetailsBuffet] = useState([]);
  const [idDetailsBuffet, setIdDetailsBuffet] = useState([]);
  const [idBuffetLocal, setIdBuffetLocal] = useState('');
  const [hoursWeek, setHoursWeek] = useState<string>('');
  const [hoursWeekend, setHoursWeekend] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [addressBuffet, setAddressBuffet] = useState<[]>([])

  const [typeSignature, setTypeSignatue] = useState('')


  //
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


  const [selectedCategoria, setSelectedCategoria] = useState(null);


  //Estados que estão no banco de dados
  const [states, setStates] = useState([]);


  //Variável de controle: EDIÇÃO || CRIAÇÃO do buffet
  const [modeBuffet, setModeBuffet] = useState('create');


  //Variável de controle: EDIÇÃO || CRIAÇÃO dos detalhes do buffet
  const [modeDetails, setModeDetails] = useState('create');


  //Variável de controle: EDIÇÃO || CRIAÇÃO do endereço do buffet
  const [modeAddress, setModeAddress] = useState('create');
  

  const [hoveredEvent, setHoveredEvent] = useState(false);


  //Contexts
  const {
    dataUser,
    setIdBuffet,
    idBuffet,
    dataBuffet, setDataBuffet
  } = useContext(UserContext);

  const optionsHours = [
    {
      value: 1,
      label: "08:00 - 18:00"
    },
    {
      value: 2,
      label: "08:00 - 18:30"
    },
    {
      value: 3,
      label: "08:00 - 19:00"
    },
    {
      value: 4,
      label: "08:30 - 18:00"
    },
    {
      value: 5,
      label: "08:30 - 18:30"
    },
    {
      value: 6,
      label: "08:30 - 19:00"
    },
    {
      value: 7,
      label: "08:45 - 18:00"
    },
    {
      value: 8,
      label: "08:45 - 18:30"
    },
    
  ]

  

  /**************************************** */

  let selectedAttractivesBuffet = detailsBuffet
  .map((userAttraction) => {
    const matchingAttraction = attractionsBuffets.find(
      (attraction) => attraction?.['id'] === userAttraction?.['id_atracao']
    );
    return matchingAttraction
      ? {
          value: matchingAttraction?.['id'],
          label: matchingAttraction?.['nome']
        }
      : null;
  })
  .filter((attraction) => attraction !== null);

  /**************************************** */

  let selectedSecurityBuffet = detailsBuffet
  .map((userAttraction) => {
    const matchingAttraction = securityBuffets.find(
      (attraction) => attraction?.['id'] === userAttraction?.['id_seguranca']
    );
    return matchingAttraction
      ? {
          value: matchingAttraction?.['id'],
          label: matchingAttraction?.['nome']
        }
      : null;
  })
  .filter((attraction) => attraction !== null);


  /**************************************** */

  let selectedServicesBuffet: any = detailsBuffet
  .map((userService) => {
    const matchingService = servicesBuffets.find(
      (service) => service?.['id'] === userService?.['id_servico']
    );
    return matchingService
      ? {
          value: matchingService?.['id'],
          label: matchingService?.['nome']
        }
      : null; 
  })
  .filter((service) => service !== null); 

  /**************************************** */
  let selectedCategoriesBuffet: any = categoriesBuffetsById
  .map((userService) => {
    const matchingService = categoriesBuffets.find(
      (categoria) => categoria?.['id'] === userService?.['id_categoria']
    );
    return matchingService
      ? {
          value: matchingService?.['id'],
          label: matchingService?.['nome']
        }
      : null; 
  })
  .filter((categoria) => categoria !== null); 

  /**************************************** */






  //CRIAR DETALHES DO BUFFET SERVIÇOS && ATRATIVOS
  async function CreateDetailsBuffet(id){
    await BuffetService.deleteAttractionsServicesBuffets(idBuffet)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });

    let servicesArray = auxServicesBuffets.map((service) => ({
      id_buffet:  id,
      id_servico: service?.value,
      id_atracao: null,
    }))

    let securityArray = auxSecurityBuffets.map((security) => ({
      id_buffet:  id,
      id_seguranca: security?.value,
      id_atracao: null,
    }))

    let attractivesArray = auxAttractiveBuffets.map((attractive) => ({
      id_buffet: id,
      id_servico: null,
      id_atracao: attractive?.value,
    }));
    let combinedArray = [...servicesArray, ...attractivesArray, ...securityArray];
    await BuffetService.postAttractionsServicesBuffets({
      id_buffet: idBuffetLocal,
      items: combinedArray,
    })
      .then((response) => {
        response.map((item)=>(
          setIdDetailsBuffet(item?.id)
        ))
        setAuxAttractivesBuffet([])
        setAuxServicesBuffet([])
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //CRIAR DETALHES DO BUFFET SERVIÇOS && ATRATIVOS
  async function CreateCategoryBuffet(id){
    await BuffetService.deleteCategoriesBuffets(idBuffet)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });


    let categoriesArray = auxCategoriesBuffets.map((attractive) => (
      BuffetService.postCategoriaBuffet({
        id_buffet: id,
        id_categoria: attractive?.value,
      }).then((response) => {
       
        setAuxCategoriesBuffet([])
      })
      .catch((error) => {
        console.log(error);
      })
    ));

  }





  //CRIAR ENDEREÇO DO BUFFET
  async function CreateAddressBuffet(){
    BuffetService.createAddressBuffets(dataUser?.['entidade']?.id, {
      id_cidade: idCidade,
      cep: cep,
      bairro: bairro,
      complemento: complemento,
      rua: rua,
      numero: numero,
      contato: " ",
      telefone: "",
      email: "",
      tipo: "C"
    }).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  }

  
  async function EditAddressBuffet(){
    BuffetService.editAddressBuffets(idAddress, {
      id_cidade: idCidade,
      cep: cep,
      bairro: bairro,
      complemento: complemento,
      rua: rua,
      numero: numero,
      contato: " ",
      telefone: phoneBuffet,
      email: "",
      tipo: "C"
    }).then((response)=>{
      setRua(response?.rua)
      setBairro(response?.bairro)
      setCidade(response?.entidade?.enderecos[0].endereco.cidade.nome)
      setNumero(response?.numero)
      setCep(response?.cep)
      setIdCidade(response?.id_cidade)
      setAddressBuffet(response?.entidade?.enderecos);
      setIdAddress(response?.id);
    }).catch((error)=>{
      console.log(error)
    })
  }
  



  //CRIAR BUFFET
  function CreateBuffet(e: any){
    e.preventDefault();
    setIsLoading(true);
    BuffetService.createBuffets({
      id_entidade: dataUser['entidade']?.id,
      slug: formatToSlug(dataUser['entidade']?.nome),
      capacidade_total: capacityTotalBuffet,
      area_total: areaTotal,
      sobre: aboutBuffet,
      horario_atendimento: auxHoursWeekBuffets,
      horario_atendimento_fds: auxHoursBuffets,
      youtube: youtube,
      status: 'I',
      redes_sociais: [
        {
            "descricao": urlInstagram ? urlInstagram : 'none',
            "tipo": "instagram"
        },
        {
          "descricao": urlFacebook ? urlFacebook : 'none',
          "tipo": "facebook"
      },
      {
        "descricao": urlSite ? urlSite : 'none',
        "tipo": "site"
      }
      ]
    })
    .then(async (response)=>{
      if(response?.id){
        setIdBuffetLocal(response?.id)
        setIdBuffet(response?.id)
        setDataBuffet(response);
        await CreateDetailsBuffet(response?.id);
        await CreateAddressBuffet();
        await CreateCategoryBuffet(response?.id)
        setMessage('Dados salvos com sucesso.');
      }
    }).catch((error)=>{
      setMessage('Erro ao salvar dados, tente novamente.');
      console.log(error)
    })
    setIsLoading(false);
  }

  const formatToSlug = (input) => {
    return input
      .toLowerCase() // Converte para minúsculas
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/[^\w-]+/g, '') // Remove caracteres especiais
      .replace(/--+/g, '-') // Substitui múltiplos hífens por um único hífen
      .trim(); // Remove espaços em branco no início e no final
  };


  //CRIAR CATEGORIAS DO BUFFET

  //EDITAR BUFFET
  function EditBuffet(e: any){
    e.preventDefault();
    setIsLoading(true);
    BuffetService.editBuffets(idBuffet, {
      slug: formatToSlug(dataUser['entidade']?.nome),
      capacidade_total: capacityTotalBuffet,
      area_total: areaTotal,
      sobre: aboutBuffet,
      horario_atendimento: auxHoursWeekBuffets,
      horario_atendimento_fds: auxHoursBuffets,
      youtube: youtube,
      status: 'A',
      redes_sociais: [
        {
            "descricao": urlInstagram ? urlInstagram : 'none',
            "tipo": "instagram"
        },
        {
          "descricao": urlFacebook ? urlFacebook : 'none',
          "tipo": "facebook"
      },
      {
        "descricao": urlSite ? urlSite : 'none',
        "tipo": "site"
      }
      ]
    })
    .then(async (response)=>{
      if(response?.id){
        setDataBuffet(response)
        setAreaTotal(response?.area_total);
        setAboutBuffet(response?.sobre);
        setCapacityTotalBuffet(response?.capacidade_total);
        setSlug(response?.slug);
        setHoursWeek(response?.horario_atendimento);
        setHoursWeekend(response?.horario_atendimento_fds);
        setIdBuffet(response?.id)
        setAddressBuffet(response?.entidade?.enderecos);
        setMessage('Dados salvos com sucesso.')
        await CreateDetailsBuffet(response?.id)
        await CreateCategoryBuffet(response?.id)
        modeAddress === 'create' ? await CreateAddressBuffet() : await EditAddressBuffet();
      }
    }).catch((error)=>{
      setMessage('Erro ao salvar dados, tente novamente');
    
    })
    setIsLoading(false);
  }


  //RETORNA OS DADOS DO BUFFET PELO SEU ID
  function GetBuffetById(){
    BuffetService.showBuffetByIdEntity(dataUser['entidade']?.id)
    .then((response) => {
      if(response?.id){
     
        setModeBuffet('edit')
        setSlug(response?.slug)
        setAreaTotal(response?.area_total);
        setAboutBuffet(response?.sobre);
        setCapacityTotalBuffet(response?.capacidade_total);
        setSlug(response?.slug);
        setHoursWeek(response?.horario_atendimento);
        setHoursWeekend(response?.horario_atendimento_fds);
        setIdBuffetLocal(response?.id)
        setIdBuffet(response?.id)
        setRua(response?.entidade?.enderecos[0].endereco.rua)
        setBairro(response?.entidade?.enderecos[0].endereco.bairro)
        setCidade(response?.entidade?.enderecos[0].endereco.cidade.nome)
        setNumero(response?.entidade?.enderecos[0].endereco.numero)
        setCep(response?.entidade?.enderecos[0].endereco.cep)
        setEstado(response?.entidade?.enderecos[0].endereco?.cidade?.estado?.sigla)
        setComplemento(response?.entidade?.enderecos[0].endereco?.complemento)
        setIdCidade(response?.entidade?.enderecos[0].endereco.cidade.id)
        setPhoneBuffet(response?.entidade?.enderecos[0].telefone)
        setAddressBuffet(response?.entidade?.enderecos);
        setIdAddress(response?.entidade?.enderecos[0].endereco.id);
        setTypeSignatue(response?.entidade?.assinaturas[0]?.plano?.nome);
        setSelectedCategoria(response?.categorias[0]?.categoria?.id)
        setYoutube(response?.youtube)
        setUrlInstagram(response?.entidade?.redesSociais[0]?.tipo === 'instagram'? response?.entidade?.redesSociais[0]?.descricao: '');
        setUrlFacebook(response?.entidade?.redesSociais[1]?.descricao);
        setUrlSite(response?.entidade?.redesSociais[2]?.descricao);
        if(response?.entidade?.enderecos.length > 0){
          setModeAddress('edit')
        }
      }else{
        setModeBuffet('create')
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar dados do Buffet:', error);
    });
  }

  


  //RETORNA AS ATRAÇÕES FIXAS CADASTRADAS NO BANCO DE DADOS
  function showAttractionsBuffets(){
    BuffetService.showAttractionBuffets()
    .then((response) => {
      const sortedAttractionsBuffets = response.sort((a, b) => a.nome.localeCompare(b.nome));
      setAttractionsBuffets(sortedAttractionsBuffets);
    })
    .catch((error) => {
      console.error('Erro ao buscar atrações para os Buffets:', error);
    });
  }

  //RETORNA OS SERVIÇOS FIXOS CADASTRADOS NO BANCO DE DADOS
  function showServicesBuffets(){
    BuffetService.showServicesBuffets()
    .then((response) => {
      const sortedServicesBuffets = response.sort((a, b) => a.nome.localeCompare(b.nome));
      setServicesBuffets(sortedServicesBuffets);
    })
    .catch((error) => {
      console.error('Erro ao buscar serviços para os Buffets:', error);
    });
  }

  //RETORNA OS SERVIÇOS FIXOS CADASTRADOS NO BANCO DE DADOS
  function showSecurityBuffets(){
    BuffetService.showSecurityBuffets()
    .then((response) => {
      const sortedSecuritiesBuffets = response.sort((a, b) => a.nome.localeCompare(b.nome));
      setSecurityBuffets(sortedSecuritiesBuffets);

    
    })
    .catch((error) => {
      console.error('Erro ao buscar items de segurança para os Buffets:', error);
    });
  }

  //RETORNA AS CATEGORIAS FIXAAS NO BANCO DE DADOS
  function showCategoriasBuffet(){
    BuffetService.getCategoriasBuffet()
    .then((response) => {
      const sortedCategoriasBuffets = response.sort((a, b) => a.nome.localeCompare(b.nome));
      setCategoriesBuffets(sortedCategoriasBuffets);
    })
    .catch((error) => {
      console.error('Erro ao buscar items de segurança para os Buffets:', error);
    });
  }

  
  //RETORNA OS DETALHES CADASTRADOS PARA O BUFFET PELO SEU ID
  function showDetailsBuffetById() {
    BuffetService.showDetailsBuffetById(idBuffet)
      .then((response) => {
        setDetailsBuffet(response);
        if(response.length === 0){
          setModeDetails('create')
        }else if(response.length > 0){
          setModeDetails('edit')
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do Buffet:', error);
      });
  }

  function showCategoriesBuffetById() {
    BuffetService.getCategoriesBuffetsById(idBuffet)
      .then((response) => {
        let vetor: any = [];
        for (const elemento of response) {
          for (const valor of Object.values(elemento)) {
            vetor.push(valor);
          }
        }
        setCategoriesBuffetsById(vetor);
    
      })
      .catch((error) => {
        console.error('Erro ao buscar categorias do Buffet:', error);
      });
  }


 


  function showStateBd(){
    BuffetService.showStatesBd()
      .then((response)=>{
        setStates(response);
        states.map(async (state)=>{
          if(state['sigla'] === estado){
            setIdEstado(state?.id)
            showCitiesBd(state?.id)
          }
        })
      }).catch((error)=>{
        console.log(error)
      })
  }

  function showCitiesBd(idEstado: number){
    BuffetService.showCitiesByIdState(idEstado)
      .then((response)=>{
        response.map(async (city)=>{
          if(city['nome'] === cidade.toUpperCase()){
            setIdCidade(city?.id)
          }else{
           ''
          }
        })
      }).catch((error)=>{
        console.log(error)
      })
  }
  


  useEffect(() => {
    GetBuffetById();
    showAttractionsBuffets();
    showServicesBuffets();
    showSecurityBuffets();
    showStateBd();
    showCategoriasBuffet();

  }, []);

  useEffect(()=>{
    showDetailsBuffetById();
    showCategoriesBuffetById();
  }, [idBuffet != null])

  useEffect(() => {
    const clearMessages = () => {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    };

    if (message) {
      clearMessages();
    }
  }, [message]);

 

  useEffect(()=>{
    BuffetService.getAddressByCEP(cep)
    .then((response)=>{
      setRua(response?.logradouro);
      setBairro(response?.bairro);
      setCidade(response?.localidade);
      setEstado(response?.uf);
      setCep(response?.cep)
      showStateBd();
    }).catch(err=>{
      console.log(err)
    })
  }, [cep?.length === 8])

  

  const formatPhoneNumber = (input) => {
    // Remove todos os caracteres não numéricos
    const cleaned = input.replace(/\D/g, '');
  
    // Limita o número de caracteres a 13
    const truncated = cleaned.slice(0, 11);
  
    // Aplica a máscara para formatar o número de telefone
    if (truncated.length === 0) {
      setPhoneBuffet('');
    } else if (truncated.length <= 2) {
      setPhoneBuffet(`(${truncated}`);
    } else if (truncated.length <= 3) {
      setPhoneBuffet(`(${truncated.slice(0, 2)}) ${truncated.slice(2)}`);
    } else if (truncated.length <= 7) {
      setPhoneBuffet(`(${truncated.slice(0, 2)}) ${truncated.slice(2, 3)} ${truncated.slice(3)}`);
    } else {
      setPhoneBuffet(`(${truncated.slice(0, 2)}) ${truncated.slice(2, 3)} ${truncated.slice(3, 7)} ${truncated.slice(7)}`);
    }
  };





  return(
    <Box 
      tag="form"
      onSubmit={modeBuffet === 'create'? CreateBuffet:EditBuffet}
      styleSheet={{
      width: '100%',
      height: 'auto',
      backgroundColor: theme.colors.neutral.x000,
      borderRadius: '8px',
      padding: '2rem',
    }}>
      
     <Box styleSheet={{display: 'grid',gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem'}}>
      
      <Box>
        <Text>Nome</Text>
        <InputDash  placeholder="Digite o nome do Buffet" type="text" defaultValue={dataUser['entidade']?.nome} disabled={true} styleSheet={{backgroundColor: theme.colors.neutral.x200}}/>
      </Box>
       <Box>
        <Text>CNPJ</Text>
        <InputDash placeholder="CNPJ" type="text" defaultValue={dataUser['entidade']?.documento} disabled={true} styleSheet={{backgroundColor: theme.colors.neutral.x200}}/>
       </Box>
       <Box>
       <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px'}}>
            <Text>Slug</Text>
            <Icon
              name="default_icon" 
              size="sm" 
              fill={theme.colors.secondary.x600}  
              onMouseEnter={(e)=>setHoveredEvent(!hoveredEvent)}
              onMouseLeave={(e) => setHoveredEvent(!hoveredEvent)}
            />
              
          </Box>
        <InputDash 
          placeholder="Digite a slug do Buffet"
          type="text"
          value={formatToSlug(dataUser['entidade']?.nome)} 
          disabled={true} 
          required={true}
          styleSheet={{backgroundColor: theme.colors.neutral.x200}}
        />
       </Box>
     </Box>

     <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 3fr 1fr 2fr', gap: '2rem', padding: '2rem 0 0 0'}}>
        <Box>
          <Text>CEP</Text>
          <InputDash placeholder="Digite o CEP" type="text"  onChange={(e)=>setCep(e)} value={cep} />
        </Box>
        <Box>
        <Text>Rua</Text>
          <InputDash placeholder="Digite o nome da rua" type="text" value={rua} disabled={true} styleSheet={{paddingRight: '0'}}/>
        </Box>
        <Box>
          <Text>N°</Text>
          <InputDash placeholder="Digite o número" type="text" value={numero} onChange={(e)=>setNumero(e)} required={true} styleSheet={{paddingRight: '0'}}/>
        </Box>
        <Box>
          <Text>Complemento</Text>
          <InputDash placeholder="Digite um complemento" type="text" value={complemento} onChange={(e)=>setComplemento(e)} styleSheet={{paddingRight: '0'}}/>
        </Box>
     </Box>

     <Box styleSheet={{width: '40%',display: 'grid',gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem 0 2rem 0'}}>
        <Box>
          <Text>Cidade</Text>
          <InputDash placeholder="Cidade" type="text" value={cidade} disabled={true}/>
        </Box>
        <Box>
          <Text>Estado</Text>
          <InputDash placeholder="Estado" type="text" value={estado} disabled={true}/>
        </Box>
     </Box>

     <Text variant="heading4Bold" color={theme.colors.neutral.x999}>Informações Técnicas</Text>

     <Box styleSheet={{display: 'grid', gridTemplateColumns: '30% 30% 30%', gap: '2rem', padding: '1rem 0 1rem 0'}}>
        <Box>
          <Text>Categoria do Buffet</Text>

          <Box>
     
        <SelectWithClickToAddCategory 
          options={categoriesBuffets} 
          selectedCategoriesBuffet={selectedCategoriesBuffet}
          setAuxCategoryBuffets = {setAuxCategoriesBuffet}
        />
      </Box>
        
        </Box>
        <Box>
          <Text>Capacidade Total</Text>
          <InputDash placeholder="Digite a capacidade Total" type="number" value={capacityTotalBuffet} onChange={setCapacityTotalBuffet} required={true}/>
        </Box>
        <Box>
          <Text>Àrea Total m²</Text>
          <InputDash placeholder="Digite Área total" type="text" value={areaTotal} onChange={setAreaTotal} required={true}/>
        </Box>

        <Box>
          <Text>Horário Atendimento</Text>

          <SelectHours 
          options={optionsHours} 
          selectedHoursBuffet={hoursWeek}
          setAuxHoursBuffet={setAuxHoursWeekBuffet}
        />
        
        </Box>

        <Box>
          <Text>Horário Atendimento (Fim de semana)</Text>
          <SelectHours 
          options={optionsHours} 
          selectedHoursBuffet={hoursWeekend}
          setAuxHoursBuffet={setAuxHoursBuffet}
        />
        
        </Box>
        <Box>
          <Text>Telefone</Text>
          <InputDash placeholder="Digite seu telefone" type="text" value={phoneBuffet}  onChange={(e) => formatPhoneNumber(e)} required={true}/>
        </Box>
     </Box>

     <Box styleSheet={{display: 'grid', gridTemplateColumns: '20% 20% 20% 20%', gap: '2rem', padding: '1rem 0 1rem 0'}}>
        {typeSignature === 'Premium'? 
        <Box>
          <Text>URL Youtube</Text>
          <InputDash placeholder="Digite a URL do youtube" type="text"  value={youtube} onChange={(e)=>setYoutube(e)} />
        </Box>: ''
        }

        <Box>
          <Text>Instagram</Text>
          <InputDash placeholder="instagram.com/seuperfil" type="text" value={urlInstagram == 'none'? '': urlInstagram}  onChange={(e) => setUrlInstagram(e)} />
        </Box>

        <Box>
          <Text>Facebook</Text>
          <InputDash placeholder="facebook.com/seuperfil" type="text" value={urlFacebook  == 'none'? '': urlFacebook}  onChange={(e) => setUrlFacebook(e)} />
        </Box>
        <Box>
          <Text>URL Site</Text>
          <InputDash placeholder="www.seusite.com.br" type="text" value={urlSite  == 'none'? '': urlSite}  onChange={(e) => setUrlSite(e)} />
        </Box>
     </Box>

     <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', padding: '1rem 0 1rem 0'}}>
     <Box>
        <Text variant="heading4Bold" color={theme.colors.neutral.x999} styleSheet={{padding: '1rem 0'}}>Principais comodidades</Text>
        <SelectWithClickToAddAttractives 
          options={attractionsBuffets} 
          selectedAttractivesBuffet={selectedAttractivesBuffet}
          setAuxAttractivesBuffets = {setAuxAttractivesBuffet}
        />
      </Box>
      <Box>
        <Text variant="heading4Bold" color={theme.colors.neutral.x999} styleSheet={{padding: '1rem 0'}}>Serviços oferecidos</Text>
        <SelectWithClickToAddServices
          options={servicesBuffets}
          selectedServicesBuffet={selectedServicesBuffet}
          setAuxServicesBuffets = {setAuxServicesBuffet}
        />
      </Box>
      <Box>
        <Text variant="heading4Bold" color={theme.colors.neutral.x999} styleSheet={{padding: '1rem 0'}}>Segurança</Text>
        <SelectWithClickToAddServices
          options={securityBuffets}
          selectedServicesBuffet={selectedSecurityBuffet}
          setAuxServicesBuffets = {setAuxSecurityBuffet}
        />
      </Box>

     </Box>

      <Box>
        <Text variant="heading4Bold" color={theme.colors.neutral.x999} styleSheet={{padding: '1rem 0'}}>Sobre</Text>
        <InputDash 
          tag="textarea" 
          placeholder="Escreva brevemente a história do buffet" 
          styleSheet={{height: '15rem'}} 
          defaultValue={aboutBuffet} 
          onChange={setAboutBuffet} 
          required={true}
        />
      </Box>
      <Box styleSheet={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        justifyContent: 'left',
        alignItems: 'center'
      }}>
        <Button
          type="submit"
          variant="contained"
          
          disabled={isLoading}
          style={{
            backgroundColor: theme.colors.secondary.x500,
            borderRadius: '20px',
            marginTop: '1rem',
            textDecoration: 'capitalize'
          }}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? <Text color={theme.colors.neutral.x000}>Salvando...</Text> : <Text  color={theme.colors.neutral.x000}>Salvar</Text>}
        </Button>
        {
          message && <Text styleSheet={{
            color: message === 'Dados salvos com sucesso.'? theme.colors.positive.x700 : theme.colors.negative.x800, marginTop: '1rem'
          }}>{message === 'Dados salvos com sucesso.'? 'Dados salvos com sucesso.':  'Erro ao salvar dados, tente novamente.'}</Text>
        }
       
      </Box>
   
      
    </Box>
  )
}

export default EditPerfil;
