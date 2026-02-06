import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../global';
import { ClientHomeStackParamsList } from '~/@types';
import Home from '../pages/app/client/Home';

const Stack = createNativeStackNavigator<ClientHomeStackParamsList>();

const ClientHomeRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors.black,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default ClientHomeRoutes;
