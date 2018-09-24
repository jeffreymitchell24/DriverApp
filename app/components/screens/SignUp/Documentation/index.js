import { connect } from 'react-redux'
import { selectLicense, updatedRideshareApps, updateLicense, signUp } from 'store/actions/registration'
import { createStructuredSelector } from 'reselect'
import { getLicenses, getRideshareApps, getPersonalInfo, getCredentials } from 'store/selectors'
import Documentation from './Documentation'

const selector = createStructuredSelector({
  personalInfo: getPersonalInfo,
  credentials: getCredentials,
  licences: getLicenses,
  apps: getRideshareApps
})

const actions = {
  onSignUp: signUp,
  onSelectLicense: selectLicense,
  onUpdatedRideshareApps: updatedRideshareApps,
  onUpdateLicense: updateLicense
}

export default connect(
  selector,
  actions
)(Documentation)
