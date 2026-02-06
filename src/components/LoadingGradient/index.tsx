import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import styles from './styles';
import { colors as defaultColors } from '~/global/styles';

interface LoadingProps {
  size?: number;
  speed?: number;
  colors?: string[];
  barCount?: number;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export const LoadingGradient: React.FC<LoadingProps> = ({
  size = 40,
  speed = 1500,
  colors = defaultColors.gradient.colors,
  barCount = 12,
  containerStyle = {},
  wrapperStyle = {},
}) => {
  const animations = useRef(
    [...Array(barCount)].map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animate = (index: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animations[index], {
            toValue: 1,
            duration: speed / 2,
            useNativeDriver: true,
          }),
          Animated.timing(animations[index], {
            toValue: 0.2,
            duration: speed / 2,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animations.forEach((_, i) => {
      setTimeout(() => animate(i), (speed / barCount) * i); // delay escalonado
    });
  }, [animations, speed, barCount]);

  const barWidth = useMemo(() => size * 0.1, [size]);
  const barHeight = useMemo(() => size * 0.25, [size]);
  const radius = useMemo(() => size / 2, [size]);

  const bars = Array.from({ length: barCount }).map((_, i) => {
    const angle = (360 / barCount) * i;
    const colorIndex = Math.floor((i / barCount) * colors.length);
    const currentColor = colors[colorIndex];

    return (
      <Animated.View
        key={i}
        style={[
          styles.bar,
          {
            width: barWidth,
            height: barHeight,
            backgroundColor: currentColor,
            borderRadius: barWidth / 2,
            opacity: animations[i],
            transform: [
              { translateY: -radius + barHeight / 2 },
              { rotate: `${angle}deg` },
              { translateY: radius - barHeight / 2 },
            ],
          },
        ]}
      />
    );
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.loadingWrapper,
          wrapperStyle,
          {
            width: size,
            height: size,
          },
        ]}
      >
        {bars}
      </View>
    </View>
  );
};

export default LoadingGradient;
