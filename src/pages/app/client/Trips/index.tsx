import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';

const Trips: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Minhas Viagens</Text>
      </View>
    </ScrollView>
  );
};

export default Trips;
