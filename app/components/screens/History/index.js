import History from './History'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
  getBookingsHistory,
  getFetchError,
  getFetchingStatus
} from 'store/selectors'
import { selectRide, fetchUserBookings } from 'store/actions/bookings'

const selector = createStructuredSelector({
  bookings: getBookingsHistory,
  isFetchingPending: getFetchingStatus,
  fetchError: getFetchError
})

const actions = {
  onSelectRide: selectRide,
  onFetchUserBookings: fetchUserBookings
}

export default connect(
  selector,
  actions
)(History)
