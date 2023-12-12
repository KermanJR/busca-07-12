import { useTheme } from "@src/app/theme/ThemeProvider";
import Box from "@src/app/theme/components/Box/Box";
import Button from "@src/app/theme/components/Button/Button";
import Text from "@src/app/theme/components/Text/Text";

import ImageBanner from '../../../../../../../../public/assets/images/banner_singlePage_buffet.webp'
import { useContext } from "react";
import { UserContext } from "@src/app/context/UserContext";
import { useRouter } from "next/router";

export default function Banner({data}){

    console.log(data)

    const theme = useTheme();
    const imagens = data?.galerias;
    const router = useRouter();

    const {
        idBuffet,
        setIdBuffet,
        setDataBuffet
    } = useContext(UserContext);

    const handleSubmit = (e, idEntidade)=>{
        e.preventDefault();
        setIdBuffet(idEntidade)
        setDataBuffet(data)
        router.push('/orcamento-por-regiao')

    }
 


    const imagemCapa = imagens?.find(imagem => imagem?.arquivo?.tipo === 'capa');


    return(
        <Box tag="div"
            styleSheet={{
                width: '100%',
                height: '487px',
                background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://buscabuffet.com.br/api/uploads/${data?.galerias?.length > 0 && imagemCapa?.arquivo?.nome})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5.5rem'
            }}    
        >     {/* Pseudo-elemento para escurecer o fundo */}
  
            <Box tag="div" 
                styleSheet={{
                    width: {md: '70%', sx:'50%'},
                    margin: '0 auto',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirectioc: 'column'
                }}
            >
                <Text variant="heading3semiBold"
                    styleSheet={{color: `${theme.colors.neutral.x000}`, fontSize: '3rem'}}
                >
                    {data?.entidade?.nome}
                </Text>

                <Text tag="p" variant="body2"
                    styleSheet={{color: `${theme.colors.neutral.x000}`, fontSize: '1.2rem', paddingTop: '.5rem'}}
                >
                    Cadastre-se e solicite seu orçamento
                </Text>

                <Button onClick={(e)=>handleSubmit(e, data?.id_entidade)} variant="contained" colorVariant="secondary" size="lg" styleSheet={{margin: '2rem auto'}}>Solicitar orçamento</Button>
            </Box>
        </Box>
    )
}
