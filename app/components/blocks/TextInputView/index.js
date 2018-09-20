import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TextInput,
  Text
} from 'react-native'
import styles from './styles'

export class TextInputView extends PureComponent {
  static propTypes = {
    error: PropTypes.string,
    inputRef: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func
    // styleContainer: PropTypes.object.isRequired
  }
  static defaultProps = {
    inputRef: () => {},
    secureTextEntry: false
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
      ...rest
    } = this.props

    let showErrorLine = false
    if (error || error === '') showErrorLine = true

    console.log(showErrorLine)
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor='#5c5c5c'
          ref={this.getRef}
          secureTextEntry={secureTextEntry}
          style={[styles.input, showErrorLine && styles.inputError]}
          underlineColorAndroid='transparent'
          value={value}
          {...rest}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    )
  }
}
