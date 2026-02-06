import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { fonts, colors } from '~/global';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

type InputType = 'code' | 'default';

interface InputProps extends TextInputProps {
  label?: string;
  iconRight?: ImageSourcePropType | undefined;
  iconRightOnPress?: ((pointerInside: boolean) => void) | undefined;
  error?: string | undefined;
  ref?: React.Ref<TextInput>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  value?: string;
  type?: InputType;
}
interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {
    label,
    iconRight,
    iconRightOnPress,
    error,
    value,
    containerStyle,
    inputStyle,
    type,
    ...rest
  },
  ref,
) => {
  const inputElementRef = useRef<TextInput>(null);

  const [handleInputFocus, setHandleInputFocus] = useState(false);

  const onFocus = useCallback(() => {
    setHandleInputFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setHandleInputFocus(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputElementRef.current?.focus();
    },
    clear: () => {
      inputElementRef.current?.clear();
    },
  }));

  const containerStyleDynamic = useMemo(() => {
    if (type === 'code') {
      return error
        ? styles.inputBlurCodeError
        : handleInputFocus
          ? styles.inputFocusCode
          : styles.inputBlurCode;
    }
    return {
      borderColor: error
        ? colors.danger
        : value || handleInputFocus
          ? colors.text
          : colors.text20,
    };
  }, [type, handleInputFocus, error, value]);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, containerStyleDynamic, containerStyle]}>
        <TextInput
          ref={inputElementRef}
          style={[
            styles.input,
            {
              fontFamily: value
                ? fonts.Inter_600SemiBold
                : fonts.Inter_400Regular,
            },
            inputStyle,
          ]}
          placeholderTextColor={colors.text10}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
        {iconRight && iconRightOnPress && (
          <RectButton
            style={styles.iconRightContainer}
            onPress={iconRightOnPress}
          >
            <Image source={iconRight} style={styles.iconRight} />
          </RectButton>
        )}
      </View>

      {error && type !== 'code' && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export default forwardRef(Input);
