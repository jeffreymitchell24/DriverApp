import React, { Component } from 'react'
import { HomeView, UpcomingBookingCard } from 'components/blocks'

import SplashScreen from 'react-native-splash-screen'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import { NewBooking, BookingDetail } from 'navigation/routeNames'
import PropTypes from 'prop-types'

import moment from 'moment'
import _ from 'lodash'

class Upcoming extends Component {
  componentDidMount() {
    const hideSplash = this.props.navigation.getParam('hideSplash', false)
    if (hideSplash) SplashScreen.hide()
    this.props.onFetchUserBookings('upcoming')
  }

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

  render() {
    const { bookings } = this.props

    console.log(bookings)

    const grouped = _.groupBy(bookings, item =>
      moment(item.booking_ending_at.object.date).format('dddd, D MMM')
    )

    const sections = Object.keys(grouped).map(key => ({
      title: key,
      data: _.sortBy(grouped[key], 'booking_ending_at.formatted')
    }))

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
  // fetchError: PropTypes.string,
  isFetchingPending: PropTypes.bool,
  navigation: PropTypes.object,
  onFetchUserBookings: PropTypes.func,
  onSelectRide: PropTypes.func
}

export default Upcoming
