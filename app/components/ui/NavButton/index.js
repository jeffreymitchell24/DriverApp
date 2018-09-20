import React from 'react'
import { Image, TouchableOpacity, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { icons } from 'images'
import styles from './styles'

const NavButton = ({onPress, icon, imageStyle}) => {
  return (
    <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={onPress}>
      <Image source={icons[icon]} style={[styles.image, imageStyle]} />
    </TouchableOpacity>
  )
}

NavButton.propTypes = {
  icon: PropTypes.string,
  imageStyle: ViewPropTypes.style,
  onPress: PropTypes.func
}

NavButton.defaultProps = {
  onPress: () => {}
}

export { NavButton }
