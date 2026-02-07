import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { api, interceptorsApiErros } from '~/services';
import { UserScope } from '~/@types';

interface SendConfirmationEmailPayload {
  email: string;
  accessType: UserScope;
}

interface SendConfirmationEmailResponse {
  data: {
    message: string;
  };
}

const sendConfirmationEmail = async (
  payload: SendConfirmationEmailPayload,
): Promise<SendConfirmationEmailResponse> => {
  const finalPath = payload.accessType === 'DRIVER' ? '/driver' : '/cliente';

  try {
    const response = await api.post<SendConfirmationEmailResponse>(
      `${finalPath}/send-confirmation-email`,
      { email: payload.email },
    );
    return response.data;
  } catch (error) {
    const handledError = interceptorsApiErros({
      title: 'Erro ao enviar código',
      error,
    });
    Toast.show({
      type: 'error',
      text1: 'Erro ao enviar código',
      text2: handledError || 'Verifique o e-mail informado e tente novamente.',
    });
    throw new Error(handledError);
  }
};

export const useSendConfirmationEmail = () => {
  return useMutation<
    SendConfirmationEmailResponse,
    Error,
    { payload: SendConfirmationEmailPayload }
  >({
    mutationFn: ({ payload }: { payload: SendConfirmationEmailPayload }) =>
      sendConfirmationEmail(payload),
  });
};
