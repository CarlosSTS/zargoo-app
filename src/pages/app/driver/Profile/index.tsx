import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '~/components';
import styles from './styles';

const Profile: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToTransferBalance = () => {
    navigation.navigate('TransferBalance');
  };

  const handleNavigateToMyVehicles = () => {
    navigation.navigate('MyVehicles');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Perfil</Text>

        <Button
          title="Transferir Saldo"
          onPress={handleNavigateToTransferBalance}
        />

        <Button
          title="Meus Veículos"
          onPress={handleNavigateToMyVehicles}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
