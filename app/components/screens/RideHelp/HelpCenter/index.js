
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { sendLateNotification } from 'store/actions/bookings'
import {getSelectedRide, getRideLateNotifRequestStatus, getRideLateNotifRequestError} from 'store/selectors'
import HelpCenter from './HelpCenter'

const selector = createStructuredSelector({
  ride: getSelectedRide,
  error: getRideLateNotifRequestError,
  requestPending: getRideLateNotifRequestStatus
})

const actions = {
  onSendLateNotification: sendLateNotification
}

export default connect(
  selector,
  actions
)(HelpCenter)
