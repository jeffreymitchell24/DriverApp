import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

class BookingCard extends PureComponent {
  onPress = () => {
    const {booking, onPress} = this.props
    onPress(booking)
  }
  render () {
    const {booking} = this.props
    const {carName, carDetails, time, address} = booking
    return (
      <View style={styles.cardContainer}>
        {/* <Image source={} style={styles.cardImage} /> */}
        <TouchableOpacity style={styles.cardImage} onPress={this.onPress} />
        <View style={styles.cardContent}>
          <TouchableOpacity onPress={this.onPress}>
            <Text style={styles.cardTitle}>{carName}</Text>
          </TouchableOpacity>
          <Text style={styles.detailText}>{carDetails}</Text>
          <Text style={styles.detailText}>{time}</Text>
          <Text style={styles.detailText}>{address}</Text>
        </View>
      </View>
    )
  }
}

BookingCard.propTypes = {
  booking: PropTypes.object,
  onPress: PropTypes.func
}

BookingCard.defaultProps = {
  onPress: () => {}
}

export {BookingCard}
