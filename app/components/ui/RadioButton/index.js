import { CheckBox } from 'react-native-elements'
import React from 'react'
import {ViewPropTypes} from 'react-native'
import PropTypes from 'prop-types'
import { colors } from 'theme'
import styles from './styles'

const RadioButton = ({checked, style, onPress, iconType, checkedIcon}) => {
  return (
    <CheckBox
      checked={checked}
      checkedColor={colors.red}
      checkedIcon={checkedIcon}
      containerStyle={[styles.checkbox, style]}
      iconType={iconType}
      title=''
      uncheckedIcon='md-radio-button-off'
      onPress={onPress}
    />
  )
}

RadioButton.propTypes = {
  checked: PropTypes.bool,
  checkedIcon: PropTypes.string,
  iconType: PropTypes.string,
  style: ViewPropTypes.style,
  onPress: PropTypes.func
}
RadioButton.defaultProps = {
  checkedIcon: 'md-checkmark-circle',
  iconType: 'ionicon'
}

export {RadioButton}
