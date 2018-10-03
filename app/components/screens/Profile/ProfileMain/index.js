import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {signOut} from 'store/actions/auth'
import ProfileMain from './ProfileMain'
import {getUserData} from 'store/selectors'

const selector = createStructuredSelector({
  user: getUserData
})

const actions = {
  onSignOut: signOut
}

export default connect(
  selector,
  actions
)(ProfileMain)
