import ProfileDetails from './ProfileDetails'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {validateEmail} from 'store/actions/email'
import {getUserData, getEmailValidationData} from 'store/selectors'

const selector = createStructuredSelector({
  user: getUserData,
  emailValidation: getEmailValidationData
})

const actions = {
  onValidateEmail: validateEmail
}

export default connect(
  selector,
  actions
)(ProfileDetails)
