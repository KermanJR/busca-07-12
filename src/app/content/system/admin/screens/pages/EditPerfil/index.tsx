import BoxDash from "@src/app/components/system/BoxDash";
import SubHeader from "@src/app/components/system/Subheader"
import { useTheme } from "@src/app/theme/ThemeProvider"
import Box from "@src/app/theme/components/Box/Box"
import Icon from "@src/app/theme/components/Icon/Icon";
import InputDash from "@src/app/components/system/InputDash";
import Text from "@src/app/theme/components/Text/Text";

const EditPerfil = () =>{

  const theme = useTheme();

  return(
    <Box tag="form" styleSheet={{
      width: '100%',
      height: 'auto',
      backgroundColor: theme.colors.neutral.x000,
      borderRadius: '8px',
      padding: '2rem'
    }}>
     <Box styleSheet={{display: 'grid',gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
        <InputDash placeholder="Nome do buffet" type="text" />
        <InputDash placeholder="CNPJ" type="text"/>
     </Box>

     <Box styleSheet={{display: 'grid', gridTemplateColumns: '3fr 1fr 2fr 2fr', gap: '2rem', padding: '2rem 0 2rem 0'}}>
        <InputDash placeholder="Rua" type="text" />
        <InputDash placeholder="CEP" type="text"/>
        <InputDash placeholder="Cidade" type="text"/>
        <InputDash placeholder="Estado" type="text"/>
     </Box>

     <Text variant="heading4Bold" color={theme.colors.neutral.x999}>Informações Técnicas</Text>

     <Box styleSheet={{display: 'grid', gridTemplateColumns: '3fr 1fr 2fr 2fr', gap: '2rem', padding: '1rem 0 1rem 0'}}>
        <InputDash placeholder="Capacidade Total" type="text" />
        <InputDash placeholder="Área total" type="text"/>
        <InputDash placeholder="Atendimento: Seg à Sex" type="text"/>
        <InputDash placeholder="Atendimento: Fim de semana" type="text"/>
     </Box>

     <Box styleSheet={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '1rem 0 1rem 0'}}>
      <Box>
        <Text variant="heading4Bold" color={theme.colors.neutral.x999} styleSheet={{padding: '1rem 0'}}>Atrações</Text>
        <InputDash placeholder="Selecione todas as atrações disponíveis" type="text" />
      </Box>
      <Box>
        <Text variant="heading4Bold" color={theme.colors.neutral.x999} styleSheet={{padding: '1rem 0'}}>Serviços oferecidos</Text>
        <InputDash placeholder="Selecione todos os serviçoes oferecidos" type="text" />
      </Box>
     </Box>

      <Box>
        <Text variant="heading4Bold" color={theme.colors.neutral.x999} styleSheet={{padding: '1rem 0'}}>Sobre</Text>
        <InputDash tag="textarea" placeholder="Escreva brevemente a história do buffet" styleSheet={{height: '205px'}}/>
      </Box>
    </Box>
  )
}

export default EditPerfil;
