import React, { Component } from 'react'
import { HomeView, HistoryBookingCard } from 'components/blocks'
import {NewBooking, BookingDetail} from 'navigation/routeNames'
import PropTypes from 'prop-types'

class History extends Component {
  onBookingPress = (booking) => {
    this.props.onSelectRide(booking)
    this.props.navigation.navigate(BookingDetail)
  }

  onNewPress = () => {
    this.props.navigation.navigate(NewBooking)
  }
  renderItem = ({item, index}) => {
    return (
      <HistoryBookingCard
        booking={item}
        onPress={this.onBookingPress}
      />
    )
  }
  render () {
    return (
      <HomeView
        bookings={this.props.bookings}
        isFetching={this.props.isFetchingPending}
        renderItem={this.renderItem}
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
  navigation: PropTypes.object,
  onSelectRide: PropTypes.func
}

export default History
