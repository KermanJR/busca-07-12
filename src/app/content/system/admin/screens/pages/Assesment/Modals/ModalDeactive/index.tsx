import ModalDashboard from "@src/app/components/system/Modal";
import Box from "@src/app/theme/components/Box/Box";
import Button from "@src/app/theme/components/Button/Button";
import Text from "@src/app/theme/components/Text/Text";

const ModalDashboardDeactive = ({isModalOpenDeactive, setIsModalOpenDeactive}) =>{
  return(
      <ModalDashboard 
        isOpen={isModalOpenDeactive}
        setIsModalOpen={setIsModalOpenDeactive}
        styleSheet={{

        }}
      >
        <Text styleSheet={{padding: '.5rem 0'}} variant="body2">Deseja desativar  avaliação do usuário?</Text>
        <Text variant="body1">Ao fazer isso, o usuário não poderá usar mais o período de avaliação gratuito do cupom.</Text>
        <Box styleSheet={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
          <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '132px'}} fullWidth colorVariant="primary">Não</Button>
          <Button styleSheet={{marginTop: '1rem', alignSelf: 'center', width: '132px'}} fullWidth colorVariant="secondary">Sim</Button>
        </Box>
      </ModalDashboard>
  )
}

export default ModalDashboardDeactive;
