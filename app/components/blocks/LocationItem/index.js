import React, { PureComponent } from 'react'
import {
  Text,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

class LocationItem extends PureComponent {
  _handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id)
    this.props.onPress(res)
  }

  render () {
    return (
      <TouchableOpacity style={styles.locationItem} onPress={this._handlePress}>
        <Text style={styles.description}>{this.props.description}</Text>
      </TouchableOpacity>
    )
  }
}

LocationItem.propTypes = {
  description: PropTypes.string,
  fetchDetails: PropTypes.func,
  place_id: PropTypes.string,
  onPress: PropTypes.func
}

export {LocationItem}
