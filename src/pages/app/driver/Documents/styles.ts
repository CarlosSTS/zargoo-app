import { StyleSheet } from 'react-native';
import { colors, fonts } from '~/global/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.Inter_700Bold,
    color: colors.black,
    marginBottom: 20,
  },
});

export default styles;
