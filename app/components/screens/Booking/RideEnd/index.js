import RideEnd from './RideEnd'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
  getCarPhotos,
  getGasTankPhotos,
  getRideEndError,
  getRideEndRequestStatus,
  getSelectedRide,
  getMileagePhotos
} from 'store/selectors'

import { endRide, checkLicense } from 'store/actions/bookings'
import { selectPhoto, clearReceiptPhoto } from 'store/actions/ride'

const selector = createStructuredSelector({
  error: getRideEndError,
  requestPending: getRideEndRequestStatus,
  ride: getSelectedRide,
  carPhotos: getCarPhotos,
  gasTankPhotos: getGasTankPhotos,
  mileagePhotos: getMileagePhotos,
  onClearReceiptPhoto: clearReceiptPhoto
})

const actions = {
  onUnlockRide: checkLicense,
  onSelectPhoto: selectPhoto,
  onEndRide: endRide
}

export default connect(
  selector,
  actions
)(RideEnd)
