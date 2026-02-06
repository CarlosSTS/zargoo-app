import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
      onPress: () => { },
    },
  ]);
};

export const requestCameraPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    showSettingsAlert(
      'Permissão negada',
      'Precisamos de permissão para acessar a câmera',
    );
    return false;
  }
  return true;
};

export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    showSettingsAlert(
      'Permissão negada',
      'Precisamos de permissão para acessar a galeria',
    );
    return false;
  }
  return true;
};
