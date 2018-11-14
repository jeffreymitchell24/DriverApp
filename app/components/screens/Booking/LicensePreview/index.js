import LicensePreview from './LicensePreview'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
  getSelectedRide,
  getLicenseCheckRequestStatus,
  getLicenseCheckError,
  getLicenseCheckStatus
} from 'store/selectors'
import { checkLicense } from 'store/actions/bookings'

const selector = createStructuredSelector({
  licenseChecked: getLicenseCheckStatus,
  ride: getSelectedRide,
  error: getLicenseCheckError,
  requestPending: getLicenseCheckRequestStatus
})

const actions = {
  onCheckLicense: checkLicense
}

export default connect(
  selector,
  actions
)(LicensePreview)
