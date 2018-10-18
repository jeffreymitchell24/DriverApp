import BookingDetail from './BookingDetail'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {getSelectedRide} from 'store/selectors'
import {unselectRide} from 'store/actions/bookings'

const selector = createStructuredSelector({
  ride: getSelectedRide
})

const actions = {
  onUnselectRide: unselectRide
}

export default connect(
  selector,
  actions
)(BookingDetail)
