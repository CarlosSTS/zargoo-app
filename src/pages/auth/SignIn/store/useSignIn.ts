import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { api, interceptorsApiErros } from '~/services';
import { UserScope } from '~/@types';

interface SignInPayload {
  email: string;
  password: string;
  accessType: UserScope;
}

interface SignInResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    message: string;
  };
  errorMessages: string[];
}

const signIn = async (payload: SignInPayload): Promise<SignInResponse> => {
  try {
    const response = await api.post<SignInResponse>('/auth/login', payload);
    api.defaults.headers.authorization = `Bearer ${response.data.data.accessToken}`;
    return response.data;
  } catch (error) {
    const handledError = interceptorsApiErros({
      title: 'Ocorreu um erro ao fazer login',
      error,
    });
    if (handledError.includes('Usuário não possui permissão de acesso')) {
      return {
        data: {
          accessToken: '',
          refreshToken: '',
          message: handledError,
        },
        errorMessages: [],
      };
    }
    Toast.show({
      type: 'error',
      text1: 'Erro na autenticação',
      text2: handledError,
    });
    throw new Error(handledError);
  }
};

export const useSignIn = () => {
  return useMutation<SignInResponse, Error, { payload: SignInPayload }>({
    mutationFn: ({ payload }: { payload: SignInPayload }) => signIn(payload),
  });
};
