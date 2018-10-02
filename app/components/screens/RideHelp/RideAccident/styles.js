import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  text: {
    marginTop: metrics.contentMargin,
    color: colors.gray100,
    fontFamily: 'SFProText-Regular',
    fontSize: 16
  },
  callText: {
    color: colors.red,
    fontFamily: 'SFProText-Regular',
    fontSize: 16
  }
})
