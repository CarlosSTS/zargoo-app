import { StyleSheet } from 'react-native';
import { fonts, colors } from '~/global';

const styles = StyleSheet.create({
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  arrow: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
  buttonDescription: {
    color: colors.white,
    fontFamily: fonts.Inter_600SemiBold,
    fontSize: 12,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: fonts.Inter_600SemiBold,
    fontSize: 16,
    marginBottom: 12,
  },
  buttonsContainer: {
    gap: 16,
    width: '100%',
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  flex: {
    flex: 1,
  },
  gradientButton: {
    borderRadius: 5,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.text10,
    marginVertical: 32,
  },
  registerButtonText: {
    color: colors.text80,
  },
  registerText: {
    color: colors.text10,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 14,
    marginTop: 42,
  },
  scrollContent: {
    flexGrow: 1,
  },
  subtitleText: {
    color: colors.text,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 16,
    marginBottom: 64,
    marginTop: 20,
    textAlign: 'center',
  },
  userTypeButton: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  welcomeText: {
    color: colors.text,
    fontFamily: fonts.Inter_700Bold,
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default styles;
