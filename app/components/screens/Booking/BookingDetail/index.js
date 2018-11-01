import BookingDetail from './BookingDetail'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
  getSelectedRide,
  getLicenseCheckError,
  getLicenseCheckRequestStatus
} from 'store/selectors'
import {
  unselectRide,
  checkLicense,
  fetchSelectedCar
} from 'store/actions/bookings'

const selector = createStructuredSelector({
  ride: getSelectedRide,
  error: getLicenseCheckError,
  requestPending: getLicenseCheckRequestStatus
})

const actions = {
  onUnselectRide: unselectRide,
  onUnlockRide: checkLicense,
  onSelectCarForBooking: fetchSelectedCar
}

export default connect(
  selector,
  actions
)(BookingDetail)
