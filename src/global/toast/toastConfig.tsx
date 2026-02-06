import { View, Text } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';
import { colors, fonts } from '../styles';

type BaseToastProps = ToastConfigParams<unknown> & {
  backgroundColor: string;
  textColor?: string;
};

const BaseToast = ({
  text1,
  text2,
  backgroundColor,
  textColor = colors.white,
}: BaseToastProps) => (
  <View
    style={{
      width: '90%',
      padding: 16,
      borderRadius: 8,
      backgroundColor,
    }}
  >
    {text1 ? (
      <Text
        style={{
          color: textColor,
          fontFamily: fonts.Inter_800ExtraBold,
          fontSize: 16,
          marginBottom: text2 ? 4 : 0,
        }}
        numberOfLines={2}
      >
        {text1}
      </Text>
    ) : null}

    {text2 ? (
      <Text
        style={{
          color: textColor,
          fontSize: 14,
          fontFamily: fonts.Inter_400Regular,
        }}
        numberOfLines={2}
      >
        {text2}
      </Text>
    ) : null}
  </View>
);

const toastConfig = {
  success: (props: ToastConfigParams<unknown>) => (
    <BaseToast
      {...props}
      backgroundColor={colors.toast.success.background}
      textColor={colors.toast.success.text}
    />
  ),
  info: (props: ToastConfigParams<unknown>) => (
    <BaseToast
      {...props}
      backgroundColor={colors.toast.info.background}
      textColor={colors.toast.info.text}
    />
  ),
  error: (props: ToastConfigParams<unknown>) => (
    <BaseToast
      {...props}
      backgroundColor={colors.toast.error.background}
      textColor={colors.toast.error.text}
    />
  ),
};

export default toastConfig;
