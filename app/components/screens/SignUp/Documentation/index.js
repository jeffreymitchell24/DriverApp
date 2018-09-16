import { connect } from 'react-redux'
import { saveSignUpStepData } from 'store/actions/auth'
import { createStructuredSelector } from 'reselect'
import { getLicenses } from 'store/selectors'
import Documentation from './Documentation'

const selector = createStructuredSelector({
  licences: getLicenses
})

const actions = {
  onSaveSignUpStepData: saveSignUpStepData
}

export default connect(
  selector,
  actions
)(Documentation)
