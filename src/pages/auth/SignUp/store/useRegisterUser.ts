import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { api, interceptorsApiErros } from '~/services';
import {
  RegisterUserPayload,
  RegisterUserResponse,
} from '../interface/registerUser';

const registerUser = async (
  payload: RegisterUserPayload,
): Promise<RegisterUserResponse> => {
  try {
    const finalPath = payload.accessType === 'DRIVER' ? '/driver' : '/cliente';
    const response = await api.post<RegisterUserResponse>(finalPath, payload);
    console.log(
      'registerUser response:',
      JSON.stringify(response.data, null, 2),
    );
    return response.data;
  } catch (error) {
    const handledError = interceptorsApiErros({
      title: 'Ocorreu um erro ao fazer registro do usuário',
      error,
    });
    Toast.show({
      type: 'error',
      text1: 'Erro no registro do usuário',
      text2: handledError,
    });
    throw new Error(handledError);
  }
};

export const useRegisterUser = () => {
  return useMutation<
    RegisterUserResponse,
    Error,
    { payload: RegisterUserPayload }
  >({
    mutationFn: ({ payload }: { payload: RegisterUserPayload }) =>
      registerUser(payload),
  });
};
