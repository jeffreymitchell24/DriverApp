import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

class BookingCard extends PureComponent {
  onPress = () => {
    const {booking, onPress} = this.props
    onPress(booking)
  }
  render () {
    const {booking, extraDetail, bookingEnd, bookingStart} = this.props
    const {
      image_s3_url: image,
      short_pickup_location: pickupLocation,
      short_return_location: returnLocation,
      manufacturer = '',
      model = '',
      plate = '',
      color = ''
    } = booking
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={this.onPress}>
          <Image source={{uri: image}} style={styles.cardImage} />
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <TouchableOpacity onPress={this.onPress}>
            <Text style={styles.cardTitle}>{`${manufacturer} ${model}`}</Text>
          </TouchableOpacity>
          <Text style={styles.detailText}>{`${plate}, ${color}`}</Text>
          <Text style={styles.detailText}>{`${bookingStart} –– ${bookingEnd}`}</Text>
          <Text style={styles.detailText}>{`${pickupLocation} –– ${returnLocation}`}</Text>
          <Text style={styles.extraDetailText}>{extraDetail}</Text>
        </View>
      </View>
    )
  }
}

BookingCard.propTypes = {
  booking: PropTypes.object,
  bookingEnd: PropTypes.string,
  bookingStart: PropTypes.string,
  extraDetail: PropTypes.string,
  onPress: PropTypes.func
}

BookingCard.defaultProps = {
  onPress: () => {}
}

export {BookingCard}
