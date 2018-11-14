import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectPhoto, resetPhotos, savePhoto } from 'store/actions/helpCenter'

import { helpRideDamaged } from 'store/actions/bookings'
import {
  getRideDamagedPhotos,
  getSelectedRide,
  getRideHelpRequestStatus,
  getRideHelpRequestError
} from 'store/selectors'
import RideDamaged from './RideDamaged'

const selector = createStructuredSelector({
  photos: getRideDamagedPhotos,
  ride: getSelectedRide,
  error: getRideHelpRequestError,
  requestPending: getRideHelpRequestStatus
})

const actions = {
  onSubmitReport: helpRideDamaged,
  onSelectPhoto: selectPhoto,
  onResetPhotos: resetPhotos,
  onSavePhoto: savePhoto
}

export default connect(
  selector,
  actions
)(RideDamaged)
