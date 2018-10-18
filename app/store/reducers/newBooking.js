import { createReducer } from '../../helpers/redux'

import {
  SET_DATE,
  RESET_DATES
} from 'store/actions/newBooking'

import {UNSELECT_CAR} from 'store/actions/bookings'

const initialState = {
  startDate: null,
  endDate: null
}

const handlers = {
  [SET_DATE]: (state, { payload }) => {
    const {type, date} = payload
    return {
      startDate: type === 'start' ? date : state.startDate,
      endDate: type === 'start' ? state.endDate : date
    }
  },
  [RESET_DATES]: (state, {payload}) => {
    return initialState
  },
  [UNSELECT_CAR]: (state, { payload }) => {
    return initialState
  }
}
export default createReducer(initialState, handlers)
