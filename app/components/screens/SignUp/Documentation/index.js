import { connect } from 'react-redux'
import { saveSignUpStepData } from 'store/actions/auth'
import Documentation from './Documentation'

const actions = {
  onSaveSignUpStepData: saveSignUpStepData
}

export default connect(
  null,
  actions
)(Documentation)
