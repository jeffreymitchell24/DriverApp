import { connect } from 'react-redux'
import { saveCredentials } from 'store/actions/registration'
import { validateEmail } from 'store/actions/email'
import {getEmailValidationData} from 'store/selectors'
import { createStructuredSelector } from 'reselect'
import Account from './Account'

const selector = createStructuredSelector({
  emailValidation: getEmailValidationData
})

const actions = {
  onSaveCredentials: saveCredentials,
  onValidateEmail: validateEmail
}

export default connect(
  selector,
  actions
)(Account)
