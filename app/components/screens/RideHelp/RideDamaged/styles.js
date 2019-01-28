import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between'
  },

  form: {},

  textInput: {
    marginBottom: 0
  },

  photoListContainer: {
    paddingTop: metrics.contentMargin,
    paddingBottom: metrics.contentMarginSmall
  },

  photoList: {
    paddingTop: metrics.contentMarginSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  photoContainer: {
    marginBottom: 8
  }
})
