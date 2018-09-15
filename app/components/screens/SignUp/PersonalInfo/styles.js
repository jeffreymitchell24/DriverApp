import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginMiddle,
    paddingBottom: 32,
    paddingTop: 0,
    justifyContent: 'space-between'
  },

  form: {
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footer: {
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
  }
})
