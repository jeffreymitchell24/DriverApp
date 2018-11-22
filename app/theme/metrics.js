import { Dimensions, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window')

const heightPercentageToDP = heightPercent =>
  PixelRatio.roundToNearestPixel((height * heightPercent) / 100)

export default {
  contentMargin: 24,
  contentMarginMiddle: 18,
  contentMarginSmall: 16,
  fontSize: 12,
  fontSizeBig: 17,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  heightPercentageToDP
}
