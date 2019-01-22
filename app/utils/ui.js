import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export const isIOS = Platform.OS === 'ios'

export const isAndroid = Platform.OS === 'android'

export const isIphoneX = () => (
  isIOS &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (width === 812 || height === 812)
)
