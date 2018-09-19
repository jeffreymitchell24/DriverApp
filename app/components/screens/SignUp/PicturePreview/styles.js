import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  preview: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: metrics.screenHeight,
    width: metrics.screenWidth,
    resizeMode: 'cover',
    position: 'relative'
  },
  cancel: {
    position: 'absolute',
    left: 22,
    bottom: 35,
    padding: 10
  },
  confirm: {
    position: 'absolute',
    right: 22,
    bottom: 35,
    padding: 10
  }
})
