import { connect } from 'react-redux'
import { saveSignUpStepData } from 'store/actions/auth'
import PicturePreview from './PicturePreview'

const actions = {
  onSaveSignUpStepData: saveSignUpStepData
}

export default connect(
  null,
  actions
)(PicturePreview)
