import { createReducer } from '../../helpers/redux'

import moment from 'moment'
import { UPDATE_FILTER } from '../actions/newBookingsFilters'
import { LOAD_CAR_CATEGORIES } from '../actions/newBooking'

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
  categories: [],
  isRecurring: false
}

const handlers = {
  [UPDATE_FILTER]: (state, { payload }) => {
    return {
      ...state,
      [payload.filter]: payload.nextValue
    }
  },
  [LOAD_CAR_CATEGORIES.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      categories: payload.categories.map(item => ({
        ...item,
        selected: true
      }))
    }
  }
}

export default createReducer(initialState, handlers)
