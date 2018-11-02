import Upcoming from './All'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
  getUpcomingAllBookings,
  getFetchingStatus,
  getFetchError
} from 'store/selectors'
import { fetchUserBookings, selectRide } from 'store/actions/bookings'

const selector = createStructuredSelector({
  bookings: getUpcomingAllBookings,
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
