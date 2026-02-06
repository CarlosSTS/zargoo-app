import React, { useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '~/components';
import styles from './styles';
import assets from '~/assets';
import { useSignUpFormStore } from './zustand/useSignUpFormStore';
import { defaultValues } from '~/global';

const UserAccessTypeSelect: React.FC = () => {
  const { signUpData, setSignUpData } = useSignUpFormStore();
  const navigation = useNavigation();

  const handleSelectDriver = useCallback(() => {
    setSignUpData({
      accessType: defaultValues.USER_TYPE.DRIVER,
    });
  }, [setSignUpData]);

  const handleSelectPassenger = useCallback(() => {
    setSignUpData({
      accessType: defaultValues.USER_TYPE.CLIENT,
    });
  }, [setSignUpData]);

  const handleNavigateNext = useCallback(() => {
    navigation.navigate('EmailAddress');
  }, [navigation]);

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
          <Text style={styles.title}>
            Para continuar seu cadastro, informe como deseja utilizar o
            aplicativo.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.optionCard,
              signUpData.accessType === defaultValues.USER_TYPE.CLIENT &&
              styles.optionCardSelected,
            ]}
            onPress={handleSelectPassenger}
          >
            <View style={styles.optionCardContent}>
              <Image
                source={assets.icons.black_car_right}
                style={styles.optionIcon}
              />
              <View style={styles.optionTextContainer}>
                <Text
                  style={[
                    styles.optionTitle,
                    signUpData.accessType === defaultValues.USER_TYPE.CLIENT &&
                    styles.optionTitleSelected,
                  ]}
                >
                  Quero viajar
                </Text>
                <Text
                  style={[
                    styles.optionDescription,
                    signUpData.accessType === defaultValues.USER_TYPE.CLIENT &&
                    styles.optionDescriptionSelected,
                  ]}
                >
                  Solicite corridas, acompanhe o trajeto em tempo real e
                  encontre motoristas próximos.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.optionCard,
              signUpData.accessType === defaultValues.USER_TYPE.DRIVER &&
              styles.optionCardSelected,
            ]}
            onPress={handleSelectDriver}
          >
            <View style={styles.optionCardContent}>
              <Image source={assets.icons.driver} style={styles.optionIcon} />
              <View style={styles.optionTextContainer}>
                <Text
                  style={[
                    styles.optionTitle,
                    signUpData.accessType === defaultValues.USER_TYPE.DRIVER &&
                    styles.optionTitleSelected,
                  ]}
                >
                  Quero dirigir
                </Text>
                <Text
                  style={[
                    styles.optionDescription,
                    signUpData.accessType === defaultValues.USER_TYPE.DRIVER &&
                    styles.optionDescriptionSelected,
                  ]}
                >
                  Cadastre seu veículo, acesse categorias disponíveis e comece a
                  receber solicitações de corrida.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <Button
            disabled={!signUpData.accessType}
            containerStyle={styles.buttonContainer}
            title="Seguinte"
            iconRight={assets.icons.arrow_right}
            onPress={handleNavigateNext}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserAccessTypeSelect;
