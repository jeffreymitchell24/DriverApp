import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isAuthorized} from 'store/selectors'
import { updateNotificationStatus } from 'store/actions/auth'
import App from './App'

const selector = createStructuredSelector({
  isAuthed: isAuthorized
})

const actions = {
  updateNotificationStatus
}

export default connect(
  selector,
  actions
)(App)
