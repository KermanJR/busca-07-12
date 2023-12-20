// FilterSection.jsx

import React, { useContext, useEffect, useState } from 'react';
import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import Input from '@src/app/theme/components/Input/Input';
import { useTheme } from '@src/app/theme/ThemeProvider';
import { SelectState } from './SelecState';
import { showInfosState } from './showInfosState';
import CSS from "./index.module.css";
import useSize from '@src/app/theme/helpers/useSize';
import ModalMaps from '../ModalMaps';
import Button from '@src/app/theme/components/Button/Button';
import GeolocalizationMapsService from '@src/app/api/GeolocalizationMapsService';
import { UserContext } from '@src/app/context/UserContext';
import BuffetService from '@src/app/api/BuffetService';
import file from '@src/app/theme/components/Icon/svgs/file';


export function FilterSection() {
  const [coordinates, setCoordinates] = useState([]);
  const theme = useTheme();
  const size = useSize()

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [dataBuffetFixed, setDataBuffetFixed] = useState([]);

  const [filter, setFilter] = useState(null);
  const [filterState, setFilterState] = useState(null);
  const [cities, setCities] = useState([]);

  const {
    setDataBuffet,
    selectedCity,
    setSelectedCategory,
    selectedState,
    selectedCategory
  } = useContext(UserContext)

  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };

  



  useEffect(()=>{
    GeolocalizationMapsService.getUserPreciseLocation()
      .then(async (response)=>{
        setCoordinates([response]);
      })
  }, [])
  


  useEffect(() => {
    if(!selectedCategory){
      BuffetService.showBuffets()
      .then(res=>{
        const statusFiltro = 'A';
        const filteredBuffets = res.filter((buffet) => {
          const categoriaFiltro = buffet?.categorias.map((categoria) => categoria.categoria?.nome) || [];
          const cidadeBuffet = buffet?.entidade?.enderecos[0]?.endereco?.cidade?.nome;
          const estadoBuffet = buffet?.entidade?.enderecos[0]?.endereco?.cidade?.estado?.nome;
  
          //let categoriaPassaFiltro = !filter || categoriaFiltro === filter;
          let categoriaPassaFiltro = !filter || categoriaFiltro.some((categoriaBuffet) => filter.includes(categoriaBuffet));
          let cidadePassaFiltro = !selectedCity || cidadeBuffet === selectedCity;
          let estadoPassaFiltro = !selectedState || estadoBuffet === selectedState;
       
          return categoriaPassaFiltro && cidadePassaFiltro && estadoPassaFiltro;
      });

      const buffetsAtivos = filteredBuffets.filter(
        (buffet) =>
          buffet.status === statusFiltro &&
          (buffet?.entidade?.assinaturas[0]?.status === 'TRIAL' ||
            buffet?.entidade?.assinaturas[0]?.status === 'ACTIVE')
      );
  
      const premiumBuffets = buffetsAtivos.filter(
        (buffet) =>
            buffet?.entidade?.assinaturas[0]?.plano?.nome === "Premium"
    );
  
    const otherBuffets = buffetsAtivos.filter(
        (buffet) =>
            buffet?.entidade?.assinaturas[0]?.plano?.nome !== "Premium"
    );
  
    premiumBuffets.sort((a, b) => {
        return a.entidade.nome.localeCompare(b.entidade.nome);
    });
  
    const sortedBuffets: any = [...premiumBuffets, ...otherBuffets];
    console.log(sortedBuffets)

    setDataBuffet(sortedBuffets);
      })
    }
   

}, [filter, selectedCity ,selectedState]);
  









useEffect(() => {
  if (selectedCategory && !selectedCity) {
    BuffetService.showBuffets().then((res) => {
      console.log(res)
      const filteredBuffets = res.filter((buffet) => {
        const categoriaFiltro = buffet?.categorias.map((categoria) => categoria.categoria?.nome) || [];
        let categoriaPassaFiltro = selectedCategory?.length === 0 || categoriaFiltro.some((categoriaBuffet) => selectedCategory.includes(categoriaBuffet));


        return categoriaPassaFiltro;
      });


      const statusFiltro = 'A'; // Altere isso para o status desejado (por exemplo, 'A' para ativo)
      const buffetsAtivos = filteredBuffets.filter((buffet) => buffet.status === statusFiltro &&
        buffet?.entidade?.assinaturas[0]?.status === "ACTIVE")

      const premiumBuffets = buffetsAtivos.filter(
        (buffet) => buffet?.entidade?.assinaturas[0]?.plano?.nome === 'Premium'
      );

      const destacadoPremiunsBuffets = premiumBuffets.filter((buffet) => {
        return buffet?.entidade?.destacado === '1';
      });

      const otherBuffets = buffetsAtivos.filter(
        (buffet) => buffet?.entidade?.assinaturas[0]?.plano?.nome !== 'Premium'
      );

      premiumBuffets.sort((a, b) => {
        return a.entidade.nome.localeCompare(b.entidade.nome);
      });

      const sortedBuffets: any = [
        ...destacadoPremiunsBuffets,
        ...premiumBuffets,
        ...otherBuffets,
      ];

      sortedBuffets.sort((a, b) => {
        if (
          a?.entidade?.assinaturas[0]?.plano?.nome === 'Premium' &&
          b?.entidade?.assinaturas[0]?.plano?.nome !== 'Premium'
        ) {
          return -1;
        } else if (
          a?.entidade?.assinaturas[0]?.plano?.nome !== 'Premium' &&
          b?.entidade?.assinaturas[0]?.plano?.nome === 'Premium'
        ) {
          return 1;
        }

        if (a?.entidade?.destacado === '1' && b?.entidade?.destacado !== '1') {
          return -1;
        } else if (a?.entidade?.destacado !== '1' && b?.entidade?.destacado === '1') {
          return 1;
        }

        return a.entidade.nome.localeCompare(b.entidade.nome);
      });

      console.log(sortedBuffets)
      setDataBuffet(sortedBuffets);
      setSelectedCategory(null);
    });
  }
}, [selectedCategory]);


useEffect(() => {
  if (selectedCategory && selectedCity) {
    BuffetService.showBuffets().then((res) => {
      console.log(res)
      const filteredBuffets = res.filter((buffet) => {
        const categoriaFiltro = buffet?.categorias.map((categoria) => categoria.categoria?.nome) || [];
        const cidadeBuffet = buffet?.entidade?.enderecos[0]?.endereco?.cidade?.nome;

        let categoriaPassaFiltro = selectedCategory?.length === 0 || categoriaFiltro.some((categoriaBuffet) => selectedCategory.includes(categoriaBuffet));

        let cidadePassaFiltro = !selectedCity || cidadeBuffet === selectedCity;

        return categoriaPassaFiltro && cidadePassaFiltro;
      });

      const statusFiltro = 'A'; // Altere isso para o status desejado (por exemplo, 'A' para ativo)
      const buffetsAtivos = filteredBuffets.filter((buffet) => buffet.status === statusFiltro &&
        buffet?.entidade?.assinaturas[0]?.status === "ACTIVE")

      const premiumBuffets = buffetsAtivos.filter(
        (buffet) => buffet?.entidade?.assinaturas[0]?.plano?.nome === 'Premium'
      );

      const destacadoPremiunsBuffets = premiumBuffets?.filter((buffet) => {
        return buffet?.entidade?.destacado === '1';
      });

      const otherBuffets = buffetsAtivos.filter(
        (buffet) => buffet?.entidade?.assinaturas[0]?.plano?.nome !== 'Premium'
      );

      premiumBuffets.sort((a, b) => {
        return a.entidade.nome.localeCompare(b.entidade.nome);
      });

      const sortedBuffets: any = [...destacadoPremiunsBuffets, ...premiumBuffets, ...otherBuffets];

      console.log(sortedBuffets)
      setDataBuffet(sortedBuffets);
    });
  }
}, [selectedCategory, selectedCity]);



useEffect(() => {
  if (selectedCity && !selectedCategory) {
    BuffetService.showBuffets().then((res) => {
      console.log(res)
      const filteredBuffets = res.filter((buffet) => {
        const cidadeBuffet = buffet?.entidade?.enderecos[0]?.endereco?.cidade?.nome;
        let cidadePassaFiltro = !selectedCity || cidadeBuffet === selectedCity;
        return cidadePassaFiltro;
      });

      const statusFiltro = 'A'; // Altere isso para o status desejado (por exemplo, 'A' para ativo)
      const buffetsAtivos = filteredBuffets.filter((buffet) => buffet.status === statusFiltro &&
      buffet?.entidade?.assinaturas[0]?.status === "ACTIVE")

      const premiumBuffets = buffetsAtivos.filter(
        (buffet) => buffet?.entidade?.assinaturas[0]?.plano?.nome === 'Premium'
      );

      const destacadoPremiunsBuffets = premiumBuffets?.filter((buffet) => {
        return buffet?.entidade?.destacado === '1';
      });


      const otherBuffets = buffetsAtivos.filter(
        (buffet) => buffet?.entidade?.assinaturas[0]?.plano?.nome !== 'Premium'
      );

      premiumBuffets.sort((a, b) => {
        return a.entidade.nome.localeCompare(b.entidade.nome);
      });

      const sortedBuffets: any = [...destacadoPremiunsBuffets, ...premiumBuffets, ...otherBuffets];

      console.log(sortedBuffets)
      setDataBuffet(sortedBuffets);
    });
  }
}, [selectedCity]);




  let id;
  useEffect(()=>{
    if(filterState === 'São Paulo'){
      id = 26
    }else if(filterState == 'Rio de Janeiro'){
      id = 20
    }
    else if(filterState == 'Minas Gerais'){
      id = 14
    }
    else if(filterState == 'Mato Grosso do Sul'){
      id = 13
    }
    BuffetService.showCitiesByIdState(id)
    .then(res=>{
      setCities(res)
    })
  }, [filterState])


 



  const typesOfParty1 = ['Aniversário', 'Bar e Bat Mitzvah', 'Bodas', 'Casamento', 'Debutante', 
    'Domicílio', 'Festa Infantil', 'Formatura'
  ];

  const typesOfParty2 = ['Almoço/Jantar empresárial', 'Confraternização', 'Palestra', 'Treinamento', 'Workshop'
  ];
  const states = ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Mato Grosso do Sul'];

  const renderCheckBoxes = (items, filterName) => items.map((item, index) => (
    filterName === 'filterParty'? 
    <Box tag='aside' key={index} styleSheet={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', margin: '.5rem 0'}}
      onClick={(ev) => showInfosState(ev, filterName)}>
      <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%'}}>
        <Input 
          type="radio" 
          name={filterName}
          id={`inputRadio${filterName}${index}`}
          onChange={(e)=>setFilter(item)}
          className={
            filter == '' && filterName == 'filterParty' ? CSS.inputRadioNotChecked :CSS.inputRadio
          } 
          styleSheet={{
            display: "inline-block",
            accentColor: theme.colors.secondary.x500,
          }}/>
        <Text 
          tag='label' 
          htmlFor={`inputRadio${filterName}${index}`} 
          className={CSS.labelRadio} 
          color={theme.colors.neutral.x999}
          variant="body2" 
          styleSheet={{
            display: 'block',
            width: '100%',
            fontSize: !(size <= 650) ? '' : (!(size < 350) ? '0.7rem' : '0.5rem'),
            wordWrap: !(size <= 650) ? '' : 'break-word'
          }}>
            {item}
        </Text>
      </Box>
    </Box>:
    <Box tag='aside' key={index} styleSheet={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', margin: '.5rem 0'}}
    onClick={(ev) => showInfosState(ev, filterName)}>
    <Box styleSheet={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%'}}>
      <Input 
        type="radio" 
        name={filterName}
        id={`inputRadio${filterName}${index}`}
        onChange={(e)=>setFilterState(item)}
        className={
          filterState == null && filterName == 'filterState'? CSS.inputRadioNotChecked :CSS.inputRadio
        } 
        styleSheet={{
          display: "inline-block",
          accentColor: theme.colors.secondary.x500,
        }}/>
      <Text 
        tag='label' 
        htmlFor={`inputRadio${filterName}${index}`} 
        className={CSS.labelRadio} 
        color={theme.colors.neutral.x999}
        variant="body2" 
        styleSheet={{
          display: 'block',
          width: '100%',
          fontSize: !(size <= 650) ? '' : (!(size < 350) ? '0.7rem' : '0.5rem'),
          wordWrap: !(size <= 650) ? '' : 'break-word'
        }}>
          {item}
      </Text>
    </Box>
    <SelectState stateInfos={cities} filterName={filterName} filterState={filterState}/>
  </Box>
  ));

  return (
    <Box styleSheet={ !(size <= 650) ? {padding: '15px', marginBottom: '10px'} : {display: 'grid', gridTemplateAreas: '"map map" "filter1 filter2"', gap: '5px',position: 'sticky', overflow: !(size < 350) ? '' : 'hidden', padding: '5px', marginBottom: '10px',}}>
        <Box styleSheet={{
          width: '100%',
          height: !(size < 350) ? '200px' : '200px',
          backgroundColor: theme.colors.neutral.x050,
          borderRadius: '1.25rem',
          marginTop: '2rem',
          gridArea: !(size <= 650) ? '' : 'map',
         
        }}>
        
        <ModalMaps isOpen={isMapModalOpen} onRequestClose={closeMapModal} coordinates={coordinates}/>
        {
        size <= 650 && (
          <Button onClick={openMapModal} styleSheet={{
            alignSelf: 'center',
            marginTop: '-3.5rem',
            position: 'relative',
            zIndex: '1'
          }}>Abrir Mapa</Button>
        )
      }
      </Box>

      {
        size > 650 && (
          <Button onClick={openMapModal} styleSheet={{
            alignSelf: 'center',
            marginTop: '-4rem',
            zIndex: '1'
          }}>Abrir Mapa</Button>
        )
      }
      

      <Box styleSheet={{backgroundColor: theme.colors.neutral.x050, padding: !(size < 350) ? '1rem' : '5px', borderRadius: '6px', marginTop: '3rem', gridArea: !(size <= 650) ? '' : 'filter1', overflowY: 'hidden',overflowX: 'hidden', height: 'auto'}}>
        <Text variant='heading5semiBold' styleSheet={!(size <= 650) ? {} : {fontSize: (!(size < 350) ? '0.9rem' : '0.7rem')}}>Tipos de Festa</Text>
        <Text styleSheet={!(size <= 650) ? {} : {fontSize: (!(size < 350) ? '0.9rem' : '0.7rem')}}><Text styleSheet={{marginTop: '1rem'}}>Eventos Sociais</Text></Text>
          {renderCheckBoxes(typesOfParty1, 'filterParty')}
          <Text styleSheet={!(size <= 650) ? {} : {fontSize: (!(size < 350) ? '0.9rem' : '0.7rem')}}><Text styleSheet={{marginTop: '1rem'}}>Eventos Corporativos</Text></Text>
          {renderCheckBoxes(typesOfParty2, 'filterParty')}
      
      </Box>
      <Button onClick={(e)=>setFilter('')}  styleSheet={{width: '100%', alignSelf: 'center', borderRadius: '6px', marginTop: '.5rem'}} variant='outlined' textVariant='body1'>Limpar</Button>

      <Box styleSheet={{backgroundColor: theme.colors.neutral.x050, padding: !(size < 350) ? '1rem' : '5px', borderRadius: '6px', marginTop: '3rem', gridArea: !(size <= 650) ? '' : 'filter2'}}>
          <Text variant='heading5semiBold' styleSheet={!(size <= 650) ? {} : {fontSize: (!(size < 350) ? '0.9rem' : '0.7rem')}}>Por Estado</Text>
          {renderCheckBoxes(states, 'filterState')}
          
      </Box>
      <Button onClick={(e)=>setFilterState(null)} styleSheet={{width: '100%', alignSelf: 'center', position: 'relative', top: !(size < 400) ? '' : '2.2rem', borderRadius: '6px', marginTop: '.5rem'}} variant='outlined' textVariant='body1'>Limpar</Button>
    </Box>
  );
}
