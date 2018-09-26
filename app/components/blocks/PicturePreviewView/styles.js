import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  preview: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // height: metrics.screenHeight,
    // width: metrics.screenWidth,
    resizeMode: 'contain',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  cancel: {
    position: 'absolute',
    left: 22,
    bottom: 35,
    padding: 10,
    zIndex: 1
  },
  confirm: {
    position: 'absolute',
    right: 22,
    bottom: 35,
    padding: 10,
    zIndex: 2
  }
})
