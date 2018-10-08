import AvailableBookings from './AvailableBookings'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {fetchAvailableCars, selectCar} from 'store/actions/bookings'
import {getAvailableCars, getFetchingCarsStatus, getFetchCarsError} from 'store/selectors'

const selector = createStructuredSelector({
  cars: getAvailableCars,
  isFetchingPending: getFetchingCarsStatus,
  fetchError: getFetchCarsError
})

const actions = {
  onSelectCar: selectCar,
  onFetchAvailableCars: fetchAvailableCars
}

export default connect(
  selector,
  actions
)(AvailableBookings)
