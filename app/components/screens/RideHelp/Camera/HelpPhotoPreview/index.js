import HelpPhotoPreview from './HelpPhotoPreview'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {savePhoto} from 'store/actions/helpCenter'
import {getSelectedPhotoData} from 'store/selectors'

const selector = createStructuredSelector({
  selectedPhoto: getSelectedPhotoData
})

const actions = {
  onSavePhoto: savePhoto
}

export default connect(
  selector,
  actions
)(HelpPhotoPreview)
