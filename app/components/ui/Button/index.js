import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import styles from './styles'

const Button = ({ onPress, children }) => {
  return (
    <Text style={styles.btnTextStyle} onPress={onPress} >
      {children}
    </Text>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func
}

export { Button }
