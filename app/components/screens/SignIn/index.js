import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {signIn} from 'store/actions/auth'
import {saveResubmitStatus} from 'store/actions/registration'
import {getAuthStatus, getSigninError, getIsAuthed, getUserData, getPrevRejectedId} from 'store/selectors'
import SignIn from './SignIn'

const selector = createStructuredSelector({
  user: getUserData,
  isUserAuthed: getIsAuthed,
  isSigninPending: getAuthStatus,
  error: getSigninError,
  prevRejected: getPrevRejectedId
})

const actions = {
  onSignIn: signIn,
  onSaveResubmitStatus: saveResubmitStatus
}

export default connect(
  selector,
  actions
)(SignIn)
