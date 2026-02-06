import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../global';
import { DriverDocumentsStackParamsList } from '~/@types';
import Documents from '../pages/app/driver/Documents';

const Stack = createNativeStackNavigator<DriverDocumentsStackParamsList>();

const DriverDocumentsRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Documents"
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors.black,
      }}
    >
      <Stack.Screen name="Documents" component={Documents} />
    </Stack.Navigator>
  );
};

export default DriverDocumentsRoutes;
