import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { api, interceptorsApiErros } from '~/services';
import { User } from '~/@types/User';

interface MeResponse {
  data: Omit<User, 'expireIn'>;
  errorMessages: string[];
}

const me = async (): Promise<MeResponse> => {
  try {
    const response = await api.get<MeResponse>('/users/me?role=driver');
    return response.data;
  } catch (error) {
    const handledError = interceptorsApiErros({
      title: 'Ocorreu um erro ao buscar os dados do usuário',
      error,
    });
    Toast.show({
      type: 'error',
      text1: 'Erro ao buscar dados do usuário',
      text2: handledError,
    });
    throw new Error(handledError);
  }
};

export const useMe = () => {
  return useMutation<MeResponse, Error>({
    mutationFn: () => me(),
  });
};
