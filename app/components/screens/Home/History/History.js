import React, { Component } from 'react'
import { HomeView } from 'components/blocks'
import {NewBooking} from 'navigation/routeNames'
import PropTypes from 'prop-types'

class History extends Component {
  onBookingPress = (booking) => {
    // this.props.navigation.navigate(BookingDetail)
  }

  onNewPress = () => {
    this.props.navigation.navigate(NewBooking)
  }
  render () {
    return (
      <HomeView
        bookings={this.props.bookings}
        isFetching={this.props.isFetchingPending}
        onBookingPress={this.onBookingPress}
        onNewPress={this.onNewPress}
      />
    )
  }
}

History.propTypes = {
  bookings: PropTypes.array,
  fetchError: PropTypes.string,
  isFetchingPending: PropTypes.bool,
  navigation: PropTypes.object
}

export default History
