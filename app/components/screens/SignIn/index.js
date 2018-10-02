import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {signIn} from 'store/actions/auth'
import {getAuthStatus, getSigninError, getIsAuthed, getUserData} from 'store/selectors'
import SignIn from './SignIn'

const selector = createStructuredSelector({
  user: getUserData,
  isUserAuthed: getIsAuthed,
  isSigninPending: getAuthStatus,
  error: getSigninError
})

const actions = {
  onSignIn: signIn
}

export default connect(
  selector,
  actions
)(SignIn)
