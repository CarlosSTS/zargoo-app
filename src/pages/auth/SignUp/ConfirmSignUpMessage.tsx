import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from '~/components';
import assets from '~/assets';
import styles from './styles';
import { useAuth } from '~/global/hooks';
import { useMe } from '~/global/store/auth';
import { useSignIn } from '../SignIn/store/useSignIn';
import { useSignUpFormStore } from './zustand/useSignUpFormStore';
import { useRegisterDriver } from './store/driver/useRegisterDriver';

const ConfirmSignUpMessage: React.FC = () => {
  const { mutateAsync: signInMutation, isPending } = useSignIn();
  const { setUserData } = useAuth();
  const { mutateAsync: meMutation, isPending: isMePending } = useMe();

  const { signUpData } = useSignUpFormStore();
  const { mutateAsync: registerDriverMutation, isPending: isRegistering } =
    useRegisterDriver();

  const completeSignUp = useCallback(async () => {
    const {
      email,
      cpf,
      rg,
      cnh,
      cnh_img_url,
      first_name,
      last_name,
      password,
      city,
      state,
      accessType,
    } = signUpData;

    if (!email) {
      Toast.show({
        type: 'info',
        text1: 'E-mail faltando',
        text2: 'Por favor, informe seu e-mail.',
      });
      return;
    }

    if (!password) {
      Toast.show({
        type: 'info',
        text1: 'Senha faltando',
        text2: 'Por favor, informe sua senha.',
      });
      return;
    }

    if (!accessType) {
      Toast.show({
        type: 'info',
        text1: 'Função do usuário faltando',
        text2: 'Por favor, selecione se você é motorista ou passageiro.',
      });
      return;
    }

    if (!first_name) {
      Toast.show({
        type: 'info',
        text1: 'Primeiro nome faltando',
        text2: 'Por favor, informe seu primeiro nome.',
      });
      return;
    }

    if (!last_name) {
      Toast.show({
        type: 'info',
        text1: 'Sobrenome faltando',
        text2: 'Por favor, informe seu sobrenome.',
      });
      return;
    }

    if (!state) {
      Toast.show({
        type: 'info',
        text1: 'Estado faltando',
        text2: 'Por favor, selecione seu estado.',
      });
      return;
    }

    if (!city) {
      Toast.show({
        type: 'info',
        text1: 'Cidade faltando',
        text2: 'Por favor, selecione sua cidade.',
      });
      return;
    }

    if (!cpf) {
      Toast.show({
        type: 'info',
        text1: 'CPF faltando',
        text2: 'Por favor, informe seu CPF.',
      });
      return;
    }

    if (!rg) {
      Toast.show({
        type: 'info',
        text1: 'RG faltando',
        text2: 'Por favor, informe seu RG.',
      });
      return;
    }

    if (!cnh) {
      Toast.show({
        type: 'info',
        text1: 'CNH faltando',
        text2: 'Por favor, informe sua CNH.',
      });
      return;
    }

    if (!cnh_img_url) {
      Toast.show({
        type: 'info',
        text1: 'Imagem da CNH faltando',
        text2: 'Por favor, anexe a foto da sua CNH.',
      });
      return;
    }

    const registrationData = {
      email: email,
      cpf: cpf,
      rg: rg,
      first_name: first_name,
      last_name: last_name,
      password: password,
      cnh: cnh,
      cnh_img_url: cnh_img_url,
      city: city,
      state: state,
    };

    await registerDriverMutation({
      payload: registrationData,
    });

    const { data: signInData } = await signInMutation({
      payload: {
        email,
        password,
        accessType: accessType,
      },
    });
    const { data: meData } = await meMutation();

    await setUserData({
      accessToken: signInData.accessToken,
      refreshToken: signInData.refreshToken,
      user: meData,
    });
  }, [
    signUpData,
    registerDriverMutation,
    signInMutation,
    meMutation,
    setUserData,
  ]);

  const navigateToDocuments = useCallback(async () => { }, []);

  const isDisabled = isPending || isRegistering || isMePending;
  return (
    <View style={[styles.container, { paddingHorizontal: 28 }]}>
      <Image source={assets.logo} style={styles.logo} />
      <Image source={assets.icons.check} style={styles.iconCheck} />
      <Text style={[styles.title, styles.titleEmail]}>
        Tudo certo! Seu cadastro foi concluído com sucesso.
      </Text>
      <Text style={styles.description}>
        Se preferir, podemos registrar seu veículo agora mesmo.
      </Text>
      <Button
        disabled={isDisabled}
        title={isDisabled ? 'Aguarde ...' : 'Cadastrar Veículo'}
        containerStyle={[styles.bottomButtonNext, { bottom: 116 }]}
        onPress={navigateToDocuments}
      />
      <Button
        disabled={isDisabled}
        title={isDisabled ? 'Aguarde ...' : 'Mais tarde'}
        containerStyle={[styles.bottomButtonNext, styles.laterButtonContainer]}
        textStyle={styles.laterButtonText}
        onPress={completeSignUp}
      />
    </View>
  );
};

export default ConfirmSignUpMessage;
