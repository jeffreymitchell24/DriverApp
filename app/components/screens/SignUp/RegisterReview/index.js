import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {getUserData} from 'store/selectors'
import {checkStatus, signOut, saveRejectedId} from 'store/actions/auth'
import RegisterReview from './RegisterReview'

const selector = createStructuredSelector({
  user: getUserData
})

const actions = {
  onCheckStatus: checkStatus,
  onSaveRejectedId: saveRejectedId,
  onSignOut: signOut
}

export default connect(
  selector,
  actions
)(RegisterReview)
