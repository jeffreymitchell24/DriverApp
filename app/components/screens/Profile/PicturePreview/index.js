import { connect } from 'react-redux'
import { updateUserImage } from 'store/actions/auth'
import { createStructuredSelector } from 'reselect'

import { getUpdateError, getAuthStatus } from 'store/selectors/auth'
import PicturePreview from './PicturePreview'
const selector = createStructuredSelector({
  error: getUpdateError,
  requestPending: getAuthStatus
})
const actions = {
  onUpdateUserImage: updateUserImage
}

export default connect(
  selector,
  actions
)(PicturePreview)
