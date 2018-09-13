import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMargin,
    paddingBottom: 32,
    paddingTop: metrics.contentMargin,
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
  nextButton: {
    marginBottom: metrics.contentMargin,
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
