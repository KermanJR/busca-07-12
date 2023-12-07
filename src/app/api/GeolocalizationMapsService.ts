



export default class GeolocalizationMapsService {
  static async getUserPreciseLocation() {
    if ("geolocation" in navigator) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Erro ao obter a localização precisa:", error);
            reject(error);
          }
        );
      });
    } else {
      console.error("Geolocalização não suportada pelo navegador.");
      return null;
    }
  }

  static async geocodeAddresses(ceps) {
    const apiKey = 'AIzaSyAya9eZExoZU0kFL8IsmMEyzftPn0j1f9M'; 
    const coordinates = [];

    for (const cep of ceps) {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cep)}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
          const result = data.results[0];
          const { lat, lng } = result.geometry.location;
          coordinates.push({ latitude: lat, longitude: lng });
        } else {
          console.error(`Erro ao geocodificar o CEP ${cep}: ${data.status}`);
        }
      } catch (error) {
        console.error(`Erro ao geocodificar o CEP ${cep}: ${error}`);
      }
    }

    return coordinates;
  }

  static async geocodeAddressByCep(cep) {
    const apiKey = 'AIzaSyAya9eZExoZU0kFL8IsmMEyzftPn0j1f9M';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cep)}&key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.status === 'OK' && data.results.length > 0) {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        console.error(`Erro ao geocodificar o CEP ${cep}: ${data.status}`);
        return null;
      }
    } catch (error) {
      console.error(`Erro ao geocodificar o CEP ${cep}: ${error}`);
      return null;
    }
  }
  

  
}



