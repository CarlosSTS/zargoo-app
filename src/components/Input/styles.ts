import { StyleSheet } from 'react-native';
import { fonts, colors } from '~/global';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    borderColor: colors.text,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    width: '100%',
  },
  error: {
    alignSelf: 'flex-start',
    color: colors.danger,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 12,
    marginTop: 4,
  },
  iconRight: {
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.text,
    width: 20,
  },
  iconRightContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
  },
  input: {
    color: colors.text,
    fontSize: 14,
    height: 47,
    paddingHorizontal: 12,
    width: '100%',
  },
  inputBlurCode: {
    borderWidth: 0,
  },
  inputBlurCodeError: {
    borderColor: colors.danger,
  },
  inputFocusCode: {
    backgroundColor: colors.white,
    borderWidth: 1,
    color: colors.text20,
  },
  label: {
    alignSelf: 'flex-start',
    color: colors.text,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 12,
    marginVertical: 8,
  },
});

export default styles;
