import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {getUserData} from 'store/selectors'
import Intro from './Intro'

const selector = createStructuredSelector({
  user: getUserData
})

export default connect(
  selector
)(Intro)
