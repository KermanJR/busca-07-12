import type { NextApiRequest, NextApiResponse } from 'next';
import { searchPlacesByText, searchPlacesByLocation } from '../../app/services/googlePlaces';
import axios from 'axios';

const getPublicIp = async () => {
  try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
  } catch (error) {
      console.error("Erro ao buscar o IP público:", error);
      return null;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.body;
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ip.includes('127.0.0.1') || ip.includes('::1')) {
    ip = await getPublicIp();
  }

  try {
    let results;

    if (query) {
      // Se o usuário fornecer uma consulta textual, use-a para buscar os buffets
      results = await searchPlacesByText(query);
    } else {
      // Caso contrário, use o IP para determinar a localização e buscar buffets próximos
      results = await searchPlacesByLocation(ip);
    }

    res.status(200).json(results);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Google Places API' });
  }
};
