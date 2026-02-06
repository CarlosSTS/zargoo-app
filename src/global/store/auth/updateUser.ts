import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { api, interceptorsApiErros } from '~/services';
import { User } from '~/@types/User';

interface Payload {
  userId: number;
  userData: Partial<User>;
}

interface Response {
  data: User;
}

const updateUser = async ({ userId, userData }: Payload): Promise<Response> => {
  try {
    const response = await api.put<Response>(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    const handledError = interceptorsApiErros({
      title: 'Ocorreu um erro ao atualizar os dados do usuário',
      error,
    });
    Toast.show({
      type: 'error',
      text1: 'Erro ao atualizar dados',
      text2: handledError,
    });
    throw new Error(handledError);
  }
};

export const useUpdateUser = () => {
  return useMutation<Response, Error, { payload: Payload }>({
    mutationFn: ({ payload }: { payload: Payload }) => updateUser(payload),
  });
};
