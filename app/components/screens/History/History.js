import React, { Component } from 'react'
import { HomeView, HistoryBookingCard } from 'components/blocks'
import { NewBooking, BookingDetail } from 'navigation/routeNames'
import PropTypes from 'prop-types'

import _ from 'lodash'

class History extends Component {
  componentDidMount() {
    this.props.onFetchUserBookings('history')
  }

  onBookingPress = booking => {
    this.props.onSelectRide(booking)
    this.props.navigation.navigate(BookingDetail)
  }

  onNewPress = () => {
    this.props.navigation.navigate(NewBooking)
  }

  renderItem = ({ item, index }) => {
    return <HistoryBookingCard booking={item} onPress={this.onBookingPress} />
  }

  render() {
    const { bookings } = this.props

    const sections = Object.keys(bookings).map(key => {
      return {
        title: key,
        data: _.sortBy(bookings[key], 'booking_ending_at.object.date')
      }
    })

    return (
      <HomeView
        bookings={sections}
        isFetching={this.props.isFetchingPending}
        renderItem={this.renderItem}
        withoutNewBtn
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
  onFetchUserBookings: PropTypes.func,
  onSelectRide: PropTypes.func
}

export default History
