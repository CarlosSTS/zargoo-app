import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { api, interceptorsApiErros } from '~/services';

const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    const handledError = interceptorsApiErros({
      title: 'Ocorreu um erro ao fazer logout',
      error,
    });
    Toast.show({
      type: 'error',
      text1: 'Erro ao fazer logout',
      text2: handledError,
    });
    throw new Error(handledError);
  }
};

export const useLogout = () => {
  return useMutation<void, Error>({
    mutationFn: () => logout(),
  });
};
