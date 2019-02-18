import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isAuthorized} from 'store/selectors'
import AuthLoading from './AuthLoading'

const selector = createStructuredSelector({
    isAuthed: isAuthorized,
})


export default connect(
    selector,
)(AuthLoading)
