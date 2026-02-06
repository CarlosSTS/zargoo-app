declare module '*.png';

import { defaultValues } from '~/global';
import { User } from './User';

export type UserScope =
  (typeof defaultValues.USER_TYPE)[keyof typeof defaultValues.USER_TYPE];

export type AuthStackParamList = {
  UserAccessType: undefined;
  UserAccessTypeSelect: undefined;
  SignIn: { accessType: UserScope };
  Forbidden: {
    email: string;
    expectedRole: UserScope;
    meData: Omit<User, 'expireIn'>;
    accessToken: string;
    refreshToken: string;
  };
  //SignUp
  EmailAddress: undefined;
  ValidateCodeEmail: undefined;
  ConfirmEmailMessage: undefined;
  DocumentsForm: undefined;
  NameForm: undefined;
  PasswordForm: undefined;
  ConfirmSignUpMessage: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList { }
  }
}
