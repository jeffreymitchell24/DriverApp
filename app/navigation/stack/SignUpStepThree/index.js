import { connect } from 'react-redux'
import { saveSignUpStepData } from 'store/actions/auth'
import StepUpStepThree from './StepUpStepThree'

const actions = {
  onSaveSignUpStepData: saveSignUpStepData
}

export default connect(
  null,
  actions
)(StepUpStepThree)
