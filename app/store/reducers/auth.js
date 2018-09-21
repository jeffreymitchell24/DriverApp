import { createReducer } from '../../helpers/redux'

import {
  SIGN_IN,
  SIGN_OUT,
  RESET_PASSWORD
} from 'store/actions/auth'
import {SIGN_UP} from 'store/actions/registration'

const initialState = {
  pending: false,
  authError: null,
  resetPasswordSent: false,
  resetError: null,
  resetPending: false,
  user: null,
  token: null
}

const handlers = {
  [SIGN_IN.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      authError: null,
      pending: true
    }
  },
  [SIGN_IN.SUCCESS]: (state, { payload }) => {
    const {user = null, token} = payload
    return {
      ...state,
      user,
      token,
      pending: false
    }
  },
  [SIGN_IN.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      authError: payload,
      pending: false
    }
  },
  [SIGN_UP.SUCCESS]: (state, { payload }) => {
    const {user = null, token} = payload
    return {
      ...state,
      user,
      token,
      pending: false
    }
  },
  [SIGN_OUT]: (state, { payload }) => {
    return initialState
  },
  [RESET_PASSWORD.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      resetPasswordSent: false,
      resetError: null,
      resetPending: true
    }
  },
  [RESET_PASSWORD.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      resetPasswordSent: true,
      resetPending: false
    }
  },
  [RESET_PASSWORD.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      resetPasswordSent: true,
      resetError: payload,
      resetPending: false
    }
  }
}
export default createReducer(initialState, handlers)
