import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isAuthorized} from 'store/selectors'
import App from './App'

const selector = createStructuredSelector({
    isAuthed: isAuthorized,
})


export default connect(
    selector,
)(App)
