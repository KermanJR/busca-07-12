import axios from 'axios';

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const API_KEY = 'AIzaSyAya9eZExoZU0kFL8IsmMEyzftPn0j1f9M';  

export const searchPlacesByText = async (query: string) => {
  const params = {
    query: `buffet ${query}`, 
    type: 'restaurant', 
    key: API_KEY
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data.results;
};

export const searchPlacesByLocation = async (ip: any) => {

  const response = await axios.get(`https://ipinfo.io/${ip}/json`);
  const { loc } = response.data;
  const [latitude, longitude] = loc.split(',');


  const GOOGLE_PLACES_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const placesResponse = await axios.get(GOOGLE_PLACES_API_ENDPOINT, {
    params: {
      location: `${latitude},${longitude}`,
      radius: 20000,  
      type: 'restaurant',
      keyword: 'buffet, eventos',
      key: API_KEY
    }
  });

  return placesResponse.data.results;
};


export const fetchPlacePhoto = (photoReference: string, maxWidth: number = 400) => {
  const PHOTO_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/photo';

  const params = {
      maxwidth: maxWidth,
      photoreference: photoReference,
      key: API_KEY
  };

  const url = new URL(PHOTO_API_ENDPOINT);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  return url.toString();
};

