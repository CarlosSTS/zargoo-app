import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';

const Home: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home do Cliente</Text>
      </View>
    </ScrollView>
  );
};

export default Home;
