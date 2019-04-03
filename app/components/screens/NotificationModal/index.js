import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import NotificationModal from './NotificationModal'
import {
  getUpcomingAllBookings,
  getFetchingStatus
} from 'store/selectors'
import { selectRide, fetchUserBookings } from 'store/actions/bookings'

const selector = createStructuredSelector({
  bookings: getUpcomingAllBookings
})

const actions = {
  onSelectRide: selectRide,
  onFetchUserBookings: fetchUserBookings
}

export default connect(
  selector,
  actions
)(NotificationModal)
