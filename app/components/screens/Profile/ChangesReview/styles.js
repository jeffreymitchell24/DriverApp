
import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 24,
    paddingTop: 5,
    justifyContent: 'space-between'
  },

  listSeparator: {
    height: 2,
    backgroundColor: colors.gray50
  },
  changeContainer: {
    paddingVertical: metrics.contentMarginSmall
  },
  fieldTitle: {
    color: colors.gray300,
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular'
  },
  optionTitle: {
    color: colors.gray200,
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    marginBottom: 4
  },
  prevText: {
    textDecorationLine: 'line-through',
    color: colors.red,
    fontSize: metrics.fontSizeBig,
    fontFamily: 'SFProText-Regular'
  },
  currentText: {
    color: colors.green,
    fontSize: metrics.fontSizeBig,
    fontFamily: 'SFProText-Regular'
  },
  footer: {
    alignItems: 'center'
  },
  button: {
    marginTop: 10,
    alignSelf: 'stretch'
  }
})
