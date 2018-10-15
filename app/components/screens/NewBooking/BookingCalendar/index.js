import { connect } from 'react-redux'
import {setBookingDate} from 'store/actions/newBooking'
import BookingCalendar from './BookingCalendar'

const actions = {
  onSetBookingDate: setBookingDate
}

export default connect(
  null,
  actions
)(BookingCalendar)
