import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../global';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  icon: {
    alignItems: 'center',
    borderRadius: 8,
    height: 16,
    justifyContent: 'center',
    marginRight: 8,
    width: 16,
  },
  iconText: {
    color: colors.white,
    fontSize: 10,
  },
  text: {
    color: colors.text,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 12,
  },
});

export default styles;
