import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {unselectCar, bookCar} from 'store/actions/bookings'

import {getSelectedCar, getBookingRequestError, getBookingRequestStatus} from 'store/selectors'
import NewBookingDetails from './NewBookingDetails'

const actions = {
  onBookCar: bookCar,
  onUnselectCar: unselectCar
}

const selector = createStructuredSelector({
  car: getSelectedCar,
  bookingPending: getBookingRequestStatus,
  bookingError: getBookingRequestError
})

export default connect(
  selector,
  actions
)(NewBookingDetails)
