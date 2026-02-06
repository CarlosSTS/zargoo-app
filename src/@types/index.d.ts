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

// App Stack
export type AppStackParamsList = {
  ClientTabs: undefined;
  DriverTabs: undefined;
  NotFound: undefined;
};

// Driver Bottom Tabs
export type DriverBottomTabsParamsList = {
  DriverHomeRoutes: undefined;
  DriverDocumentsRoutes: undefined;
  DriverProfileRoutes: undefined;
};

// Driver Home Stack
export type DriverHomeStackParamsList = {
  Home: undefined;
};

// Driver Documents Stack
export type DriverDocumentsStackParamsList = {
  Documents: undefined;
};

// Driver Profile Stack
export type DriverProfileStackParamsList = {
  Profile: undefined;
  TransferBalance: undefined;
  MyVehicles: undefined;
};

// Client Bottom Tabs
export type ClientBottomTabsParamsList = {
  ClientHomeRoutes: undefined;
  ClientTripsRoutes: undefined;
  ClientProfileRoutes: undefined;
};

// Client Home Stack
export type ClientHomeStackParamsList = {
  Home: undefined;
};

// Client Trips Stack
export type ClientTripsStackParamsList = {
  Trips: undefined;
};

// Client Profile Stack
export type ClientProfileStackParamsList = {
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList { }
  }
}
