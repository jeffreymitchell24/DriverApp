import React, { PureComponent } from 'react'
import { BookingCard } from '../BookingCard'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'
// import { convertMinsToHrsMins } from 'helpers/date'

class UpcomingBookingCard extends PureComponent {
  constructor(props) {
    super(props)
    console.log(props.booking)
    this.startingAt = moment.tz(
      props.booking['booking_starting_at'].object.date,
      'America/New_York'
    )
    this.endsAt = moment.tz(
      props.booking['booking_ending_at'].object.date,
      'America/New_York'
    )
    this.state = {
      extraDetail: ''
    }
  }

  componentDidMount() {
    this.getTime()
    this.timer = setInterval(this.getTime, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  getTime = () => {
    const now = moment().tz('America/New_York')

    if (moment().isAfter(this.endsAt)) {
      this.setState({
        extraDetail: `Late by ${now.to(this.endsAt, true)}`
      })
    } else {
      if (this.props.booking.status === 'pending') {
        if (now.isAfter(this.startingAt)) {
          clearInterval(this.timer)

          this.setState({
            extraDetail: 'You can unlock the car now'
          })
        } else {
          this.setState({
            extraDetail: `Starting in ${now.to(this.startingAt, true)}`
          })
        }
      } else {
        console.log('this.endsAt', this.endsAt)
        // Started ${this.startingAt.to(now, true)} ago\n
        this.setState({
          extraDetail: `Your booking will expire in ${now.to(
            this.endsAt,
            true
          )}`
        })
      }
    }
  }

  onBookingPress = () => {
    const { onPress, booking } = this.props

    onPress(booking)
  }

  render() {
    const { booking } = this.props
    const { extraDetail } = this.state

    return (
      <BookingCard
        booking={booking.car}
        bookingEnd={booking['booking_ending_at'].formatted}
        bookingStart={booking['booking_starting_at'].formatted}
        extraDetail={extraDetail}
        isRecurring={booking['is_recurring']}
        onPress={this.onBookingPress}
      />
    )
  }
}

UpcomingBookingCard.propTypes = {
  booking: PropTypes.object,
  onPress: PropTypes.func
}

UpcomingBookingCard.defaultProps = {
  onPress: () => {}
}

export { UpcomingBookingCard }
