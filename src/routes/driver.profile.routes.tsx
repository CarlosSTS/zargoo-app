import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../global';
import { DriverProfileStackParamsList } from '~/@types';
import MyVehicles from '../pages/app/driver/MyVehicles';
import Profile from '../pages/app/driver/Profile';
import TransferBalance from '../pages/app/driver/TransferBalance';

const Stack = createNativeStackNavigator<DriverProfileStackParamsList>();

const DriverProfileRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors.black,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TransferBalance" component={TransferBalance} />
      <Stack.Screen name="MyVehicles" component={MyVehicles} />
    </Stack.Navigator>
  );
};

export default DriverProfileRoutes;
