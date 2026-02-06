import { UserScope } from '~/@types';

const getUserScope = ({ role }: { role: UserScope }) => {
  if (role === 'DRIVER') {
    return 'Motorista';
  }

  if (role === 'CLIENT') {
    return 'Usuário';
  }

  if (role === 'ADMIN') {
    return 'Administrador';
  }

  return 'Desconhecido';
};

export default getUserScope;
