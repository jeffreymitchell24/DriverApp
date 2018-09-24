import ProfileDetails from './ProfileDetails'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
// import {resetPasword} from 'store/actions/auth'
import {getUserData} from 'store/selectors'

const selector = createStructuredSelector({
  user: getUserData
})

const actions = {

}

export default connect(
  selector,
  actions
)(ProfileDetails)
