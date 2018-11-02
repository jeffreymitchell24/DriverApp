import React, { Component } from 'react'
import { Text } from 'react-native'
import { HomeView, UpcomingBookingCard } from 'components/blocks'

import { AndroidBackHandler } from 'react-navigation-backhandler'
import { NewBooking, BookingDetail } from 'navigation/routeNames'
import PropTypes from 'prop-types'

import moment from 'moment'
import _ from 'lodash'

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

class Upcoming extends Component {
  onBookingPress = booking => {
    this.props.onSelectRide(booking)
    this.props.navigation.navigate(BookingDetail)
  }
  onBackButtonPressAndroid = () => true
  onNewPress = () => {
    this.props.navigation.navigate(NewBooking)
    // this.props.navigation.navigate(BookingDetail)
  }

  renderItem = ({ item, index }) => {
    return <UpcomingBookingCard booking={item} onPress={this.onBookingPress} />
  }

  renderEmptyItem = () => {
    return (
      <Text style={{ fontSize: 12, color: '#ADB5BD', fontFamily: 'Helvetica' }}>
        No recurring bookings.
      </Text>
    )
  }

  render() {
    const { bookings } = this.props

    const grouped = _.groupBy(bookings, item =>
      moment(item.booking_ending_at.object.date).format('dddd')
    )
    const sections = DAYS.map(key => {
      const data = grouped[key] || [{ empty: true }]
      const renderItem = grouped[key] ? this.renderItem : this.renderEmptyItem

      return {
        title: `every ${key}`,
        data,
        renderItem
      }
    })

    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <HomeView
          bookings={sections}
          isFetching={this.props.isFetchingPending}
          renderItem={this.renderItem}
          onBookingPress={this.onBookingPress}
          onNewPress={this.onNewPress}
        />
      </AndroidBackHandler>
    )
  }
}

Upcoming.propTypes = {
  bookings: PropTypes.array,
  isFetchingPending: PropTypes.bool,
  navigation: PropTypes.object,
  onSelectRide: PropTypes.func
}

export default Upcoming
