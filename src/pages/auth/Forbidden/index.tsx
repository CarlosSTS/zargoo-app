import React, { useCallback, useMemo } from 'react';
import { Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import assets from '~/assets';
import styles from './styles';
import { useAuth } from '~/global/hooks';
import { getUserScope } from '~/utils';
import { AuthStackParamList } from '~/@types';

const Forbidden: React.FC = () => {
  const navigation = useNavigation();

  const { email, expectedRole, meData, accessToken, refreshToken } = useRoute()
    .params as AuthStackParamList['Forbidden'];
  const { setUserData } = useAuth();

  const navigateToUserAccessTypeSelect = useCallback(() => {
    navigation.navigate('UserAccessTypeSelect');
  }, [navigation]);

  const getUserType = useMemo(() => {
    return getUserScope({ role: expectedRole });
  }, [expectedRole]);

  const getActualUserType = useMemo(() => {
    return getUserScope({ role: meData.session_scope });
  }, [meData.session_scope]);

  const handleSignIn = useCallback(async () => {
    await setUserData({
      accessToken,
      refreshToken,
      user: meData,
    });
  }, [setUserData, accessToken, refreshToken, meData.session_scope]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Image source={assets.icons.warnning} style={styles.warnningIcon} />

        <Text style={styles.title}>Acesso Indisponível</Text>
        <Text style={[styles.description, { marginBottom: 27 }]}>
          Você ainda não possui acesso como {'\n'}
          <Text style={styles.descriptionPrimary}>{getUserType}</Text>
        </Text>

        <Text style={[styles.description, { marginBottom: 72 }]}>
          Mas não se preocupe, você pode realizar o{' '}
          <Text style={styles.descriptionBold}>cadastro</Text> ou acessar com{' '}
          <Text style={styles.descriptionBold}>outro perfil</Text>
        </Text>

        <TouchableOpacity
          style={styles.roleButton}
          activeOpacity={0.9}
          onPress={handleSignIn}
        >
          <Image source={assets.icons.profile_full} style={styles.icon} />
          <Text style={styles.roleButtonText}>
            {getActualUserType}
            {'\n'}
            <Text
              style={[styles.descriptionBoldButton, styles.roleButtonTextSmall]}
            >
              {email}
            </Text>
          </Text>
          <Image source={assets.icons.chevron_right} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToUserAccessTypeSelect}
          style={styles.button}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>
            Realizar Cadastro como{' '}
            <Text style={styles.descriptionBoldButton}>{getUserType}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Forbidden;
