import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../global';
import { ClientTripsStackParamsList } from '~/@types';
import Trips from '../pages/app/client/Trips';

const Stack = createNativeStackNavigator<ClientTripsStackParamsList>();

const ClientTripsRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Trips"
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors.black,
      }}
    >
      <Stack.Screen name="Trips" component={Trips} />
    </Stack.Navigator>
  );
};

export default ClientTripsRoutes;
