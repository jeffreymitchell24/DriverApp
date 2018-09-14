import { connect } from 'react-redux'
import { saveSignUpStepData } from 'store/actions/auth'
import SignUpStepTwo from './SignUpStepTwo'

const actions = {
  onSaveSignUpStepData: saveSignUpStepData
}

export default connect(
  null,
  actions
)(SignUpStepTwo)
