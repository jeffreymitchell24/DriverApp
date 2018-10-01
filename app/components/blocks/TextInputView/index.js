import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TextInput,
  Text,
  ViewPropTypes
} from 'react-native'
import styles from './styles'

export class TextInputView extends PureComponent {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    error: PropTypes.string,
    inputRef: PropTypes.func,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    showLimit: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func
    // styleContainer: PropTypes.object.isRequired
  }
  static defaultProps = {
    inputRef: () => {},
    secureTextEntry: false,
    showLimit: false
  }

  getRef = (input) => {
    this.props.inputRef && this.props.inputRef(input)
  }

  render () {
    const {
      error,
      label,
      value,
      placeholder,
      secureTextEntry,
      containerStyle,
      maxLength,
      showLimit,
      ...rest
    } = this.props

    let showErrorLine = false
    if (error || error === '') showErrorLine = true
    let inputStyle = [styles.input]
    let valueLength = (value && value.length) || 0
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {maxLength && showLimit && <Text style={styles.limit}>{`${maxLength - valueLength} characters left `}</Text>}
        </View>
        <TextInput
          maxLength={maxLength}
          placeholder={placeholder}
          ref={this.getRef}
          secureTextEntry={secureTextEntry}
          style={[...inputStyle, showErrorLine && styles.inputError]}
          underlineColorAndroid='transparent'
          value={value}
          {...rest}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    )
  }
}
