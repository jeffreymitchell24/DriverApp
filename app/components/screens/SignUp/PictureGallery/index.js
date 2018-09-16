import { connect } from 'react-redux'
import { saveSignUpStepData } from 'store/actions/auth'
import PictureGallery from './PictureGallery'

const actions = {
  onSaveSignUpStepData: saveSignUpStepData
}

export default connect(
  null,
  actions
)(PictureGallery)
