import ReceiptPreview from './ReceiptPreview'
import { connect } from 'react-redux'
import { saveReceiptPhoto } from 'store/actions/ride'

const actions = {
  onSaveReceiptPhoto: saveReceiptPhoto
}

export default connect(
  null,
  actions
)(ReceiptPreview)
