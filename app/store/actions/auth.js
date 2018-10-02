
import { createAsyncAction } from 'helpers/redux'
export const SIGN_IN = createAsyncAction('SIGN_IN')
export const signIn = (credentials) => {
  return {
    type: SIGN_IN.REQUEST,
    payload: credentials

  }
}

export const SIGN_OUT = 'SIGN_OUT'
export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const RESET_PASSWORD = createAsyncAction('RESET_PASSWORD')
export const resetPasword = (email) => {
  return {
    type: RESET_PASSWORD.REQUEST,
    payload: email
  }
}

export const CHECK_STATUS = createAsyncAction('CHECK_STATUS')
export const checkStatus = (id) => {
  return {
    type: CHECK_STATUS.REQUEST,
    payload: {id}
  }
}
