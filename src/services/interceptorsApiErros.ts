import { AxiosError } from 'axios';

interface InterceptorsApiErrosProps {
  title: string;
  error: unknown;
}
const interceptorsApiErros = ({ title, error }: InterceptorsApiErrosProps) => {
  if (error instanceof AxiosError) {
    const { errorMessages, message } = error?.response?.data || {};
    const rawErrorMessages = (errorMessages || message) as string[] | undefined;
    if (Array.isArray(rawErrorMessages)) {
      return rawErrorMessages.join(', ');
    }

    if (typeof rawErrorMessages === 'string') {
      return rawErrorMessages;
    }

    if (error.message === 'Network Error') {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }

    if (error.message.includes('timeout of')) {
      return 'Tempo de conexão esgotado. Tente novamente.';
    }

    if (__DEV__) {
      return error.message;
    }
    return title
      ? `${title}-${error.status}`
      : `Erro desconhecido - ${error.status}`;
  }

  return title || 'Erro desconhecido - COD 001';
};

export default interceptorsApiErros;
