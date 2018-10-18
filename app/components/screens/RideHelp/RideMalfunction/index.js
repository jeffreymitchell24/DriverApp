import RideMalfunction from './RideMalfunction'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {selectPhoto, resetPhotos} from 'store/actions/helpCenter'
import { helpRideMalfunction } from 'store/actions/bookings'
import {getRideMalfunctionPhotos, getSelectedRide, getRideHelpRequestStatus, getRideHelpRequestError} from 'store/selectors'

const selector = createStructuredSelector({
  photos: getRideMalfunctionPhotos,
  ride: getSelectedRide,
  error: getRideHelpRequestError,
  requestPending: getRideHelpRequestStatus
})

const actions = {
  onSubmitReport: helpRideMalfunction,
  onSelectPhoto: selectPhoto,
  onResetPhotos: resetPhotos
}

export default connect(
  selector,
  actions
)(RideMalfunction)
