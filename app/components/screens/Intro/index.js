import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {getUserData, getIsCheckingUserStatus} from 'store/selectors'
import {checkStatus} from 'store/actions/auth'
import Intro from './Intro'

const selector = createStructuredSelector({
  user: getUserData,
  isCheckingStatus: getIsCheckingUserStatus
})

const actions = {
  onCheckStatus: checkStatus
}

export default connect(
  selector,
  actions
)(Intro)
