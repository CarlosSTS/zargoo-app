import { StyleSheet } from 'react-native';
import { fonts, colors } from '~/global';

const styles = StyleSheet.create({
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
  registerButtonText: {
    color: colors.text80,
  },
  registerText: {
    color: colors.text10,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 14,
    marginTop: 42,
  },
  welcomeText: {
    color: colors.text,
    fontFamily: fonts.Inter_700Bold,
    fontSize: 22,
    marginBottom: 47,
  },
});

export default styles;
