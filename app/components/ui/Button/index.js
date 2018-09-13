import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, ViewPropTypes } from 'react-native'

import styles from './styles'

const Button = ({ onPress, children, title, containerStyle, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle && containerStyle]} onPress={onPress} >
      {
        title
          ? (
            <Text style={[styles.text, textStyle && textStyle]}>{title}</Text>
          ) : (
            {children}
          )
      }
    </TouchableOpacity>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  containerStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  title: PropTypes.string,
  onPress: PropTypes.func
}

export { Button }
