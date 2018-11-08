import React from 'react'
import { Platform } from 'react-native'

import AndroidPicker from './index.android'
import IOSPicker from './index.ios'

export default props => {
  return Platform.OS === 'ios' ? (
    <IOSPicker {...props} />
  ) : (
    <AndroidPicker {...props} />
  )
}
