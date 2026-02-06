import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { colors } from '~/global';
import styles from './styles';

interface ButtonProps extends PressableProps {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  iconRight?: ImageSourcePropType | undefined;
  iconLeft?: ImageSourcePropType | undefined;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  containerStyle,
  textStyle,
  iconRight,
  iconLeft,
  iconStyle,
  ...rest
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: rest.disabled ? colors.disabled : colors.primary,
        },
        containerStyle,
      ]}
      {...rest}
    >
      {iconLeft && (
        <Image
          source={iconLeft}
          style={[
            styles.iconLeft,
            {
              tintColor: rest.disabled ? colors.text10 : colors.white,
            },
            iconStyle,
          ]}
        />
      )}
      <Text
        style={[
          styles.title,
          {
            color: rest.disabled ? colors.text10 : styles.title.color,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
      {iconRight && (
        <Image
          source={iconRight}
          style={[
            styles.iconRight,
            {
              tintColor: rest.disabled ? colors.text10 : colors.white,
            },
            iconStyle,
          ]}
        />
      )}
    </Pressable>
  );
};

export default Button;
