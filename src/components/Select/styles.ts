import { StyleSheet } from 'react-native';
import { colors, fonts } from '~/global';

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    color: colors.black,
    fontFamily: fonts.Inter_500Medium,
    fontSize: 15,
    marginBottom: 6,
    marginTop: 12,
  },
  asterisk: {
    color: colors.danger,
  },
  labelError: {
    color: colors.danger,
  },

  container: {
    width: '100%',
    height: 47,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.text20,
    justifyContent: 'center',
  },
  containerError: {
    borderColor: colors.danger,
    borderWidth: 2,
  },

  pickerItem: {
    fontFamily: fonts.Inter_400Regular,
    fontSize: 14,
  },
  errorMessage: {
    alignSelf: 'flex-start',
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
    fontFamily: fonts.Inter_400Regular,
  },
});

export default styles;
