import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LoadingGradient } from '../components';
// import { useAuth } from '../hooks';
// import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import styles from './styles';

const Routes: React.FC = () => {
  // const { user, isLoading } = useAuth();
  const user = null;
  const isLoading = false;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingGradient />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <AuthRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
