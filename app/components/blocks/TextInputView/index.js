import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextInputMask from 'react-native-text-input-mask'
import {
  View,
  TextInput,
  Text,
  ViewPropTypes,
  StyleSheet,
  Platform
} from 'react-native'

import { colors } from 'theme'

export class TextInputView extends PureComponent {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    error: PropTypes.string,
    inputRef: PropTypes.func,
    label: PropTypes.string,
    mask: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    showLimit: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func
  }

  static defaultProps = {
    inputRef: () => {},
    secureTextEntry: false,
    showLimit: false
  }

  getRef = input => {
    if (this.props.inputRef) {
      this.props.inputRef(input)
    }
  }

  render() {
    const {
      error,
      label,
      value,
      placeholder,
      secureTextEntry,
      containerStyle,
      maxLength,
      showLimit,
      autoCapitalize,
      ...rest
    } = this.props

    const showErrorLine = error || error === ''
    const inputStyle = styles.input
    const valueLength = (value && value.length) || 0

    const Component = rest.mask ? TextInputMask : TextInput

      console.log('autoCapitalize',autoCapitalize)
      console.log('rest', rest)
      console.log('rest.mask', rest.mask)
      console.log('rest.mask',Component)
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>

          {maxLength && showLimit ? (
            <Text style={styles.limit}>{`${maxLength -
              valueLength} characters left `}</Text>
          ) : null}
        </View>

        <Component
          maxLength={maxLength}
          placeholder={placeholder}
          ref={this.getRef}
          secureTextEntry={secureTextEntry}
          style={[inputStyle, showErrorLine ? styles.inputError : null]}
          underlineColorAndroid={'transparent'}
          value={value}
          autoCapitalize = {autoCapitalize?autoCapitalize:'sentences'}
          {...rest}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },

  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  label: {
    fontFamily: 'SFProText-Regular',
    color: colors.gray200,
    fontSize: 12
  },

  limit: {
    fontFamily: 'SFProText-Regular',
    color: colors.gray200,
    fontSize: 12
  },
  placeholder: {
    fontSize: 12,
    fontFamily: 'SFProText-Regular'
  },
  input: {
    height: null,
    paddingBottom: Platform.OS === 'android' ? 0 : 4,
    paddingTop: 8,
    color: '#000',
    fontFamily: 'SFProText-Regular',
    padding: 0,
    margin: 0,
    fontSize: 17,
    lineHeight: 22,
    textAlignVertical: 'top',
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50
  },

  inputError: {
    borderBottomColor: colors.red
  },

  error: {
    marginTop: 8,
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.red
  }
})
