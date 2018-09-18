import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default {
  contentMargin: 24,
  contentMarginMiddle: 18,
  contentMarginSmall: 16,
  fontSize: 12,
  fontSizeBig: 17,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width
}
