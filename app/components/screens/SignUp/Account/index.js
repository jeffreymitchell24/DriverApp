import { connect } from 'react-redux'
import { saveCredentials } from 'store/actions/registration'
import Account from './Account'

const actions = {
  onSaveCredentials: saveCredentials
}

export default connect(
  null,
  actions
)(Account)
