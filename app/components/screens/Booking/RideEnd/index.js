import RideEnd from './RideEnd'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {getCarPhotos, getGasTankPhotos} from 'store/selectors'
import {endRide} from 'store/actions/bookings'
import {selectPhoto} from 'store/actions/ride'

const selector = createStructuredSelector({
  carPhotos: getCarPhotos,
  gasTankPhotos: getGasTankPhotos
})

const actions = {
  onSelectPhoto: selectPhoto,
  onEndRide: endRide
}

export default connect(
  selector,
  actions
)(RideEnd)
