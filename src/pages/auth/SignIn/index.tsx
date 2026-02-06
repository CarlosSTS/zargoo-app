import React, { useCallback, useRef, useState } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Input, GradientLine } from '~/components';
import assets from '~/assets';
import styles from './styles';
import { useAuth } from '~/global/hooks';
import { useSignIn } from './store/useSignIn';
import { useMe } from '~/global/store/auth';

import signInSchema from './schema';
import { AuthStackParamList } from '~/@types';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { mutateAsync: signInMutation, isPending: isSignInPending } =
    useSignIn();
  const { mutateAsync: meMutation, isPending: isMePending } = useMe();
  const { accessType } = useRoute().params as AuthStackParamList['SignIn'];
  const passwordInputRef = useRef<TextInput>(null);

  const [showPassword, setShowPassword] = useState(false);
  const { setUserData } = useAuth();

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword((state) => !state);
  }, []);

  const navigateToUserAccessTypeSelect = useCallback(() => {
    navigation.navigate('UserAccessTypeSelect');
  }, [navigation]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'jmarcelodeus98@gmail.com',
      password: '@StrongPass987',
    },
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      let signInResponse = await signInMutation({
        payload: {
          email: data.email,
          password: data.password,
          accessType: accessType,
        },
      });

      let signInData = signInResponse.data;
      let usedRole = accessType;

      if (
        signInData.message?.includes('Usuário não possui permissão de acesso')
      ) {
        usedRole = accessType === 'DRIVER' ? 'CLIENT' : 'DRIVER';

        signInResponse = await signInMutation({
          payload: {
            email: data.email,
            password: data.password,
            accessType: usedRole,
          },
        });

        signInData = signInResponse.data;
      }

      const { data: meData } = await meMutation();

      if (meData.session_scope !== accessType) {
        navigation.navigate('Forbidden', {
          email: data.email,
          expectedRole: accessType,
          meData,
          accessToken: signInData.accessToken,
          refreshToken: signInData.refreshToken,
        });
        return;
      }

      await setUserData({
        accessToken: signInData.accessToken,
        refreshToken: signInData.refreshToken,
        user: meData,
      });
    },
    [setUserData, meMutation, navigation, signInMutation, accessType],
  );

  return (
    <>
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
            <GradientLine containerStyle={{ marginTop: 36 }} />
            <View style={styles.content}>
              <View>
                <Text style={styles.welcomeText}>Seja bem vindo!</Text>
              </View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Email"
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Email.example@gmail.com"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    onChangeText={onChange}
                    value={value}
                    error={errors.email?.message}
                    maxLength={80}
                    editable={!isSignInPending && !isMePending}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    ref={passwordInputRef}
                    autoCorrect={false}
                    autoCapitalize="none"
                    label="Senha"
                    placeholder="••••••••••••••••"
                    secureTextEntry={!showPassword}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(handleSignIn)}
                    onChangeText={onChange}
                    value={value}
                    error={errors.password?.message}
                    iconRight={
                      showPassword ? assets.icons.eye : assets.icons.eye_off
                    }
                    iconRightOnPress={handleTogglePasswordVisibility}
                    editable={!isSignInPending && !isMePending}
                    maxLength={40}
                  />
                )}
              />
              <Button
                title={
                  isSignInPending || isMePending ? 'Autenticando...' : 'Login'
                }
                disabled={isSignInPending || isMePending}
                onPress={handleSubmit(handleSignIn)}
                containerStyle={{ marginTop: 32 }}
              />

              <Text style={styles.registerText}>
                Não tem conta? &nbsp;
                <Text
                  disabled={isSignInPending || isMePending}
                  style={styles.registerButtonText}
                  onPress={navigateToUserAccessTypeSelect}
                >
                  Cadastre-se
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
