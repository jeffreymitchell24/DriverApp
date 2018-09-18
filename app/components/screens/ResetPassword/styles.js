
import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 0,
    justifyContent: 'space-between'
  },

  form: {
  },
  resetButton: {
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.red,
    marginTop: 5
  },
  footer: {
    alignItems: 'center'
  },
  button: {
    marginBottom: metrics.contentMargin,
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
