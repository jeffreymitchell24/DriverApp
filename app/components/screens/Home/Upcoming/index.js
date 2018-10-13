import Upcoming from './Upcoming'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {getUpcomingBookings, getFetchingStatus, getFetchError} from 'store/selectors'
import {fetchUserBookings} from 'store/actions/bookings'

const selector = createStructuredSelector({
  bookings: getUpcomingBookings,
  isFetchingPending: getFetchingStatus,
  fetchError: getFetchError
})

const actions = {
  onFetchUserBookings: fetchUserBookings
}

export default connect(
  selector,
  actions
)(Upcoming)
