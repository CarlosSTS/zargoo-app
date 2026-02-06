declare module '*.png';

import { defaultValues } from '~/global';

type UserType =
  (typeof defaultValues.USER_TYPE)[keyof typeof defaultValues.USER_TYPE];

export type AuthStackParamList = {
  UserAccessType: undefined;
  UserAccessTypeSelect: undefined;
  SignIn: { role: UserType };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList { }
  }
}
