import React, { useState } from 'react';
import Modal from 'react-modal';
import MapComponent from '../MapComponent';
import Box from '@src/app/theme/components/Box/Box';
import useSize from '@src/app/theme/helpers/useSize';

Modal.setAppElement('#__next'); // Define o elemento raiz do aplicativo

const MapModal = ({ isOpen, onRequestClose, coordinates }) => {


  const size = useSize()
  return (
    <Box styleSheet={{
      height: '200px',
    }}>

      {isOpen ? (<Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel="Mapa Modal"
          style={{
            overlay:{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              zIndex: 4
            },
            content: {
              height: size > 650 ? '450px': 'auto',
              width: size > 650 ?'50%': '100%',
              position: 'relative',
              top: '0',
              right: '0',
              left: size > 650 ? '0': '0'
            }
          }}
        >
          <MapComponent coordinates={coordinates?.length > 1? coordinates?.map((item, index)=>(item)):coordinates}/>
        </Modal>):
            <MapComponent coordinates={coordinates?.length > 1? coordinates?.map((item, index)=>(item)):coordinates}/>
        }
    </Box>
  );
};

export default MapModal;
