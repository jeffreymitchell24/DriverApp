import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setBookingDate } from 'store/actions/newBooking'
import { getSelectedCar } from 'store/selectors'
import { getFilters } from 'store/selectors/filters'

import BookingCalendar from './BookingCalendar'

const actions = {
  onSetBookingDate: setBookingDate
}

const selector = createStructuredSelector({
  selectedCar: getSelectedCar,
  filters: getFilters
})

export default connect(
  selector,
  actions
)(BookingCalendar)
