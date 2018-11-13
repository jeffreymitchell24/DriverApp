import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  signOut,
  updateUserImage,
  profileUpdateCheck
} from 'store/actions/auth'
import { getUpdateError, getAuthStatus } from 'store/selectors/auth'
import ProfileMain from './ProfileMain'
import { getUserData } from 'store/selectors'

const selector = createStructuredSelector({
  user: getUserData,
  error: getUpdateError,
  requestPending: getAuthStatus
})

const actions = {
  onUpdateUserImage: updateUserImage,
  onSignOut: signOut,
  onProfileUpdateCheck: profileUpdateCheck
}

export default connect(
  selector,
  actions
)(ProfileMain)
