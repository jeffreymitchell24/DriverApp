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
    secureTextEntry: false
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
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor='#5c5c5c'
          secureTextEntry={secureTextEntry}
          style={[styles.input, error && styles.inputError]}
          underlineColorAndroid='transparent'
          value={value}
          {...rest}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    )
  }
}
