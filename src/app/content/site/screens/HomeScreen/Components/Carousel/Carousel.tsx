import React, { useContext } from "react";
import { StyleSheet } from "@src/app/theme/StyleSheet";
import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import { BiMap } from "react-icons/bi";
import useSize from "@src/app/theme/helpers/useSize";
import { UserContext } from "@src/app/context/UserContext";
import { useRouter } from "next/dist/client/router";
import Slider from 'react-slick';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ImageAniver from '../../../../../../../../public/assets/images/casamento.jpeg'
import ImageCasamento from '../../../../../../../../public/assets/images/infantil.jpeg'

interface BuffetProps{
  categoria: string;
  nome: string;
  descricao: string;
  espaco_para_festa: boolean;
  capacidade: string;
  localizacao: string;
  datas_disponiveis: string[];
  slug: string;
  image: string;
}

interface CarouselProps {
  items: BuffetProps[]
  styleSheet?: StyleSheet;
  className?: string;
}

const CarouselTest: React.FC<CarouselProps> = ({ items, styleSheet, className, ...props }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Número de slides visíveis por vez
    slidesToScroll: 1,
    centerMode: true
   // Permite que os slides tenham largura variável

  };


  const size = useSize();
  const isMobile = useResponsive();
  const router = useRouter();

  const {
    setSelectedCategory
  } = useContext(UserContext);


  function SelectCategory(category){
    if(category == 'Outros'){
      setSelectedCategory([])
    }else{
      setSelectedCategory(category);
    }
    
    router.push('/busca')
  }
  
    
  let typesOfParty=[
    {
      label: 'Festa Infantil',
      image: 'https://guiadobebe.com.br/wp-content/uploads/mediagbb/01/muitas-novidades-em-festas-infantis-com-pequenas-decoracoes-interatividade-mesas-descontruidas-e-ilhas-gastronomicas-0000000000018270.jpg'
    },
    {
      label: 'Domicílio',
      image: 'https://images.pexels.com/photos/7245466/pexels-photo-7245466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      label: 'Casamento',
      image: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      label: 'Confraternização',
      image: 'https://images.pexels.com/photos/4005229/pexels-photo-4005229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      label: 'Aniversário',
      image: 'https://images.pexels.com/photos/2291347/pexels-photo-2291347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ]

  return (

    size > 650 ?
    <Box styleSheet={{height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: (size <= 650) ? 'center' : 'space-evenly', flexWrap: 'wrap', marginTop: '2rem', 
      alignItems: 'center', padding: (size <= 650) ? '0' : '2rem 8rem',
      gap: (size <= 650) ? '2rem' : '0',
    }}>
      <Box styleSheet={{display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: (size <= 650) ? '2rem' : '1rem'}} onClick={(e)=>SelectCategory(['Infantil'])}>
        <Box styleSheet={{
          background: `URL(${ImageCasamento.src})`,
          borderRadius: '100%', height: '150px', width: '150px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>

        </Box>
        <Box styleSheet={{marginTop: (size <= 650) ? '-1rem' : '0' }}><Text>Festa Infantil</Text></Box>
      </Box>
      <Box styleSheet={{display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: (size <= 650) ? '2rem' : '1rem'}} onClick={(e)=>SelectCategory(['Domicílio'])}>
        <Box styleSheet={{
          background: 'URL(https://images.pexels.com/photos/7245466/pexels-photo-7245466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          borderRadius: '100%', height: '150px', width: '150px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>

        </Box>
        <Box styleSheet={{marginTop: (size <= 650) ? '-1rem' : '0' }}><Text>Domicílio</Text></Box>
      </Box>
      <Box styleSheet={{display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: (size <= 650) ? '2rem' : '1rem'}} onClick={(e)=>SelectCategory(['Casamento'])}>
        <Box styleSheet={{
          background:  `URL(${ImageAniver.src})`,
          borderRadius: '100%', height: '150px', width: '150px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>

        </Box>
        <Box styleSheet={{marginTop: (size <= 650) ? '-1rem' : '0' }}><Text>Casamento</Text></Box>
      </Box>
      <Box styleSheet={{display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: (size <= 650) ? '2rem' : '1rem'}} onClick={(e)=>SelectCategory(['Confraternização'])}>
        <Box styleSheet={{
          background: 'URL(https://images.pexels.com/photos/4005229/pexels-photo-4005229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          borderRadius: '100%', height: '150px', width: '150px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>

        </Box>
        <Box styleSheet={{marginTop: (size <= 650) ? '-1rem' : '0' }}><Text>Confraternização</Text></Box>
      </Box>
      <Box styleSheet={{display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: (size <= 650) ? '2rem' : '1rem'}} onClick={(e)=>SelectCategory(['Aniversário'])}>
        <Box styleSheet={{
          background: 'URL(https://images.pexels.com/photos/2291347/pexels-photo-2291347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          borderRadius: '100%', height: '150px', width: '150px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>

        </Box>
        <Box styleSheet={{marginTop: (size <= 650) ? '-1rem' : '0' }}><Text>Aniversário</Text></Box>
      </Box>
    </Box>:
     <Carousel
     showArrows={true} // Mostrar as setas de navegação
  showStatus={false} // Ocultar o status
  showThumbs={false} // Ocultar as miniaturas
  centerMode={false}
  
     // Oculta o status
   >
     {typesOfParty.map((category, index) => (
       <div key={index} onClick={() => SelectCategory(category?.label)} style={{ 
          cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center', height: '300px'}}>
         <div style={{
           borderRadius: '100%',
           height: '150px',
           width: '150px',
           background: `URL(${category.image})`,
           backgroundSize: '100% 100%',
           backgroundRepeat: 'no-repeat',
           display: 'flex',
           flexDirection: 'row',
           justifyContent: "center",
           objectFit: 'cover'
         }}></div>
         <div style={{textAlign: 'center'}}>
           <Text styleSheet={{marginTop: '1rem'}}>{category.label}</Text>
         </div>
       </div>
     ))}
   </Carousel>

  );
};

export default CarouselTest;
