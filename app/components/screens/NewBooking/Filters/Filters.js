import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { View, Text } from 'react-native'

import { styles } from './styles'

class Filters extends PureComponent {
  render() {
    return (
      <View>
        <Text>Filters</Text>
      </View>
    )
  }
}

Filters.propTypes = {}

export default Filters
