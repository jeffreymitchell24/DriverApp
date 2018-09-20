import { connect } from 'react-redux'
import { saveProfileInfo } from 'store/actions/registration'
import PersonalInfo from './PersonalInfo'

const actions = {
  onSaveProfileInfo: saveProfileInfo
}

export default connect(
  null,
  actions
)(PersonalInfo)
