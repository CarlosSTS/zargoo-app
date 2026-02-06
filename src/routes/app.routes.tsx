import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamsList } from '~/@types';
import { useAuth } from '~/global/hooks/useAuth';
import ClientRoutes from './client.tabs.routes';
import DriverRoutes from './driver.tabs.routes';
import NotFound from '~/pages/NotFound';

const Stack = createNativeStackNavigator<AppStackParamsList>();

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user?.session_scope === 'CLIENT' && (
        <Stack.Screen name="ClientTabs" component={ClientRoutes} />
      )}

      {user?.session_scope === 'DRIVER' && (
        <Stack.Screen name="DriverTabs" component={DriverRoutes} />
      )}
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
