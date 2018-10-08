import { connect } from 'react-redux'
import { saveProfileInfo } from 'store/actions/registration'
import {signOut} from 'store/actions/auth'
import PersonalInfo from './PersonalInfo'

const actions = {
  onSaveProfileInfo: saveProfileInfo,
  onSignOut: signOut
}

export default connect(
  null,
  actions
)(PersonalInfo)
