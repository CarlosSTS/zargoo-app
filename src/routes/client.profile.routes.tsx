import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../global';
import { ClientProfileStackParamsList } from '~/@types';
import Profile from '../pages/app/client/Profile';

const Stack = createNativeStackNavigator<ClientProfileStackParamsList>();

const ClientProfileRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors.black,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ClientProfileRoutes;
