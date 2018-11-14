import ReceiptPreview from './ReceiptPreview'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getSelectedRidePhotoData } from 'store/selectors'
import { saveRidePhoto } from 'store/actions/ride'

const selector = createStructuredSelector({
  selectedPhoto: getSelectedRidePhotoData
})

const actions = {
  onSavePhoto: saveRidePhoto
}

export default connect(
  selector,
  actions
)(ReceiptPreview)
