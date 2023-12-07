
import InputDash from "@src/app/components/system/InputDash";
import ModalDashboard from "@src/app/components/system/Modal";
import { useTheme } from "@src/app/theme/ThemeProvider";
import Button from "@src/app/theme/components/Button/Button";
import Text from "@src/app/theme/components/Text/Text";

const ModalDashboardEdit = ({isModalOpenEdit, setIsModalOpenEdit}) =>{

  const theme = useTheme();

  return(
      <ModalDashboard 
        isOpen={isModalOpenEdit}
        setIsModalOpen={setIsModalOpenEdit}
        styleSheet={{
          textAlign:'center',
          alignItems: 'center'
        }}
      >
        <Text styleSheet={{padding: '.5rem 0'}}>Adicionar novo cupom de desconto para avaliação</Text>
        <InputDash placeholder="Digite o cupom" styleSheet={{backgroundColor: theme.colors.neutral.x100, width: '205px'}}/>
        <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '214px'}} fullWidth colorVariant="secondary">Salvar alterações</Button>
      </ModalDashboard>
  )
}

export default ModalDashboardEdit;
