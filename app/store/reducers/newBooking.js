import { createReducer } from '../../helpers/redux'

import {
  ADD_ADDRESS_TO_HISTORY,
  LOAD_CAR_CATEGORIES,
  SET_DATE,
  RESET_DATES
} from '../actions/newBooking'

import { UNSELECT_CAR, FETCH_SELECTED_CAR } from 'store/actions/bookings'

import _ from 'lodash'

const initialState = {
  addressHistory: [],
  carCategories: [],
  isFetchingCarCategories: false,
  startDate: null,
  endDate: null
}

const handlers = {
  [ADD_ADDRESS_TO_HISTORY]: (state, { payload }) => {
    return {
      ...state,
      addressHistory: [
        payload,
        ..._.slice(
          (state.addressHistory || []).filter(item => item.id !== payload.id),
          0,
          4
        )
      ]
    }
  },
  [LOAD_CAR_CATEGORIES.REQUEST]: state => {
    return {
      ...state,
      isFetchingCarCategories: true,
      carCategories: []
    }
  },
  [LOAD_CAR_CATEGORIES.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isFetchingCarCategories: false,
      carCategories: payload.categories
    }
  },
  [SET_DATE]: (state, { payload }) => {
    const { type, date } = payload
    return {
      startDate: type === 'start' ? date : state.startDate,
      endDate: type === 'start' ? null : date
    }
  },
  [RESET_DATES]: (state, { payload }) => {
    return {
      ...state,
      startDate: null,
      endDate: null
    }
  },
  [UNSELECT_CAR]: (state, { payload }) => {
    console.log(UNSELECT_CAR)
    return {
      ...state,
      startDate: null,
      endDate: null
    }
  },
  [FETCH_SELECTED_CAR.REQUEST]: state => {
    return {
      ...state,
      startDate: null,
      endDate: null
    }
  }
}
export default createReducer(initialState, handlers)
