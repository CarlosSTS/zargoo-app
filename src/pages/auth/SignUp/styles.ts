import { StyleSheet } from 'react-native';
import { fonts, colors } from '~/global';

const styles = StyleSheet.create({
  bottomButtonNext: {
    alignSelf: 'center',
    bottom: 60,
    position: 'absolute',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    height: 36,
    justifyContent: 'space-evenly',
    marginTop: 87,
    width: 124,
  },
  checkbox: {
    alignItems: 'center',
    borderWidth: 1,
    height: 20,
    justifyContent: 'center',
    marginRight: 12,
    width: 20,
  },
  checkboxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 24,
  },
  checkboxText: {
    flex: 1,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 10,
  },
  cnhPhotoButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderRadius: 5,
    borderWidth: 1,
    height: 160,
    marginTop: 16,
  },
  cnhPhotoButtonText: {
    color: colors.text10,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 18,
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'center',
  },
  cnhPhotoIcon: {
    height: 74,
    width: 74,
  },
  confirmPasswordInput: {
    marginTop: 16,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 16,
  },
  containerInputStyle: {
    alignItems: 'center',
    backgroundColor: colors.disabled,
    borderRadius: 5,
    height: 47,
    justifyContent: 'center',
    width: 47,
  },
  description: {
    color: colors.text10,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 16,
    textAlign: 'center',
  },
  iconCheck: {
    alignSelf: 'center',
    height: 42,
    marginBottom: 68,
    marginTop: 80,
    width: 57,
  },
  imagePreview: {
    height: 112,
    width: '100%',
  },
  inputStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
  laterButtonContainer: {
    backgroundColor: colors.disabled,
  },
  laterButtonText: {
    color: colors.text,
    fontFamily: fonts.Inter_400Regular,
  },
  logo: {
    alignSelf: 'center',
    height: 80,
    width: 290,
  },
  passwordDescription: {
    color: colors.text,
    fontFamily: fonts.Inter_500Medium,
    fontSize: 16,
    marginBottom: 32,
  },
  sendCodeButton: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    height: 36,
    marginTop: 76,
    width: 211,
  },
  sendCodeButtonText: {
    fontFamily: fonts.Inter_400Regular,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.Inter_700Bold,
    fontSize: 22,
    marginBottom: 45,
  },
  titleEmail: {
    marginBottom: 26,
    textAlign: 'center',
  },
  titleWithSmallMargin: {
    color: colors.text,
    fontFamily: fonts.Inter_700Bold,
    fontSize: 22,
    marginBottom: 16,
  },
  validationContainer: {
    marginVertical: 16,
  },
  validationIconText: {
    fontSize: 10,
  },
  wrapperInputs: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionCard: {
    backgroundColor: colors.disabledDark,
    borderRadius: 5,
    paddingVertical: 20,
    paddingRight: 16,
    marginBottom: 20,
  },
  optionCardSelected: {
    backgroundColor: colors.success,
  },
  optionCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  optionIcon: {
    height: 90,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    color: colors.text,
    fontFamily: fonts.Inter_600SemiBold,
    fontSize: 18,
    marginBottom: 8,
  },
  optionTitleSelected: {
    color: colors.white,
  },
  optionDescription: {
    color: colors.text,
    fontFamily: fonts.Inter_600SemiBold,
    fontSize: 12,
  },
  optionDescriptionSelected: {
    color: colors.white,
  },
});

export default styles;
