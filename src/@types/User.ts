import { UserScope } from '.';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  birth_date: string | null;
  cpf: string;
  rg: string;
  phone: string | null;
  email: string;
  password: string;
  address_neighborhood: string | null;
  address_street: string | null;
  address_number: string | null;
  address_complement: string | null;
  address_city: string | null;
  address_state: string | null;
  address_zipcode: string | null;
  is_active: boolean;
  role: UserScope;
  refresh_token: string;
  refresh_token_expires_at: string;
  session_scope: UserScope;
  base_id: number | null;
  deleted_at: string | null;

  expireIn: number; // CAMPO ADICIONAL PARA CONTROLAR EXPIRAÇÃO DE TOKEN
  drivers: Driver[];
}
