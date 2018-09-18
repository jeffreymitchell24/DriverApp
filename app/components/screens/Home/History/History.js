import React, { Component } from 'react'
import { HomeView } from 'components/blocks'
// import PropTypes from 'prop-types'

class History extends Component {
  onBookingPress = (booking) => {
    console.log('selected booking', booking)
  }

  onNewPress = () => {
    console.log('New Booking Press')
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

}

export default History
