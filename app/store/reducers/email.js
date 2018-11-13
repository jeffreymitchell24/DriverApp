import { createReducer } from '../../helpers/redux'

import { VALIDATE_EMAIL } from 'store/actions/email'

const initialState = {
  isEmailValidating: false,
  isEmailValid: false,
  emailError: null
}

const handlers = {
  [VALIDATE_EMAIL.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      isEmailValid: false,
      isEmailValidating: true,
      emailError: null
    }
  },
  [VALIDATE_EMAIL.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isEmailValidating: false,
      isEmailValid: true,
      emailError: null
    }
  },
  [VALIDATE_EMAIL.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      isEmailValid: false,
      isEmailValidating: false,
      emailError: payload
    }
  }
}
export default createReducer(initialState, handlers)
