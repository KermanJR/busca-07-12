import Box from "@src/app/theme/components/Box/Box";
import Button from "@src/app/theme/components/Button/Button";
import { useTheme } from "@src/app/theme/ThemeProvider";
import { useContext, useState } from "react";
import Input from "@src/app/theme/components/Input/Input";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import useSize from "@src/app/theme/helpers/useSize";
import { ResultSection } from "../ResultSection";
import { useEffect } from "react";
import BuffetService from "@src/app/api/BuffetService";
import { UserContext } from "@src/app/context/UserContext";


const FormSearch = ({buttonLabel}) => {

  const theme = useTheme();

  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);


  const {
    setDataBuffet
  } = useContext(UserContext)

  function QueryBuffetBySearch(){
    BuffetService.showBuffetsBySearch(query)
    .then(res=>{
      setDataBuffet(res)
    })
  }



  const isMobile = useResponsive()
  const size = useSize()

  return (
    <Box styleSheet={{
      display: 'block',
      
    }}>
      <Box styleSheet={{
      display: 'flex',
      flexDirection: !(size < 400) ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.neutral.x000,
      borderRadius: '1.25rem',
      padding: !(size < 400) ? '2rem' : '1rem',
      width: '100%',
      boxShadow: `0px 4px 4px 0px ${theme.colors.neutral.x050}`
    }}>
      <Input
        value={query}
        onChange={setQuery}
        styleSheet={{ 
          flex: '1',
          marginRight: '1rem',
          marginBottom: !(size < 400) ? '' : '1rem',
          border: 'none',
          borderRadius: '1.25rem',
          padding: '0.5rem',
          backgroundColor: theme.colors.neutral.x050,
        }}
        placeholder="Digite sua pesquisa..."
      />
      <Button 
        onClick={QueryBuffetBySearch}
        fullWidth
        size="lg"
        styleSheet={{ 
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.primary.x500,
          color: theme.colors.neutral.x000,
          width: !isMobile ? '11.0995rem' : 'auto',
          padding: '0.5rem 1rem',
          borderRadius: '1.25rem',
          cursor: 'pointer'
        }}>
          {buttonLabel}
      </Button>
    </Box>
      <ResultSection />
    </Box>
  );
};

export default FormSearch;
