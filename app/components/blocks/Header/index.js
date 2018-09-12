import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './styles'

export class Header extends Component {
  static propTypes = {
    text: PropTypes.string
  }
  render () {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeftIconContainer} >
          <Icon
            name='arrow-left'
            size={16}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{this.props.text}</Text>
      </View>
    )
  }
}
