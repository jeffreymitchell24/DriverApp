import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, ViewPropTypes, View } from 'react-native'

import styles from './styles'

const Button = ({ onPress, children, disabled, title, containerStyle, disabledStyle, textStyle }) => {
  let mergedStyles = [
    styles.container,
    containerStyle && containerStyle
  ]
  if (disabled) {
    mergedStyles.push(styles.disabled)
    mergedStyles.push(disabledStyle)
  }
  let Wrapper = disabled ? View : TouchableOpacity
  return (
    <Wrapper style={mergedStyles} onPress={onPress} >
      {
        title
          ? (
            <Text style={[styles.text, textStyle && textStyle]}>{title}</Text>
          ) : (
            {children}
          )
      }
    </Wrapper>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  title: PropTypes.string,
  onPress: PropTypes.func
}

export { Button }
