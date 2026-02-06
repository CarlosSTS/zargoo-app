import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../global';
import { DriverHomeStackParamsList } from '~/@types';
import Home from '../pages/app/driver/Home';

const Stack = createNativeStackNavigator<DriverHomeStackParamsList>();

const DriverHomeRoutes: React.FC = () => {
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

export default DriverHomeRoutes;
