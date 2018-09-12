import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TextInput,
  Text
} from 'react-native'
import styles from './styles'

export class TextInputView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      color1: '#dadada',
      color2: '#dadada'
    }
  }

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    text: PropTypes.string
    // styleContainer: PropTypes.object.isRequired
  }

  componentDidMount () {

  }

  render () {
    return (
      <View style={styles.InputWrapp}>
        <Text style={styles.InputLabel}>{this.props.text}</Text>
        <TextInput
          placeholder={this.props.placeholder}
          placeholderTextColor='#5c5c5c'
          secureTextEntry={this.props.secureTextEntry || false}
          style={styles.InputInput}
          underlineColorAndroid='transparent'
          value={this.state.value}
          onBlur={() => this.setState({
            color1: '#dadada',
            color2: '#dadada'
          })}
          onChangeText={(value) => this.setState({ value })}
          onFocus={() => this.setState({
            color1: '#239570',
            color2: '#72bb5f'
          })}
        />
      </View>
    )
  }
}
