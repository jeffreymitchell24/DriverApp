import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {updateUserProfile} from 'store/actions/auth'
import { getUpdateError, getAuthStatus } from 'store/selectors/auth'
import ChangesReview from './ChangesReview'

const selector = createStructuredSelector({
  error: getUpdateError,
  requestPending: getAuthStatus
})

const actions = {
  onUpdateUserProfile: updateUserProfile
}

export default connect(
  selector,
  actions
)(ChangesReview)
