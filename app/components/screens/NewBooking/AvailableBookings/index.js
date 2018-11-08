import AvailableBookings from './AvailableBookings'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { fetchAvailableCars, fetchSelectedCar } from 'store/actions/bookings'
import {
  getAvailableCars,
  getFetchingCarsStatus,
  getFetchCarsError
} from 'store/selectors'

const selector = createStructuredSelector({
  cars: getAvailableCars,
  isFetchingPending: getFetchingCarsStatus,
  fetchError: getFetchCarsError
})

const actions = {
  onSelectCar: fetchSelectedCar,
  onFetchAvailableCars: fetchAvailableCars
}

export default connect(
  selector,
  actions
)(AvailableBookings)
