import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import {icons} from 'images'

import styles from './styles'

const HistoryButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={icons['historyBtn']} style={styles.image} />
    </TouchableOpacity>
  )
}

HistoryButton.propTypes = {
  onPress: PropTypes.func
}

export { HistoryButton }
