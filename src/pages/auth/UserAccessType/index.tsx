import React, { useCallback } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';
import assets from '~/assets';
import { colors, defaultValues } from '~/global';
import styles from './styles';

const UserAccessType: React.FC = () => {
  const navigation = useNavigation();

  const navigateToUserAccessTypeSelect = useCallback(() => {
    navigation.navigate('UserAccessTypeSelect');
  }, [navigation]);

  const handleSelectDriver = useCallback(() => {
    navigation.navigate('SignIn', { role: defaultValues.USER_TYPE.DRIVER });
  }, [navigation]);

  const handleSelectClient = useCallback(() => {
    navigation.navigate('SignIn', { role: defaultValues.USER_TYPE.CLIENT });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <View>
              <Text style={styles.welcomeText}>Como você deseja acessar?</Text>
              <Text style={styles.subtitleText}>
                Escolha o tipo de acesso para continuar
              </Text>
            </View>

            <View style={styles.buttonsContainer}>
              <LinearGradient
                colors={colors.gradienteUserTypeButtonDriver.colors}
                start={colors.gradienteUserTypeButtonDriver.start}
                end={colors.gradienteUserTypeButtonDriver.end}
                style={styles.gradientButton}
              >
                <RectButton
                  activeOpacity={0.9}
                  style={styles.userTypeButton}
                  onPress={handleSelectDriver}
                >
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitle}>
                      Entrar como Motorista
                    </Text>
                    <Text style={styles.buttonDescription}>
                      Aceite corridas, gerencie seus{'\n'}ganhos e acompanhe
                      rotas.
                    </Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    <Image
                      style={styles.arrow}
                      source={assets.icons.chevron_right}
                    />
                  </View>
                </RectButton>
              </LinearGradient>

              <LinearGradient
                colors={colors.gradienteUserTypeButtonClient.colors}
                start={colors.gradienteUserTypeButtonClient.start}
                end={colors.gradienteUserTypeButtonClient.end}
                style={styles.gradientButton}
              >
                <RectButton
                  activeOpacity={0.9}
                  style={styles.userTypeButton}
                  onPress={handleSelectClient}
                >
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitle}>Entrar como Cliente</Text>
                    <Text style={styles.buttonDescription}>
                      Viaje com praticidade e segurança.
                    </Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    <Image
                      style={styles.arrow}
                      source={assets.icons.chevron_right}
                    />
                  </View>
                </RectButton>
              </LinearGradient>
            </View>

            <View style={styles.divider} />
            <Text style={styles.registerText}>
              Não tem conta?{' '}
              <Text
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
  );
};

export default UserAccessType;
