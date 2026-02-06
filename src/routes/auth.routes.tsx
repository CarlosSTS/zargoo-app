import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../global/styles';
import {
  UserAccessType,
  SignIn,
  UserAccessTypeSelect,
  Forbidden,
  //SignUp
  EmailAddress,
  ValidateCodeEmail,
  ConfirmEmailMessage,
  DocumentsForm,
  NameForm,
  PasswordForm,
  ConfirmSignUpMessage,
} from '../pages/auth';
import { AuthStackParamList } from '~/@types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors.black,
      }}
    >
      <Stack.Screen name="UserAccessType" component={UserAccessType} />
      <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen
        name="UserAccessTypeSelect"
        component={UserAccessTypeSelect}
      />

      <Stack.Screen name="Forbidden" component={Forbidden} />

      <Stack.Screen name="EmailAddress" component={EmailAddress} />
      <Stack.Screen name="ValidateCodeEmail" component={ValidateCodeEmail} />
      <Stack.Screen
        name="ConfirmEmailMessage"
        component={ConfirmEmailMessage}
      />
      <Stack.Screen name="DocumentsForm" component={DocumentsForm} />
      <Stack.Screen name="NameForm" component={NameForm} />
      <Stack.Screen name="PasswordForm" component={PasswordForm} />
      <Stack.Screen
        name="ConfirmSignUpMessage"
        component={ConfirmSignUpMessage}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
