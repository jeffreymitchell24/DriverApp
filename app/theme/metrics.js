import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default {
  contentMargin: 35,
  contentMarginSmall: 14,

  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,

  verticalGradientDirection: {
    start: { x: 0.1, y: 0.4 },
    end: { x: 0.0, y: 1.0 }
  }
}
