import RideMalfunction from './RideMalfunction'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {selectPhoto, resetPhotos} from 'store/actions/helpCenter'
import {getRideMalfunctionPhotos} from 'store/selectors'

const selector = createStructuredSelector({
  photos: getRideMalfunctionPhotos
})

const actions = {
  onSelectPhoto: selectPhoto,
  onResetPhotos: resetPhotos
}

export default connect(
  selector,
  actions
)(RideMalfunction)
