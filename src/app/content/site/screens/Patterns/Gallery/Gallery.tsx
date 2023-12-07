import Box from "@src/app/theme/components/Box/Box";
import { useTheme } from "@src/app/theme/ThemeProvider";
import React, { useEffect, useState } from "react";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import Image from "@src/app/theme/components/Image/Image";

export default function Gallery(){

  const theme = useTheme()
  const isMobile = useResponsive();
  const [imageGallery, setImageGallery] = useState([]);

  async function getImagesGallery(){
    fetch('https://picsum.photos/v2/list?page=2&limit=100', {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type' : 'application/json',
        }}
    ).then(res=>(
        res.json()
    )).then(res=>{
        setImageGallery(res)
    })
  }

 
  useEffect(()=>{
    getImagesGallery();
  }, [])

  
  
  return(
      <Box tag="footer"
        styleSheet={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '.5rem',
          flexDirection: `${isMobile ? 'column' : 'row'}`,
          height: 'auto',
          width: '100%',
          color: theme.colors.neutral.x000,
          textAlign: 'left',
          justifyContent: 'space-between',
          marginTop: '4rem',
        }}
      >  
       {
        imageGallery.slice(0, 8).map((image, index)=>(
            <Image 
                src={image?.download_url}
                alt="image" 
                styleSheet={{
                    width: `${isMobile? '100%': '20%'}`,
                    height: 'auto',
                    borderRadius: '8px'
                }}
            />
        ))
       }
      </Box>  
  )
}
