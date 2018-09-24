import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {signIn} from 'store/actions/auth'
import {getAuthStatus, getSigninError} from 'store/selectors'
import SignIn from './SignIn'

const selector = createStructuredSelector({
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
