import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {getUserData} from 'store/selectors'
import {checkStatus} from 'store/actions/auth'
import RegisterReview from './RegisterReview'

const selector = createStructuredSelector({
  user: getUserData
})

const actions = {
  onCheckStatus: checkStatus
}

export default connect(
  selector,
  actions
)(RegisterReview)
