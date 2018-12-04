import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 5,
    justifyContent: 'space-between'
  },
  text: {
    color: '#000',
    fontFamily: 'SFProText-Regular',
    fontSize: metrics.fontSizeBig
  }
})
