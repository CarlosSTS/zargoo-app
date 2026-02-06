import { StyleSheet } from 'react-native';
import { fonts, colors } from '~/global';

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 24,
  },
  warnningIcon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 37,
    tintColor: colors.primary,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.Inter_700Bold,
    fontSize: 22,
    marginBottom: 40,
    textAlign: 'center',
  },
  description: {
    color: colors.text,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 16,
  },
  descriptionPrimary: {
    fontFamily: fonts.Inter_700Bold,
    color: colors.primary,
  },

  descriptionBold: {
    fontFamily: fonts.Inter_700Bold,
    color: colors.text,
  },

  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: colors.text,
  },

  roleButton: {
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.disabledDark,
    borderRadius: 5,
    height: 55,
    width: '100%',
    paddingHorizontal: 12,
  },

  roleButtonText: {
    flex: 1,
    marginLeft: 22,
    color: colors.text,
    fontFamily: fonts.Inter_600SemiBold,
    fontSize: 14,
  },
  roleButtonTextSmall: {
    fontSize: 12,
  },
  button: {
    marginTop: 36,
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.Inter_400Regular,
    fontSize: 14,
  },
  descriptionBoldButton: {
    fontFamily: fonts.Inter_700Bold,
  },
});

export default styles;
