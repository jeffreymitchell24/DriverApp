import { createReducer } from '../../helpers/redux'

import {
  FETCH_USER_BOOKINGS
} from 'store/actions/bookings'

const initialState = {
  pending: false,
  upcoming: [],
  history: [],
  fetchError: null
}

const handlers = {
  [FETCH_USER_BOOKINGS.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      pending: true,
      fetchError: null
    }
  },
  [FETCH_USER_BOOKINGS.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      pending: false,
      upcoming: payload.upcoming,
      history: payload.history
    }
  },
  [FETCH_USER_BOOKINGS.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      pending: false,
      fetchError: payload
    }
  }
}
export default createReducer(initialState, handlers)
