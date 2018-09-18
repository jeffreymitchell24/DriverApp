import React, { Component } from 'react'
import { HomeView } from 'components/blocks'

const BOOKINGS = [
  {
    id: '0',
    carName: 'Toyota Prius',
    carDetails: 'FBR 1449, White',
    time: 'Aug 20, 11:00AM –– Aug 20, 11:00PM',
    address: 'Bronx –– Manhattan'
  },
  {
    id: '1',
    carName: 'Toyota Prius',
    carDetails: 'FBR 1449, White',
    time: 'Aug 20, 11:00AM –– Aug 20, 11:00PM',
    address: 'Bronx –– Manhattan'
  },
  {
    id: '2',
    carName: 'Toyota Prius',
    carDetails: 'FBR 1449, White',
    time: 'Aug 20, 11:00AM –– Aug 20, 11:00PM',
    address: 'Bronx –– Manhattan'
  }
]

class Upcoming extends Component {
  onBookingPress = (booking) => {
    console.log('selected booking', booking)
  }

  onNewPress = () => {
    console.log('New Booking Press')
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

}

export default Upcoming
