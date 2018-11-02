import React from 'react'
import { BookingCard } from '../BookingCard'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'

const HistoryBookingCard = ({ booking, onPress }) => {
  const onBookingPress = () => {
    onPress(booking)
  }
  return (
    <BookingCard
      booking={booking.car}
      bookingEnd={booking['booking_ending_at'].formatted}
      bookingStart={booking['booking_starting_at'].formatted}
      isRecurring={booking['is_recurring']}
      onPress={onBookingPress}
    />
  )
}

HistoryBookingCard.propTypes = {
  booking: PropTypes.object,
  onPress: PropTypes.func
}

HistoryBookingCard.defaultProps = {
  onPress: () => {}
}

export { HistoryBookingCard }
