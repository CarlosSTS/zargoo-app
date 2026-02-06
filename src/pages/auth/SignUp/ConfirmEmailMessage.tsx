import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import assets from '~/assets';
import { Button } from '~/components';

const ConfirmEmailMessage: React.FC = () => {
  const navigation = useNavigation();

  const navigateToDocumentsForm = useCallback(() => {
    navigation.navigate('DocumentsForm');
  }, [navigation]);

  return (
    <View style={[styles.container, { paddingHorizontal: 28 }]}>
      <Image source={assets.logo} style={styles.logo} />
      <Image source={assets.icons.check} style={styles.iconCheck} />
      <Text style={[styles.title, styles.titleEmail]}>
        E-mail confirmado com sucesso!
      </Text>
      <Text style={styles.description}>
        Agora precisamos saber um pouco mais sobre você.
      </Text>
      <Button
        title="Avançar"
        containerStyle={styles.bottomButtonNext}
        onPress={navigateToDocumentsForm}
      />
    </View>
  );
};

export default ConfirmEmailMessage;
