import { createAsyncAction } from 'helpers/redux'

export const SAVE_SIGNUP_STEP_DATA = 'SAVE_SIGNUP_STEP_DATA'
export const saveSignUpStepData = ({stepData, step}) => {
  return {
    type: SAVE_SIGNUP_STEP_DATA,
    payload: {
      step, stepData
    }
  }
}

export const UPDATE_LICENSE = 'UPDATE_LICENSE'
export const updateLicense = (licenseData) => {
  return {
    type: UPDATE_LICENSE,
    payload: licenseData
  }
}

export const SELECT_LICENSE = 'SELECT_LICESE'
export const selectLicense = (license) => {
  return {
    type: SELECT_LICENSE,
    payload: license
  }
}

export const SIGN_UP = createAsyncAction('SIGN_UP')
export const signUp = (user) => {
  return {
    type: SIGN_UP.REQUEST,
    payload: user
  }
}
