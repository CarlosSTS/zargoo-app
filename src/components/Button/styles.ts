import { StyleSheet } from 'react-native';
import { fonts, colors } from '~/global';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    width: '100%',
  },
  iconRight: {
    height: 16,
    resizeMode: 'contain',
    width: 16,
    marginLeft: 8,
  },

  iconLeft: {
    height: 16,
    resizeMode: 'contain',
    width: 16,
    marginRight: 8,
  },

  title: {
    color: colors.white,
    fontFamily: fonts.Inter_600SemiBold,
    fontSize: 14,
  },
});

export default styles;
