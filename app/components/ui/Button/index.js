import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, TouchableWithoutFeedback, ViewPropTypes, View } from 'react-native'

import styles from './styles'

const Button = ({ onPress, children, disabled, title, containerStyle, disabledStyle, textStyle, onDisabledPress }) => {
  const renderChildren = () => {
    return title
      ? (
        <Text style={[styles.text, textStyle && textStyle]}>{title}</Text>
      ) : (
        {children}
      )
  }
  let mergedStyles = [
    styles.container,
    containerStyle && containerStyle
  ]
  if (disabled) {
    mergedStyles.push(styles.disabled)
    mergedStyles.push(disabledStyle)
  }

  if (disabled && onDisabledPress) {
    return (
      <TouchableWithoutFeedback onPress={disabled ? onDisabledPress : onPress} >
        <View style={mergedStyles}>
          {renderChildren()}
        </View>
      </TouchableWithoutFeedback>
    )
  } else {
    let Wrapper = disabled ? View : TouchableOpacity
    return (
      <Wrapper style={mergedStyles} onPress={disabled ? onDisabledPress : onPress} >
        {renderChildren()}
      </Wrapper>
    )
  }
}

Button.propTypes = {
  children: PropTypes.node,
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  title: PropTypes.string,
  onDisabledPress: PropTypes.func,
  onPress: PropTypes.func
}

export { Button }
