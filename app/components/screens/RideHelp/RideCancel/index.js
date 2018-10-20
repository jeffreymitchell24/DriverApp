import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { cancelRide, resetRideCancelError } from 'store/actions/bookings'
import {getSelectedRide, getRideCancelRequestStatus, getRideCancelError} from 'store/selectors'
import RideCancel from './RideCancel'

const selector = createStructuredSelector({
  ride: getSelectedRide,
  error: getRideCancelError,
  requestPending: getRideCancelRequestStatus
})

const actions = {
  onConfirm: cancelRide,
  onResetError: resetRideCancelError
}

export default connect(
  selector,
  actions
)(RideCancel)
