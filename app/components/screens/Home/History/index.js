import History from './History'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {getBookingsHistory, getFetchError, getFetchingStatus} from 'store/selectors'

const selector = createStructuredSelector({
  bookings: getBookingsHistory,
  isFetchingPending: getFetchingStatus,
  fetchError: getFetchError
})

const actions = {

}

export default connect(
  selector,
  actions
)(History)
