import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import assets from '~/assets';
import { Button, Input } from '~/components';
import { validateCodeEmailSchema } from './schemas';

const ValidateCodeEmail: React.FC = () => {
  const codeInputRef2 = useRef<TextInput>(null);
  const codeInputRef3 = useRef<TextInput>(null);
  const codeInputRef4 = useRef<TextInput>(null);
  const codeInputRef5 = useRef<TextInput>(null);
  const codeInputRef6 = useRef<TextInput>(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: '',
    },
    resolver: yupResolver(validateCodeEmailSchema),
  });

  const code1 = watch('code1');
  const code2 = watch('code2');
  const code3 = watch('code3');
  const code4 = watch('code4');
  const code5 = watch('code5');
  const code6 = watch('code6');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsResendDisabled(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timeLeft]);

  const handleValidateToCode = useCallback(async () => {
    navigation.navigate('ConfirmEmailMessage');
  }, [navigation]);

  const handleSendCode = useCallback(() => {
    setTimeLeft(60);
    setIsResendDisabled(true);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const getButtonTitle = useCallback(() => {
    if (timeLeft > 0) {
      return `Reenviar código em ${formatTime(timeLeft)}`;
    }
    return 'Reenviar código';
  }, [timeLeft, formatTime]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Digite o código de confirmação</Text>

          <View style={styles.wrapperInputs}>
            <Controller
              control={control}
              name="code1"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="code"
                  maxLength={1}
                  keyboardType="numeric"
                  containerStyle={styles.containerInputStyle}
                  inputStyle={styles.inputStyle}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => codeInputRef2.current?.focus()}
                  error={errors.code1?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="code2"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="code"
                  maxLength={1}
                  keyboardType="numeric"
                  ref={codeInputRef2}
                  containerStyle={styles.containerInputStyle}
                  inputStyle={styles.inputStyle}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => codeInputRef3.current?.focus()}
                  error={errors.code2?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="code3"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="code"
                  maxLength={1}
                  keyboardType="numeric"
                  ref={codeInputRef3}
                  containerStyle={styles.containerInputStyle}
                  inputStyle={styles.inputStyle}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => codeInputRef4.current?.focus()}
                  error={errors.code3?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="code4"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="code"
                  maxLength={1}
                  keyboardType="numeric"
                  ref={codeInputRef4}
                  containerStyle={styles.containerInputStyle}
                  inputStyle={styles.inputStyle}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => codeInputRef5.current?.focus()}
                  error={errors.code4?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="code5"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="code"
                  maxLength={1}
                  keyboardType="numeric"
                  ref={codeInputRef5}
                  containerStyle={styles.containerInputStyle}
                  inputStyle={styles.inputStyle}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => codeInputRef6.current?.focus()}
                  error={errors.code5?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="code6"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="code"
                  maxLength={1}
                  keyboardType="numeric"
                  ref={codeInputRef6}
                  containerStyle={styles.containerInputStyle}
                  inputStyle={styles.inputStyle}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleValidateToCode)}
                  error={errors.code6?.message}
                />
              )}
            />
          </View>
          <Button
            containerStyle={styles.sendCodeButton}
            textStyle={styles.sendCodeButtonText}
            disabled={isResendDisabled}
            title={getButtonTitle()}
            onPress={handleSendCode}
          />
          <Button
            disabled={
              Object.keys(errors).length > 0 ||
              !code1 ||
              !code2 ||
              !code3 ||
              !code4 ||
              !code5 ||
              !code6
            }
            containerStyle={styles.buttonContainer}
            title="Avançar"
            iconRight={assets.icons.arrow_right}
            onPress={handleSubmit(handleValidateToCode)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ValidateCodeEmail;
