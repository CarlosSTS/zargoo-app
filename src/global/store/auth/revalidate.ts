import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { api, interceptorsApiErros } from '~/services';

interface Payload {
  refreshToken: string;
}

interface Response {
  data: {
    accessToken: string;
  };
}

const revalidate = async (payload: Payload): Promise<Response> => {
  try {
    const response = await api.post<Response>('/auth/revalidate', payload);
    api.defaults.headers.authorization = `Bearer ${response.data.data.accessToken}`;
    return response.data;
  } catch (error) {
    const handledError = interceptorsApiErros({
      title: 'Ocorreu um erro ao iniciar sessão',
      error,
    });
    Toast.show({
      type: 'error',
      text1: 'Erro ao revalidar sessão',
      text2: handledError,
    });
    throw new Error(handledError);
  }
};

export const useRevalidate = () => {
  return useMutation<Response, Error, { payload: Payload }>({
    mutationFn: ({ payload }: { payload: Payload }) => revalidate(payload),
  });
};
