import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { icons } from 'images'

import styles from './styles'

const ProfileButton = ({ onPress, user }) => {
  const iconSource = user.photo ? { uri: user.photo } : icons['user']

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={iconSource} style={styles.image} />
    </TouchableOpacity>
  )
}

ProfileButton.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func
}

export default ProfileButton
