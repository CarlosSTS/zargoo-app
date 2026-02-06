import React, { useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';
import assets from '~/assets';
import { Button, Input } from '~/components';
import {
  requestCameraPermission,
  requestMediaLibraryPermission,
} from '~/utils';
import { documentsSchema } from './schemas';
import { DocumentsFormData } from './interface/registerUser';
import { useSignUpFormStore } from './zustand/useSignUpFormStore';

const DocumentsForm: React.FC = () => {
  const navigation = useNavigation();
  const { setSignUpData } = useSignUpFormStore();
  const handleInputRgRef = useRef<TextInput>(null);
  const handleInputCnhRef = useRef<TextInput>(null);
  const {
    clearErrors,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cpf: '',
      rg: '',
      cnh: '',
      cnh_img_url: '',
    },
    resolver: yupResolver(documentsSchema),
  });

  const cnh_img_url = watch('cnh_img_url');
  const cpf = watch('cpf');
  const rg = watch('rg');
  const cnh = watch('cnh');

  const handleNavigateToNameForm = useCallback(
    (data: DocumentsFormData) => {
      setSignUpData({
        cpf: data.cpf,
        rg: data.rg,
        cnh: data.cnh,
        cnh_img_url: data.cnh_img_url,
      });
      navigation.navigate('NameForm');
    },
    [navigation, setSignUpData],
  );

  const handleAttachPhoto = useCallback(async () => {
    Alert.alert('Anexar Imagem', 'Escolha uma opção:', [
      {
        text: 'Abrir câmera',
        onPress: async () => {
          const permission = await requestCameraPermission();
          if (!permission) {
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          });

          if (!result.canceled && result.assets[0]) {
            setValue('cnh_img_url', result.assets[0].uri);
            clearErrors('cnh_img_url');
          }
        },
      },
      {
        text: 'Escolher da Galeria',
        onPress: async () => {
          const permission = await requestMediaLibraryPermission();
          if (!permission) {
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          });

          if (!result.canceled && result.assets[0]) {
            setValue('cnh_img_url', result.assets[0].uri);
          }
        },
      },
      {
        text: cnh_img_url ? 'Remover' : 'Cancelar',
        onPress: () => {
          if (cnh_img_url) {
            setValue('cnh_img_url', '');
            clearErrors('cnh_img_url');
          }
        },
        style: 'destructive',
      },
    ]);
  }, [setValue, clearErrors, cnh_img_url]);

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
          <Text style={styles.title}>Nos informe seus documentos</Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                placeholder="CPF"
                returnKeyType="next"
                onChangeText={onChange}
                value={value}
                error={errors.cpf?.message}
                onSubmitEditing={() => handleInputRgRef.current?.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name="rg"
            render={({ field: { onChange, value } }) => (
              <Input
                ref={handleInputRgRef}
                containerStyle={styles.confirmPasswordInput}
                autoCorrect={false}
                autoCapitalize="characters"
                placeholder="RG"
                returnKeyType="next"
                onSubmitEditing={() => handleInputCnhRef.current?.focus()}
                onChangeText={onChange}
                value={value}
                error={errors.rg?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="cnh"
            render={({ field: { onChange, value } }) => (
              <Input
                ref={handleInputCnhRef}
                containerStyle={styles.confirmPasswordInput}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                placeholder="Número de registro da CNH"
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleNavigateToNameForm)}
                onChangeText={onChange}
                value={value}
                error={errors.cnh?.message}
              />
            )}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.cnhPhotoButton}
            onPress={handleAttachPhoto}
          >
            <Text style={styles.cnhPhotoButtonText}>Frente (CNH)</Text>
            <Image
              source={
                cnh_img_url ? { uri: cnh_img_url } : assets.icons.file_photo
              }
              style={cnh_img_url ? styles.imagePreview : styles.cnhPhotoIcon}
            />
          </TouchableOpacity>

          <Button
            disabled={
              Object.keys(errors).length > 0 ||
              !cpf ||
              !rg ||
              !cnh ||
              !cnh_img_url
            }
            containerStyle={styles.buttonContainer}
            title="Avançar"
            iconRight={assets.icons.arrow_right}
            onPress={handleSubmit(handleNavigateToNameForm)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DocumentsForm;
