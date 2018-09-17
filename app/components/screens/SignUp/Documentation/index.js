import { connect } from 'react-redux'
import { saveSignUpStepData, selectLicense } from 'store/actions/registration'
import { createStructuredSelector } from 'reselect'
import { getLicenses } from 'store/selectors'
import Documentation from './Documentation'

const selector = createStructuredSelector({
  licences: getLicenses
})

const actions = {
  onSaveSignUpStepData: saveSignUpStepData,
  onSelectLicense: selectLicense
}

export default connect(
  selector,
  actions
)(Documentation)
