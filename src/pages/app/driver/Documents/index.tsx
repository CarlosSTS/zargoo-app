import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';

const Documents: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Documentos</Text>
      </View>
    </ScrollView>
  );
};

export default Documents;
