import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    position: 'relative'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  loaderContainer: {
    position: 'absolute',
    left: (metrics.screenWidth / 2) - 18,
    top: (metrics.screenHeight / 2) - 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  captureButton: {
    position: 'absolute',
    height: 68,
    width: 68,
    bottom: 23,
    left: (metrics.screenWidth / 2) - 34,
    backgroundColor: colors.white,
    borderWidth: 10,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50
  },

  galleryButton: {
    position: 'absolute',
    left: 31,
    bottom: 31,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: colors.white
  },
  galleryIcon: {
    width: 47,
    height: 47
  },

  switchButton: {
    position: 'absolute',
    bottom: 26,
    right: 39
  }
})
