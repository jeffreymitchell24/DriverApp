import React, { Component } from 'react'
import { HomeView } from 'components/blocks'
import {NewBooking} from 'navigation/routeNames'
import PropTypes from 'prop-types'
import {BOOKINGS} from 'constants/bookings'

class Upcoming extends Component {
  onBookingPress = (booking) => {
    console.log('selected booking', booking)
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
