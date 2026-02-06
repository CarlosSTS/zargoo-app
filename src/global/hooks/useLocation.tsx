import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { Region } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import { locationPermission } from '../utils';

interface LocationData {
  currentLocation: Region;
  heading: number | null;
  speed: number | null;
  accuracy: number | null;
  city: string | null;
  state: string | null;
}

interface LocationContextData {
  locationData: LocationData;
  isLoading: boolean;
  getCurrentLocation: () => Promise<void>;
  watchLocation: () => Promise<void>;
  stopWatchingLocation: () => void;
  hasLocation: boolean;
}

const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData,
);

interface LocationProviderProps {
  children: ReactNode;
}

const inintialRegion: Region = {
  latitude: -14.235, // Centro do Brasil
  longitude: -51.9253,
  latitudeDelta: 30.0, // Zoom para mostrar o Brasil todo
  longitudeDelta: 30.0,
};

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [locationData, setLocationData] = useState<LocationData>({
    currentLocation: {
      latitude: inintialRegion.latitude,
      longitude: inintialRegion.longitude,
      latitudeDelta: inintialRegion.latitudeDelta,
      longitudeDelta: inintialRegion.longitudeDelta,
    },
    heading: null,
    speed: null,
    accuracy: null,
    city: null,
    state: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const locationSubscriptionRef = useRef<Location.LocationSubscription | null>(
    null,
  );

  const getAddressFromCoordinates = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const addressData = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (addressData && addressData.length > 0) {
          const address = addressData[0];
          return {
            city: address.city || address.subregion || null,
            state: address.region || null,
          };
        }

        return {
          city: null,
          state: null,
        };
      } catch (error) {
        return {
          city: null,
          state: null,
        };
      }
    },
    [],
  );

  const getCurrentLocation = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      const hasServicesEnabled = await Location.hasServicesEnabledAsync();
      if (!hasServicesEnabled) {
        throw new Error('Serviço de localização desativado');
      }

      const hasPermission = await locationPermission();
      if (!hasPermission) {
        throw new Error('Permissão de localização necessária');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      console.log('Localização obtida:', location);

      const { city, state } = await getAddressFromCoordinates(
        location.coords.latitude,
        location.coords.longitude,
      );

      setLocationData({
        currentLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        heading: location.coords.heading,
        speed: location.coords.speed,
        accuracy: location.coords.accuracy,
        city,
        state,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: (error as Error).message || 'Erro ao obter localização',
        text2: 'Verifique se o serviço e as permissões de localização.',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [getAddressFromCoordinates]);

  const watchLocation = useCallback(async (): Promise<void> => {
    try {
      const hasServicesEnabled = await Location.hasServicesEnabledAsync();
      if (!hasServicesEnabled) {
        throw new Error('Serviço de localização desativado');
      }

      const hasPermission = await locationPermission();
      if (!hasPermission) {
        throw new Error('Permissão de localização necessária');
      }

      console.log('Iniciando monitoramento de localização...');
      // Remove subscription anterior se existir
      if (locationSubscriptionRef.current) {
        locationSubscriptionRef.current.remove();
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          // TODO: Apenas um dos 2 funciona ao usar os 2 ele não respeita timeInterval
          // timeInterval: 5000, // Atualiza a cada 5 segundos
          distanceInterval: 1, // Ou a cada 1 metros
        },
        async (location) => {
          setLocationData({
            currentLocation: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            heading: location.coords.heading,
            speed: location.coords.speed,
            accuracy: location.coords.accuracy,
            city: locationData.city,
            state: locationData.state,
          });
        },
      );

      locationSubscriptionRef.current = subscription;
    } catch (error) {
      console.error('Erro ao iniciar monitoramento de localização:', error);
      throw error;
    }
  }, [locationData.city, locationData.state]);

  const stopWatchingLocation = useCallback((): void => {
    if (locationSubscriptionRef.current) {
      locationSubscriptionRef.current.remove();
      locationSubscriptionRef.current = null;
    }
    console.log('Parou de monitorar a localização');
  }, []);

  const hasLocation = useMemo(() => {
    return (
      locationData.currentLocation.latitude !== inintialRegion.latitude &&
      locationData.currentLocation.longitude !== inintialRegion.longitude
    );
  }, [
    locationData.currentLocation.latitude,
    locationData.currentLocation.longitude,
  ]);

  const value: LocationContextData = {
    locationData,
    isLoading,
    getCurrentLocation,
    watchLocation,
    stopWatchingLocation,
    hasLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextData => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocation deve ser usado dentro de um LocationProvider');
  }

  return context;
};
