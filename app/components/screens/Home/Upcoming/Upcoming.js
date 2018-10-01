import React, { Component } from 'react'
import { HomeView } from 'components/blocks'
import SplashScreen from 'react-native-splash-screen'
import {NewBooking, BookingDetail} from 'navigation/routeNames'
import PropTypes from 'prop-types'
import {BOOKINGS} from 'constants/bookings'

class Upcoming extends Component {
  componentDidMount () {
    const hideSplash = this.props.navigation.getParam('hideSplash', false)
    if (hideSplash) SplashScreen.hide()
  }
  onBookingPress = (booking) => {
    this.props.navigation.navigate(BookingDetail)
  }

  onNewPress = () => {
    this.props.navigation.navigate(NewBooking)
  }
  render () {
    return (
      <HomeView
        bookings={BOOKINGS}
        onBookingPress={this.onBookingPress}
        onNewPress={this.onNewPress}
      />
    )
  }
}

Upcoming.propTypes = {
  navigation: PropTypes.object
}

export default Upcoming
