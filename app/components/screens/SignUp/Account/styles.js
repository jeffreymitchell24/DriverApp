import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 5,
    justifyContent: 'space-between'
  },

  form: {
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.contentMargin
  },

  checkBox: {
    margin: 0,
    marginRight: -13,
    marginLeft: 0,
    padding: 0,
    paddingRight: 0,
    backgroundColor: colors.white,
    borderWidth: 0
  },
  checkboxTitle: {
    color: colors.black,
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    paddingBottom: 3
  },

  termsButton: {
    color: colors.red
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
