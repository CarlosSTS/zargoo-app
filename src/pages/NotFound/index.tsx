import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';
import { Button } from '~/components';
import { useAuth } from '~/global/hooks/';
import assets from '~/assets';

const NotFound: React.FC = () => {
  const { signOut } = useAuth();

  const navigateToHome = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return (
    <View style={styles.container}>
      <Image source={assets.logo} style={styles.logo} />
      <Text style={styles.title}>404</Text>
      <Text style={styles.text}>Página não encontrada.</Text>
      <Button title="Ir para o início" onPress={navigateToHome} />
    </View>
  );
};

export default NotFound;
