import React from 'react'
import {BookingCard} from '../BookingCard'
import PropTypes from 'prop-types'

const UpcomingBookingCard = ({booking, onPress}) => {
  const onBookingPress = () => {
    onPress(booking)
  }
  return (
    <BookingCard
      booking={booking.car}
      bookingEnd={booking['booking_ending_at'].formatted}
      bookingStart={booking['booking_starting_at'].formatted}
      extraDetail={`Starting ${booking['booking_starting_at'].formatted}`}
      onPress={onBookingPress}
    />
  )
}

UpcomingBookingCard.propTypes = {
  booking: PropTypes.object,
  onPress: PropTypes.func
}

UpcomingBookingCard.defaultProps = {
  onPress: () => {}
}

export {UpcomingBookingCard}
