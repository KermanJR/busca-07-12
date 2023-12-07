import Box from "@src/app/theme/components/Box/Box";
import Image from "@src/app/theme/components/Image/Image";
import Text from "@src/app/theme/components/Text/Text";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import img from '../../../../../../public/assets/tempIcon.jpeg'
import style from './style.module.css';

export function BoxInfo({text}) {

  const isMobile = useResponsive()

  return (
    <Box className={style.divInfos} styleSheet={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: !isMobile ? '20vw' : '45vw', height: 'auto', padding: '10px',  borderRadius: '10px'}}>
      <Image src={img.src} alt="planIcon" styleSheet={{width: '100px', height: '100px', borderRadius: '50%'}}></Image>
      <Text styleSheet={{marginTop: '10px', textAlign: 'center'}}>
        {text}
      </Text>
    </Box>
  )
}
