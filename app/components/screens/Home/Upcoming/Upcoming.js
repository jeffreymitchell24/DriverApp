import React, { Component } from 'react'
import { HomeView, UpcomingBookingCard } from 'components/blocks'
import SplashScreen from 'react-native-splash-screen'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import {NewBooking, BookingDetail} from 'navigation/routeNames'
import PropTypes from 'prop-types'

class Upcoming extends Component {
  componentDidMount () {
    const hideSplash = this.props.navigation.getParam('hideSplash', false)
    if (hideSplash) SplashScreen.hide()
    this.props.onFetchUserBookings()
  }
  onBookingPress = (booking) => {
    console.log('booking', booking)
    this.props.onSelectRide(booking)
    this.props.navigation.navigate(BookingDetail)
  }
  onBackButtonPressAndroid = () => true
  onNewPress = () => {
    this.props.navigation.navigate(NewBooking)
    // this.props.navigation.navigate(BookingDetail)
  }

  renderItem = ({item, index}) => {
    return (
      <UpcomingBookingCard
        booking={item}
        onPress={this.onBookingPress}
      />
    )
  }
  render () {
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <HomeView
          bookings={this.props.bookings}
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
  fetchError: PropTypes.string,
  isFetchingPending: PropTypes.bool,
  navigation: PropTypes.object,
  onFetchUserBookings: PropTypes.func,
  onSelectRide: PropTypes.func
}

export default Upcoming
