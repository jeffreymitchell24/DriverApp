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
export const SAVE_CREDENTIALS = 'SAVE_CREDENTIALS'
export const saveCredentials = (credentials) => {
  return {
    type: SAVE_CREDENTIALS,
    payload: credentials
  }
}

export const SAVE_PROFILE_INFO = 'SAVE_PROFILE_INFO'
export const saveProfileInfo = (profile) => {
  return {
    type: SAVE_PROFILE_INFO,
    payload: profile
  }
}

export const UPDATE_LICENSE = 'UPDATE_LICENSE'
export const updateLicense = (licenseData) => {
  return {
    type: UPDATE_LICENSE,
    payload: licenseData
  }
}

export const UPDATE_RIDESHARE_APPS = 'UPDATE_RIDESHARE_APPS'
export const updatedRideshareApps = (apps) => {
  return {
    type: UPDATE_RIDESHARE_APPS,
    payload: apps
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
export const signUp = ({licences, apps, credentials, personalInfo}) => {
  let {email, password, confirmPassword} = credentials
  let {fullname, address, phone} = personalInfo
  let {main, other} = apps
  let appsString = [...main, ...other].join(',')
  let user = {
    email,
    password,
    'password_confirmation': confirmPassword,
    'full_name': fullname,
    address,
    phone,
    'ridesharing_approved': true,
    'ridesharing_apps': appsString
  }
  return {
    type: SIGN_UP.REQUEST,
    payload: { user, licences }
  }
}

export const SAVE_RESUBMIT_STATUS = 'SAVE_RESUBMIT_STATUS'
export const saveResubmitStatus = (isResubmitting) => {
  return {
    type: SAVE_RESUBMIT_STATUS,
    payload: isResubmitting
  }
}
