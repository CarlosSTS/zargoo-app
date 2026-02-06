import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '~/global';
import styles from './styles';

interface GradientLineProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const GradientLine: React.FC<GradientLineProps> = ({
  containerStyle,
}) => {
  const { gradient } = colors;

  return (
    <LinearGradient
      colors={gradient.colors}
      start={gradient.start}
      end={gradient.end}
      style={[styles.line, containerStyle]}
    />
  );
};

export default GradientLine;
