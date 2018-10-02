import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import ReceiptSubmit from './ReceiptSubmit'
import {getReceiptPhoto} from 'store/selectors'
import {clearReceiptPhoto} from 'store/actions/receipt'

const selector = createStructuredSelector({
  receiptPhoto: getReceiptPhoto
})
const actions = {
  onClearReceiptPhoto: clearReceiptPhoto
}
export default connect(
  selector,
  actions
)(ReceiptSubmit)
