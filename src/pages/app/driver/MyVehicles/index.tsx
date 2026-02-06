import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from '~/components';
import styles from './styles';

const MyVehicles: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Meus Veículos</Text>

        <Button title="Adicionar Veículo" onPress={() => { }} />
      </View>
    </ScrollView>
  );
};

export default MyVehicles;
