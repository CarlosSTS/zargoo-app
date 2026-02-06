import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { colors } from '../../global';

interface PasswordValidationIndicatorProps {
  isValid: boolean;
  text: string;
}

const PasswordValidationIndicator: React.FC<
  PasswordValidationIndicatorProps
> = ({ isValid, text }) => (
  <View style={styles.container}>
    <View
      style={[
        styles.icon,
        { backgroundColor: isValid ? colors.success : colors.danger },
      ]}
    >
      <Text style={styles.iconText}>{isValid ? '✓' : 'X'}</Text>
    </View>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default PasswordValidationIndicator;
