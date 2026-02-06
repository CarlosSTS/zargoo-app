import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';
import { osrmApi } from './api';
import { isValidCoordinate } from '../utils';

interface GetPolyLineServicePayload {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
}

interface RouteCoordinates {
  centerMap: [number, number];
  // GOOGLE MAPS
  coordinatesMap:
  | { lat: number; lng: number }[]
  //LEALFET
  | { latitude: number; longitude: number }[];
}

interface OSRMResponse {
  routes?: Array<{
    geometry?: {
      coordinates?: [number, number][];
    };
  }>;
}

const getPolyLineService = async (
  payload: GetPolyLineServicePayload,
): Promise<RouteCoordinates> => {
  try {
    const { origin, destination } = payload;
    if (
      !isValidCoordinate(origin.latitude, origin.longitude) ||
      !isValidCoordinate(destination.latitude, destination.longitude)
    ) {
      throw {
        title: 'Coordenadas inválidas',
        message: 'Por favor, verifique as coordenadas de origem e destino.',
      };
    }
    const response = await osrmApi.get<OSRMResponse>(
      `${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}`,
    );

    const coordinates = response.data?.routes?.[0]?.geometry?.coordinates;

    if (!coordinates || coordinates.length === 0) {
      throw {
        title: 'Rota não encontrada',
        message:
          'Não foi possível encontrar uma rota para o destino fornecido.',
      };
    }

    const centerMap = coordinates[Math.floor(coordinates.length / 2)];
    const coordinatesMap = coordinates.map(([lng, lat]) => ({
      latitude: lat,
      longitude: lng,
    }));

    return {
      centerMap,
      coordinatesMap,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        // Provavelmente distância excessiva ou coordenadas inválidas
        Toast.show({
          type: 'error',
          text1: 'Rota inválida',
          text2: 'Não foi possível traçar rota entre os pontos informados.',
        });
      }
      throw error;
    }

    const customError = error as { title?: string; message?: string };
    Toast.show({
      type: 'error',
      text1: customError?.title || 'Erro ao buscar rota',
      text2:
        customError?.message || 'Não foi possível buscar a rota para o destino',
    });

    throw error;
  }
};

export default getPolyLineService;
