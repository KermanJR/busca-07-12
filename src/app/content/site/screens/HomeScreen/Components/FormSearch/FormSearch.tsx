import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@src/app//theme/ThemeProvider";
import FormBox from "@src/app/theme/components/Form/Form";
import Button from "@src/app/theme/components/Button/Button";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import useSize from "@src/app/theme/helpers/useSize";
import { UserContext } from "@src/app/context/UserContext";
import { useRouter } from "next/dist/client/router";
import BuffetService from "@src/app/api/BuffetService";
import arrowDown from "../../../../../../../../public/assets/icons/arrow_down.jpg"
import CategoryFilter from "./CategoryFilter";


export default function FormSearch(){

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

  const [categoria, setCategoria] = useState('');
  const [cidade, setCidade] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [cities, setCities] = useState([]);

  const theme = useTheme();
  const isMobile = useResponsive();
  const size = useSize()
  const router = useRouter();

  const {
    setSelectedCategory,
    selectedCategory,
    setSelectedCity,
    selectedCity
  } = useContext(UserContext);


  function SelectFilters(){
    setSelectedCategory(selectedCategories);
    setSelectedCity(cidade)
    router.push('/busca')
  }
 

  const handleCategoryChange = (categoryValue) => {
    if(selectedCategories.includes(categoryValue)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryValue));
    }else {
      setSelectedCategories([...selectedCategories, categoryValue]);
    }
  };

  function capitalizarPrimeiraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

useEffect(() => {
  BuffetService.showBuffets()
    .then((res) => {
      let filteredBuffets = res.map((buffet) => buffet?.entidade?.enderecos[0]?.endereco?.cidade?.nome
        + ' - ' + buffet?.entidade?.enderecos[0]?.endereco?.cidade?.estado?.sigla
      );
      
      // Adiciona a opção "Todos os locais" no início do array
      filteredBuffets.unshift('Todos os locais');

      // Filtra e remove duplicatas
      filteredBuffets = filteredBuffets.filter((city, index, self) => {
        return self.indexOf(city) === index;
      });

      setCities(filteredBuffets);
    });
}, []);
  

  return (
    <FormBox styleSheet={{
      minWidth: !isMobile ? '' : 'auto',
      width: !isMobile ? !(size < 1100) ? '920px' : '800px' : '80vw',
      maxWidth: !isMobile ? '' : '700px',
      display: 'flex',
      flexDirection: !isMobile ? 'row' : 'column',
      alignSelf: 'center',
      justifyContent: !isMobile ? 'space-between' : 'center',
      alignItems: !isMobile ? '' : 'center',
      gap: '100px',
      background: 'rgba(241, 241, 241, 0.50)',
      padding: '2rem',
      borderRadius: '20px',
    }}>
      <CategoryFilter
        categories1={categories1}
        categories2={categories2}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
  
      <select value={cidade} onChange={(e) => setCidade(e.target.value)} style={{
        width: '278px',
        borderRadius: '50px',
        padding: '.8rem',
        border: 'none',
        backgroundColor: theme.colors.neutral.x000, // Defina o fundo original para o select
        appearance: 'none', // Remover a aparência padrão do sistema
        backgroundImage: `URL(${arrowDown.src})`, // Substitua com o caminho da sua imagem da seta
        backgroundPosition: 'right 10px center', // Ajuste a posição da imagem da seta
        backgroundRepeat: 'no-repeat', // Não repita a imagem
        color: theme.colors.primary.x600,
        fontWeight: 500,
        fontSize: '1rem'
      }}>

        {
          cities.map((item, index) => {
          return <option key={index} value={item} style={{
              color: theme.colors.primary.x600,
              fontWeight: 500,
              fontSize: '.8rem'
            }}>{item}</option>
          })
        }
      </select>
      <Button size="lg" onClick={SelectFilters} fullWidth styleSheet={{
        width: !isMobile ? '178px' : '50%',
        marginLeft: !isMobile ? !(size < 1100) ? '5.5rem' : '1rem' : 'auto',
        marginRight: !isMobile ? '' : 'auto',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      }}>
        Buscar
      </Button>
    </FormBox>
  );
  
    }
