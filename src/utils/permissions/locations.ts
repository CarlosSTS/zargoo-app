import { Alert, Linking } from 'react-native';
import * as Location from 'expo-location';

const showSettingsAlert = (title: string, message: string) => {
  Alert.alert(title, message, [
    {
      text: 'Abrir Configurações',
      style: 'default',
      onPress: () => Linking.openSettings(),
    },
    {
      text: 'Cancelar',
      style: 'destructive',
    },
  ]);
};

const locationPermission = async (showAlert = true): Promise<boolean> => {
  let { status } = await Location.getForegroundPermissionsAsync();

  if (status !== Location.PermissionStatus.GRANTED) {
    const result = await Location.requestForegroundPermissionsAsync();
    status = result.status;

    if (status !== Location.PermissionStatus.GRANTED && result.canAskAgain) {
      const secondAttempt = await Location.requestForegroundPermissionsAsync();
      status = secondAttempt.status;
    }
  }

  if (status !== Location.PermissionStatus.GRANTED) {
    if (showAlert) {
      showSettingsAlert(
        'Permissão de localização necessária',
        'Para usar este recurso, você precisa permitir o acesso à ' +
        'localização. Acesse as configurações do app.',
      );
    }
    return false;
  }
  return true;
};

export default locationPermission;
