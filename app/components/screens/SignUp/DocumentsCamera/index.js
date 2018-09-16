import { connect } from 'react-redux'
import { saveSignUpStepData } from 'store/actions/auth'
import DocumentsCamera from './DocumentsCamera'

const actions = {
  onSaveSignUpStepData: saveSignUpStepData
}

export default connect(
  null,
  actions
)(DocumentsCamera)
