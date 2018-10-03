import { StyleSheet } from 'react-native'
import { colors } from 'theme'

export default StyleSheet.create({
  photoContainer: {
    width: 80,
    height: 100,
    backgroundColor: colors.gray75,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 3
  },

  licenseImage: {
    width: 160,
    height: 200,
    resizeMode: 'cover'
  },

  iconCamera: {
    width: 16,
    height: 13
  }
})
