import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import assets from '~/assets';
import { Button, Input } from '~/components';
import { emailAddressSchema } from './schemas';
import { useSendConfirmationEmail } from './store/driver/sendConfirmationEmail';
import { useSignUpFormStore } from './zustand/useSignUpFormStore';

const EmailAddress: React.FC = () => {
  const navigation = useNavigation();
  const { setSignUpData } = useSignUpFormStore();
  const { mutateAsync: sendConfirmationEmail, isPending } =
    useSendConfirmationEmail();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(emailAddressSchema),
  });

  const email = watch('email');
  const handleNavigateToValidateCodeEmail = useCallback(
    async (data: { email: string }) => {
      setSignUpData({ email: data.email });
      // await sendConfirmationEmail({ payload: { email: data.email } });
      navigation.navigate('ValidateCodeEmail');
    },
    [sendConfirmationEmail, setSignUpData, navigation],
  );

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
          <Text style={styles.title}>Qual é o seu endereço de e- mail?</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="nome@exemplo.com"
                returnKeyType="send"
                onSubmitEditing={handleSubmit(
                  handleNavigateToValidateCodeEmail,
                )}
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
                editable={!isPending}
              />
            )}
          />
          <Button
            disabled={!!errors.email || !email || isPending}
            containerStyle={styles.buttonContainer}
            title={isPending ? 'Aguarde...' : 'Avançar'}
            iconRight={assets.icons.arrow_right}
            onPress={handleSubmit(handleNavigateToValidateCodeEmail)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EmailAddress;
