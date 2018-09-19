import { connect } from 'react-redux'
import { saveSignUpStepData } from 'store/actions/registration'
import Account from './Account'

const actions = {
  onSaveSignUpStepData: saveSignUpStepData
}

export default connect(
  null,
  actions
)(Account)
