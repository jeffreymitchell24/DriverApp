import React, { PureComponent } from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'

import { icons } from 'images'
// import moment from 'moment'

import PropTypes from 'prop-types'
import styles from './styles'

class BookingCard extends PureComponent {
  onPress = () => {
    const { booking, onPress } = this.props
    onPress(booking)
  }
  render() {
    const {
      booking,
      extraDetail,
      // bookingEnd,
      // bookingStart,
      isRecurring
    } = this.props
    const {
      image_s3_url: image,
      full_pickup_location: pickupLocation,
      full_return_location: returnLocation,
      manufacturer = {},
      model = ''
    } = booking

    // const bookingStartTime = moment(bookingStart).format('hh:mm a')
    // const bookingEndTime = moment(bookingEnd).format('hh:mm a')

    return (
      <TouchableHighlight onPress={this.onPress}>
        <View style={styles.cardContainer}>
          <View style={styles.leftBlock}>
            <Image
              resizeMode={'cover'}
              source={{ uri: image }}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.rightBlock}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{`${
                manufacturer.name
              } ${model}`}</Text>
              {/* <Text
              style={styles.detailText}
            >{`${bookingStartTime} –– ${bookingEndTime}`}</Text> */}
              <Text style={styles.detailText}>Pickup: {pickupLocation}</Text>
              <Text style={styles.detailText}>Dropoff: {returnLocation}</Text>
              <Text style={styles.extraDetailText}>{extraDetail}</Text>
            </View>
            {isRecurring && (
              <Image
                source={icons.recurring}
                style={styles.recurringContainer}
              />
            )}
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

BookingCard.propTypes = {
  booking: PropTypes.object,
  // bookingEnd: PropTypes.string,
  // bookingStart: PropTypes.string,
  extraDetail: PropTypes.string,
  isRecurring: PropTypes.bool,
  onPress: PropTypes.func
}

BookingCard.defaultProps = {
  onPress: () => {}
}

export { BookingCard }
