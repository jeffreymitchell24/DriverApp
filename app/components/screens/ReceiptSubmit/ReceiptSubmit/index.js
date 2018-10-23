import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import ReceiptSubmit from './ReceiptSubmit'
import {getReceiptPhoto, getSelectedRide, getReceiptSubmitRequestStatus, getReceiptSubmitError} from 'store/selectors'
import {clearReceiptPhoto, selectPhoto} from 'store/actions/ride'

import { submitReceipt } from 'store/actions/bookings'

const selector = createStructuredSelector({
  receiptPhoto: getReceiptPhoto,
  ride: getSelectedRide,
  error: getReceiptSubmitError,
  requestPending: getReceiptSubmitRequestStatus
})
const actions = {
  onSelectPhoto: selectPhoto,
  onSubmitReceipt: submitReceipt,
  onClearReceiptPhoto: clearReceiptPhoto
}
export default connect(
  selector,
  actions
)(ReceiptSubmit)
