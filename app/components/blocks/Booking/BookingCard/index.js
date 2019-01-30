import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'

import { icons } from 'images'
import styles from './styles'

class BookingCard extends PureComponent {
  onPress = () => {
    const { booking, onPress } = this.props

    onPress(booking)
  }

  render() {
    const { booking, extraDetail, isRecurring } = this.props
    const {
      image_s3_url: image,
      full_pickup_location: pickupLocation,
      full_return_location: returnLocation,
      manufacturer = {},
      model = ''
    } = booking

    return (
      <TouchableOpacity onPress={this.onPress}>
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

              <Text
                style={styles.detailText}
              >{`Pickup: ${pickupLocation}`}</Text>

              <Text
                style={styles.detailText}
              >{`Dropoff: ${returnLocation}`}</Text>

              <Text style={styles.extraDetailText}>{extraDetail}</Text>
            </View>

            {isRecurring ? (
              <Image
                source={icons.recurring}
                style={styles.recurringContainer}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

BookingCard.propTypes = {
  booking: PropTypes.object,
  extraDetail: PropTypes.string,
  isRecurring: PropTypes.bool,
  onPress: PropTypes.func
}

BookingCard.defaultProps = {
  onPress: () => {}
}

export { BookingCard }
