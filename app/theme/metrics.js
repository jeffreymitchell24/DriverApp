import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default {
  contentMargin: 24,
  contentMarginSmall: 16,

  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width
}
