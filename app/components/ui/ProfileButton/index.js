import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

const ProfileButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.image} />
    </TouchableOpacity>
  )
}

ProfileButton.propTypes = {
  onPress: PropTypes.func
}

export { ProfileButton }
