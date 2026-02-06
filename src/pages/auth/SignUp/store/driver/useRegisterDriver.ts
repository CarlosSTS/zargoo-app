import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { api, interceptorsApiErros } from '~/services';
import {
  RegisterDriverPayload,
  RegisterDriverResponse,
} from '../../interface/registerDriver';

const registerDriver = async (
  payload: RegisterDriverPayload,
): Promise<RegisterDriverResponse> => {
  try {
    const response = await api.post<RegisterDriverResponse>('/driver', payload);
    console.log(
      'registerDriver response:',
      JSON.stringify(response.data, null, 2),
    );
    return response.data;
  } catch (error) {
    const handledError = interceptorsApiErros({
      title: 'Ocorreu um erro ao fazer registro do motorista',
      error,
    });
    Toast.show({
      type: 'error',
      text1: 'Erro no registro do motorista',
      text2: handledError,
    });
    throw new Error(handledError);
  }
};

export const useRegisterDriver = () => {
  return useMutation<
    RegisterDriverResponse,
    Error,
    { payload: RegisterDriverPayload }
  >({
    mutationFn: ({ payload }: { payload: RegisterDriverPayload }) =>
      registerDriver(payload),
  });
};
