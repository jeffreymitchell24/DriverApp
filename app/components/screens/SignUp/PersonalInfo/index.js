import { connect } from 'react-redux'
import { saveSignUpStepData } from 'store/actions/registration'
import PersonalInfo from './PersonalInfo'

const actions = {
  onSaveSignUpStepData: saveSignUpStepData
}

export default connect(
  null,
  actions
)(PersonalInfo)
