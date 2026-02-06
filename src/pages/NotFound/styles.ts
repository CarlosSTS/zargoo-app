import { StyleSheet } from 'react-native';
import { colors, fonts } from '~/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 40,
  },
  logo: {
    height: 80,
    width: 290,
  },

  title: {
    color: colors.text,
    fontFamily: fonts.Inter_700Bold,
    fontSize: 48,
    marginTop: 40,
  },

  text: {
    color: colors.text10,
    fontFamily: fonts.Inter_600SemiBold,
    fontSize: 14,
    marginBottom: 40,
  },
});

export default styles;
