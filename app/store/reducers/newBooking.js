import { createReducer } from '../../helpers/redux'

import {
  ADD_ADDRESS_TO_HISTORY,
  LOAD_CAR_CATEGORIES
} from '../actions/newBooking'

import _ from 'lodash'

const initialState = {
  addressHistory: [],
  carCategories: [],
  isFetchingCarCategories: false
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
  }
}
export default createReducer(initialState, handlers)
