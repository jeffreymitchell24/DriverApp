import React from 'react'
import PropTypes from 'prop-types'
import { Image, View } from 'react-native'
import { icons } from 'images'
import styles from './styles'

const NavBackImage = ({ short }) => {
  return (
    <View style={{ padding: 10, paddingLeft: 0 }}>
      <Image
        source={icons[short ? 'arrowLeftShort' : 'arrowLeft']}
        style={[short ? styles.imageShort : styles.image]}
      />
    </View>
  )
}

NavBackImage.propTypes = {
  short: PropTypes.bool
}

export { NavBackImage }
