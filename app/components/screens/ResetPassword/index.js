import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {resetPasword} from 'store/actions/auth'
import {getResetStatus, getResetPassError, getIsResetSent} from 'store/selectors'
import ResetPassword from './ResetPassword'

const selector = createStructuredSelector({
  isRequestPending: getResetStatus,
  isResetLinkSent: getIsResetSent,
  error: getResetPassError
})

const actions = {
  onResetPasword: resetPasword
}

export default connect(
  selector,
  actions
)(ResetPassword)
