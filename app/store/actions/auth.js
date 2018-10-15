
import { createAsyncAction } from 'helpers/redux'
export const SIGN_IN = createAsyncAction('SIGN_IN')
export const signIn = (credentials) => {
  return {
    type: SIGN_IN.REQUEST,
    payload: credentials

  }
}

export const REJECT_USER = 'REJECT_USER'

export const DISCARD_SIGNIN_ERROR = 'DISCARD_SIGNIN_ERROR'
export const discardSigninError = () => ({
  type: DISCARD_SIGNIN_ERROR
})

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
export const DISCARD_RESET_ERROR = 'DISCARD_RESET_ERROR'
export const discardResetError = () => ({
  type: DISCARD_RESET_ERROR
})

export const CHECK_STATUS = createAsyncAction('CHECK_STATUS')
export const checkStatus = (id) => {
  return {
    type: CHECK_STATUS.REQUEST,
    payload: {id}
  }
}

export const SAVE_REJECTED_ID = 'SAVE_REJECTED_ID'
export const saveRejectedId = (id) => {
  return {
    type: SAVE_REJECTED_ID,
    payload: {id}
  }
}

export const UPDATE_USER_IMAGE = createAsyncAction('UPDATE_USER_IMAGE')
export const updateUserImage = (photoUri) => {
  return {
    type: UPDATE_USER_IMAGE.REQUEST,
    payload: photoUri
  }
}

export const UPDATE_USER_PROFILE = createAsyncAction('UPDATE_USER_PROFILE')
export const updateUserProfile = (data) => {
  return {
    type: UPDATE_USER_PROFILE.REQUEST,
    payload: data
  }
}
