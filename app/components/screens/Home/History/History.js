import React, { Component } from 'react'
import { HomeView } from 'components/blocks'
import {NewBooking} from 'navigation/routeNames'
import PropTypes from 'prop-types'

class History extends Component {
  onBookingPress = (booking) => {
    console.log('selected booking', booking)
  }

  onNewPress = () => {
    this.props.navigation.navigate(NewBooking)
  }
  render () {
    return (
      <HomeView
        bookings={[]}
        onBookingPress={this.onBookingPress}
        onNewPress={this.onNewPress}
      />
    )
  }
}

History.propTypes = {
  navigation: PropTypes.object
}

export default History
