import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {selectPhoto, resetPhotos} from 'store/actions/helpCenter'
import {getRideDamagedPhotos} from 'store/selectors'
import RideDamaged from './RideDamaged'

const selector = createStructuredSelector({
  photos: getRideDamagedPhotos
})

const actions = {
  onSelectPhoto: selectPhoto,
  onResetPhotos: resetPhotos
}

export default connect(
  selector,
  actions
)(RideDamaged)
