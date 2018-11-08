import { createReducer } from '../../helpers/redux'

import moment from 'moment'
import { UPDATE_FILTER } from '../actions/newBookingsFilters'

const now = moment()
const startDate =
  now.minute() || now.second() || now.millisecond()
    ? now.add(1, 'hour').startOf('hour')
    : now.startOf('hour')

const initialState = {
  startDate: startDate.format(),
  endDate: startDate.add({ hours: 12 }).format(),
  vehicleOptions: [],
  location: {
    address: '',
    lat: null,
    lon: null
  },
  range: 3,
  isRecurring: false
}

const handlers = {
  [UPDATE_FILTER]: (state, { payload }) => {
    return {
      ...state,
      [payload.filter]: payload.nextValue
    }
  }
}

export default createReducer(initialState, handlers)
