import { UserScope } from '~/@types';

export interface NameFormData {
  first_name: string;
  last_name: string;
  state: string;
  city: string;
}

export interface DocumentsFormData {
  cpf: string;
  rg: string;
  cnh: string;
  cnh_img_url: string;
}

export interface PasswordFormData {
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface RegisterDriverFormData
  extends NameFormData, DocumentsFormData {
  accessType: UserScope;
  email: string;
  password: string;
}

export interface RegisterDriverPayload {
  email: string;
  cpf: string;
  rg: string;
  first_name: string;
  last_name: string;
  password: string;
  cnh: string;
  cnh_img_url: string;
  city: string;
  state: string;
}

export interface RegisterDriverResponse {
  data: {};
}
