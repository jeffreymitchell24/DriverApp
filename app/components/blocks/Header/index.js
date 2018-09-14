import React, { Component } from 'react'
// import { Text, View, TouchableOpacity } from 'react-native'
// import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './styles'

export class Header extends Component {
  static propTypes = {
    // text: PropTypes.string
  }
  render () {
    return (
      <Icon
        name='arrow-left'
        size={16}
        style={styles.headerIcon}
      />
    )
  }
}
