import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from '~/components';
import styles from './styles';

const TransferBalance: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Transferir Saldo</Text>

        <Button title="Confirmar Transferência" onPress={() => { }} />
      </View>
    </ScrollView>
  );
};

export default TransferBalance;
