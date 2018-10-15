import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {unselectCar, bookCar} from 'store/actions/bookings'
import {getNewBookingStart, getNewBookingEnd} from 'store/selectors/newBooking'

import {getSelectedCar, getBookingRequestError, getBookingRequestStatus, getCarFetchingStatus} from 'store/selectors'
import NewBookingDetails from './NewBookingDetails'

const actions = {
  onBookCar: bookCar,
  onUnselectCar: unselectCar
}

const selector = createStructuredSelector({
  car: getSelectedCar,
  bookingPending: getBookingRequestStatus,
  bookingError: getBookingRequestError,
  isFetchingCar: getCarFetchingStatus,
  startDate: getNewBookingStart,
  endDate: getNewBookingEnd
})

export default connect(
  selector,
  actions
)(NewBookingDetails)
