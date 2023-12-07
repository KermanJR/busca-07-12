import Box from '@src/app/theme/components/Box/Box';
import Image from '@src/app/theme/components/Image/Image';
import React, { useState } from 'react';

export const Gallery = ({ dataBuffet, isMobile }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box>
      <Box
        tag="footer"
        styleSheet={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '.5rem',
          flexDirection: isMobile ? 'column' : 'row',
          height: 'auto',
          width: '100%',
          color: 'your-text-color',
          textAlign: 'left',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        {dataBuffet?.galerias?.slice(2).map((image, index) => (
          image?.arquivo?.tipo === "galeria" && (
          <Box
            key={index}
            styleSheet={{
              width: isMobile ? '100%' : '20%',
              cursor: 'pointer',
            }}
            onClick={() => openImageModal(image)}
          >
            <Image
              src={`https://buscabuffet.com.br/api/uploads/${image?.arquivo?.nome}`}
              alt="image"
              styleSheet={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
              }}
            />
          </Box>
          )
          
        ))}
      </Box>

      {selectedImage && (
        <Box
          styleSheet={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={closeImageModal}
        >
          <Image
            src={`https://buscabuffet.com.br/api/uploads/${selectedImage?.arquivo?.nome}`}
            alt="image"
            styleSheet={{
              maxWidth: '90%',
              maxHeight: '90%',
            }}
          />
        </Box>
      )}
    </Box>
  );
};
