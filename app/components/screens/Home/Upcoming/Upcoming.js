import React, { Component } from 'react'
import { HomeView } from 'components/blocks'
import SplashScreen from 'react-native-splash-screen'
import { AndroidBackHandler } from 'react-navigation-backhandler'
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
  onBackButtonPressAndroid = () => true
  onNewPress = () => {
    this.props.navigation.navigate(NewBooking)
  }
  render () {
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <HomeView
          bookings={BOOKINGS}
          onBookingPress={this.onBookingPress}
          onNewPress={this.onNewPress}
        />
      </AndroidBackHandler>
    )
  }
}

Upcoming.propTypes = {
  navigation: PropTypes.object
}

export default Upcoming
