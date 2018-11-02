import Upcoming from './OneTime'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
  getUpcomingOneTimeBookings,
  getFetchingStatus,
  getFetchError
} from 'store/selectors'
import { fetchUserBookings, selectRide } from 'store/actions/bookings'

const selector = createStructuredSelector({
  bookings: getUpcomingOneTimeBookings,
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
