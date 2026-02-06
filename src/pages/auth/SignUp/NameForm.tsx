import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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
import { Button, Input, Select } from '~/components';
import { nameSchema } from './schemas';
import statesAndCities from './estados-cidades2.json';
import type { SelectRef } from '~/components/Select';
import { useSignUpFormStore } from './zustand/useSignUpFormStore';
import { NameFormData } from './interface/registerUser';

const states = Object.entries(statesAndCities.states)
  .map(([key, value]) => ({
    key,
    label: value as string,
    value: key,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const NameForm: React.FC = () => {
  const navigation = useNavigation();

  const { setSignUpData } = useSignUpFormStore();
  const lastNameRef = useRef<TextInput>(null);
  const stateSelectRef = useRef<SelectRef>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NameFormData>({
    defaultValues: {
      first_name: '',
      last_name: '',
      state: '',
      city: '',
    },
    resolver: yupResolver(nameSchema),
  });

  const first_name = watch('first_name');
  const last_name = watch('last_name');
  const state = watch('state');
  const city = watch('city');

  const cities = useMemo(() => {
    if (!state) return [];

    return statesAndCities.cities
      .filter((city) => city.state_id === Number(state))
      .map((city) => ({
        key: String(city.id),
        label: city.name,
        value: city.name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [state]);

  useEffect(() => {
    if (state && city) {
      const cityExists = cities.some((c) => c.value === city);
      if (!cityExists) {
        setValue('city', '');
      }
    }
  }, [state, city, cities, setValue]);

  const handleNavigateNext = useCallback(
    (data: NameFormData) => {
      setSignUpData({
        first_name: data.first_name,
        last_name: data.last_name,
        state: data.state,
        city: data.city,
      });
      navigation.navigate('PasswordForm');
    },
    [navigation, setSignUpData],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Como podemos te chamar?</Text>

          <Controller
            control={control}
            name="first_name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Primeiro Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => lastNameRef.current?.focus()}
                onChangeText={onChange}
                value={value}
                error={errors.first_name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="last_name"
            render={({ field: { onChange, value } }) => (
              <Input
                ref={lastNameRef}
                containerStyle={{ marginTop: 16 }}
                placeholder="Sobrenome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => stateSelectRef.current?.open()}
                onChangeText={onChange}
                value={value}
                error={errors.last_name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="state"
            render={({ field: { onChange, value } }) => (
              <Select
                ref={stateSelectRef}
                containerStyle={{ marginTop: 16 }}
                placeholder="Estado"
                items={states}
                selectedValue={value}
                onValueChange={onChange}
                error={errors.state?.message}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <Select
                containerStyle={{ marginTop: 16 }}
                placeholder={state ? 'Cidade' : 'Selecione um estado primeiro'}
                items={cities}
                selectedValue={value}
                onValueChange={onChange}
                error={errors.city?.message}
                isRequired
              />
            )}
          />

          <Button
            disabled={
              !!errors.first_name ||
              !!errors.last_name ||
              !!errors.state ||
              !!errors.city ||
              !first_name ||
              !last_name ||
              !state ||
              !city
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

export default NameForm;
