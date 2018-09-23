
import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 24,
    paddingTop: 5,
    justifyContent: 'space-between'
  },

  form: {
  },
  mainErrorText: {
    marginBottom: 5,
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.red
  },
  footer: {
    alignItems: 'center'
  },
  button: {
    // marginBottom: metrics.contentMargin,
    alignSelf: 'stretch'
  },
  mainText: {
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.gray100
  },
  registerButtonText: {
    color: colors.red
  }
})
