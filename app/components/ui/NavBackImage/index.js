import React from 'react'
import { Image, View } from 'react-native'
import {icons} from 'images'
import styles from './styles'

const NavBackImage = () => {
  return (
    <View style={{padding: 10, paddingLeft: 0}}>
      <Image
        source={icons['arrowLeft']}
        style={[styles.image]}
      />
    </View>
  )
}

export { NavBackImage }
