import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 5,
    position: 'relative'
  },
  formContainer: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    flexGrow: 1
  },

  form: {
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footer: {
    // position: 'absolute',
    // bottom: 32,
    marginTop: 15,
    alignItems: 'center'
  },
  button: {
    alignSelf: 'stretch'
  },
  mainText: {
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.gray100
  },
  signInButtonText: {
    color: colors.red
  },
  // TextInputView

  inputContainer: {
    marginBottom: 16
  },
  label: {
    fontFamily: 'SFProText-Regular',
    color: colors.gray200,
    fontSize: 12
  }
})

export const googleStyles = StyleSheet.create({
  locationItem: {
    marginBottom: 12
  },
  container: {
    // maxHeight: 100,
    elevation: 3,
    backgroundColor: colors.white,
    marginHorizontal: 2,
    paddingTop: 12,
    paddingHorizontal: 16,
    marginBottom: 16
    // borderWidth: 2,
    // borderColor: colors.red
  },
  contentContainerStyle: {
    backgroundColor: colors.white
  }
})
