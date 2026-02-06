import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 20000,
});

export default api;

export const osrmApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_OSRM_API_BASE_URL,
  params: {
    overview: 'full',
    geometries: 'geojson',
  },
});
