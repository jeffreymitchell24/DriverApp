import Upcoming from './Recurring'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
  getUpcomingRecurringBookings,
  getFetchingStatus,
  getFetchError
} from 'store/selectors'
import { fetchUserBookings, selectRide } from 'store/actions/bookings'

const selector = createStructuredSelector({
  bookings: getUpcomingRecurringBookings,
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
)(Upcoming)
