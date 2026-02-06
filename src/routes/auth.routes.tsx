import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../global/styles';
import { SelectUserType, SignIn, Forbidden } from '../pages/auth';
// import {
//   TravelOrDrive,
//   EmailAddress,
//   ValidateCodeEmail,
//   ConfirmEmailMessage,
//   DocumentsForm,
//   NameForm,
//   PasswordForm,
//   ConfirmSignUpMessage,
// } from '../pages/SignUp';

const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="SelectUserType" component={SelectUserType} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Forbidden" component={Forbidden} />
      {/* 
      <Stack.Screen name="TravelOrDrive" component={TravelOrDrive} />
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
      /> */}
    </Stack.Navigator>
  );
};

export default AuthRoutes;
