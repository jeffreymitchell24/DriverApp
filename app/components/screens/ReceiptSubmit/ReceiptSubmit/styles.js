import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 5,
    justifyContent: 'space-between'
  },

  photoUploadSection: {
    paddingTop: 0,
    borderBottomWidth: 0
  },
  dropdown: {
    overflow: 'hidden',
    marginBottom: metrics.contentMarginSmall
  },
  dropdownItem: {
    height: 30,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderColor: colors.gray50,
    borderWidth: 2,
    borderBottomWidth: 0
  },
  dropdownItemText: {
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular'
  }
})
