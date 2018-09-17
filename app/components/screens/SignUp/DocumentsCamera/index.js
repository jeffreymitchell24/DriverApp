import { connect } from 'react-redux'
import { saveSignUpStepData } from 'store/actions/registration'
import DocumentsCamera from './DocumentsCamera'

const actions = {
  onSaveSignUpStepData: saveSignUpStepData
}

export default connect(
  null,
  actions
)(DocumentsCamera)
