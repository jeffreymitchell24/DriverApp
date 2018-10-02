import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between'
  },

  form: {
    paddingTop: metrics.contentMarginSmall
  },

  textInput: {
    marginBottom: 0
  },

  photoUploadContainer: {
    paddingTop: metrics.contentMargin,
    paddingBottom: metrics.contentMargin
  },
  photoContainer: {
    marginTop: metrics.contentMarginSmall
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16
  },
  checkboxTitle: {
    fontSize: metrics.fontSizeBig,
    fontFamily: 'SFProText-Regular',
    color: colors.black
  }
})
