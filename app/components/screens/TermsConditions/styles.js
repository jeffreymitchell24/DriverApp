import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 0,
    justifyContent: 'space-between'
  },
  text: {
    color: colors.black,
    fontFamily: 'SFProText-Regular',
    fontSize: metrics.fontSizeBig
  }
})
