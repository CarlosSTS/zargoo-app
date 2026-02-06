import React, { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import assets from '~/assets';
import { Button, Input, PasswordValidationIndicator } from '~/components';
import { colors } from '~/global';
import { passwordSchema } from './schemas';
import { PasswordFormData } from './interface/registerDriver';
import { useSignUpFormStore } from './zustand/useSignUpFormStore';

const PasswordForm: React.FC = () => {
  const navigation = useNavigation();
  const { setSignUpData, signUpData } = useSignUpFormStore();
  const confirmPasswordRef = useRef<TextInput>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    resolver: yupResolver(passwordSchema),
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const acceptTerms = watch('acceptTerms');

  const hasMinLength = password.length >= 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch =
    !!password && !!confirmPassword && password === confirmPassword;

  const handleNavigateNext = useCallback(
    async (data: PasswordFormData) => {
      try {
        setSignUpData({ password: data.password });
        navigation.navigate('ConfirmSignUpMessage');
      } catch (err) {
        console.log(err);
      }
    },
    [navigation, setSignUpData],
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

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
          <Text style={styles.titleWithSmallMargin}>
            Olá, {signUpData.first_name}
          </Text>
          <Text style={styles.passwordDescription}>
            Quase concluído! Agora crie sua senha de acesso.
          </Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry={!showPassword}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="•••••"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                onChangeText={onChange}
                value={value}
                iconRight={assets.icons.eye}
                iconRightOnPress={togglePasswordVisibility}
              />
            )}
          />

          <View style={styles.validationContainer}>
            <PasswordValidationIndicator
              isValid={hasMinLength}
              text="No mínimo 8 caracteres"
            />
            <PasswordValidationIndicator
              isValid={hasLowerCase && hasUpperCase}
              text="Deve conter letras maiúsculas e minúsculas"
            />
            <PasswordValidationIndicator
              isValid={hasNumber}
              text="Deve conter ao menos um número"
            />
            <PasswordValidationIndicator
              isValid={hasSpecialChar}
              text="Deve conter ao menos um caractere especial"
            />
            <PasswordValidationIndicator
              isValid={passwordsMatch}
              text="As senhas devem ser iguais"
            />
          </View>

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                containerStyle={styles.confirmPasswordInput}
                ref={confirmPasswordRef}
                secureTextEntry={!showConfirmPassword}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Confirme sua senha"
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleNavigateNext)}
                onChangeText={onChange}
                value={value}
                iconRight={assets.icons.eye}
                iconRightOnPress={toggleConfirmPasswordVisibility}
              />
            )}
          />

          <Controller
            control={control}
            name="acceptTerms"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.checkboxContainer}
                onPress={() => onChange(!value)}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: value ? colors.primary : colors.text20,
                      backgroundColor: value
                        ? colors.primary
                        : colors.background,
                    },
                  ]}
                >
                  {value && (
                    <Text
                      style={[
                        styles.validationIconText,
                        { color: colors.white },
                      ]}
                    >
                      ✓
                    </Text>
                  )}
                </View>
                <Text style={[styles.checkboxText, { color: colors.text }]}>
                  Declaro que li e estou de acordo com os{' '}
                  <Text style={{ color: colors.link }}>Termos de Uso</Text> e{' '}
                  <Text style={{ color: colors.link }}>
                    Política de Privacidade
                  </Text>
                </Text>
              </TouchableOpacity>
            )}
          />

          <Button
            disabled={
              !!errors.password ||
              !!errors.confirmPassword ||
              !!errors.acceptTerms ||
              !password ||
              !confirmPassword ||
              !acceptTerms
            }
            containerStyle={styles.buttonContainer}
            title="Avançar"
            iconRight={assets.icons.arrow_right}
            onPress={handleSubmit(handleNavigateNext)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordForm;
