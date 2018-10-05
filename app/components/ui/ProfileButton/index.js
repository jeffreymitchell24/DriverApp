import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import {icons} from 'images'

import styles from './styles'

const ProfileButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={icons['user']} style={styles.image} />
    </TouchableOpacity>
  )
}

ProfileButton.propTypes = {
  onPress: PropTypes.func
}

export { ProfileButton }
