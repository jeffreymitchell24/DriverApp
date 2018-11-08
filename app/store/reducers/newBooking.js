import { createReducer } from '../../helpers/redux'

import { ADD_ADDRESS_TO_HISTORY } from '../actions/newBooking'

import _ from 'lodash'

const initialState = {
  addressHistory: []
}

const handlers = {
  [ADD_ADDRESS_TO_HISTORY]: (state, { payload }) => {
    return {
      ...state,
      addressHistory: [payload, ..._.slice(state.addressHistory || [], 0, 4)]
    }
  }
}
export default createReducer(initialState, handlers)
