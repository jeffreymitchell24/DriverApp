import { connect } from 'react-redux'
import { selectLicense, updatedRideshareApps, updateLicense, signUp } from 'store/actions/registration'
import { createStructuredSelector } from 'reselect'
import { getLicenses, getRideshareApps, getPersonalInfo, getCredentials, getRequestStatus, getIsAuthed } from 'store/selectors'
import Documentation from './Documentation'

const selector = createStructuredSelector({
  personalInfo: getPersonalInfo,
  credentials: getCredentials,
  licences: getLicenses,
  apps: getRideshareApps,
  isAuthed: getIsAuthed,
  isSignupPending: getRequestStatus
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
