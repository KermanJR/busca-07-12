import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF,  } from '@react-google-maps/api';
import GeolocalizationMapsService from '@src/app/api/GeolocalizationMapsService';
import { UserContext } from '@src/app/context/UserContext';
import IconLoc from '../../../../../../../../public/assets/icons/localization.png'

const MapComponent = ({coordinates}) => {

  const [nextAddress, setNextAddress] = useState([]);

  const {
    dataBuffet
  } = useContext(UserContext)

  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px'
  };

  //let ceps = dataBuffet.map((objeto) => objeto['entidade']['enderecos'][0]['endereco']['cep']);

coordinates.map((item, index)=>{

  })
  const center = {
    lat: Number(coordinates?.length > 1? coordinates?.map((item, index)=>(item?.latitude)): coordinates[0]?.latitude),
    lng: Number(coordinates?.length > 1? coordinates?.map((item, index)=>(item?.longitude)): coordinates[0]?.longitude)
  };



  /*const customIcon = {
    url: IconLoc.src, // Substitua pelo caminho para o seu ícone personalizado
    Size: {
      width: 10,
      height: 10
    }  // Tamanho do ícone// Tamanho do ícone
  };*/
  


  /*useEffect(()=>{
    GeolocalizationMapsService.geocodeAddresses(ceps)
    .then((response)=>{
      let obj = response.map((item)=>(
        {
          lat: item.latitude,
          lng: item.longitude
        }
      ))
      setNextAddress(obj)
    })
  }, [dataBuffet])*/



  return (
    <LoadScript googleMapsApiKey="AIzaSyAya9eZExoZU0kFL8IsmMEyzftPn0j1f9M">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <MarkerF
          position={center}
          title="Minha Localização"
          
        />

        {nextAddress.map((item)=>(
            <MarkerF
              position={item}
              title="Buffet Próximo"
            />
          ))
        }

        {}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
