import { take, put, call, select } from 'redux-saga/effects'

import * as Api from 'helpers/api'
import {resizeAndUpload} from 'helpers/image'
import {
  SIGN_UP,
  VALIDATE_EMAIL
} from 'store/actions/registration'

async function uploadLicenses ({tlc, driving}) {
  let compressed = {}
  compressed['tlc_license_front'] = await resizeAndUpload(tlc.front)
  compressed['tlc_license_back'] = await resizeAndUpload(tlc.back)
  compressed['driving_license_front'] = await resizeAndUpload(driving.front)
  compressed['driving_license_back'] = await resizeAndUpload(driving.back)
  return compressed
}

function * register (query) {
  let response = yield call(Api.register, query)
  return response
}

function * resubmit (query, token) {
  delete query.password
  delete query.password_confirmation
  delete query.email
  let response = yield call(Api.resubmit, query, token)
  return response
}

function * registrationFlow () {
  while (true) {
    let {payload} = yield take(SIGN_UP.REQUEST)
    let state = yield select()
    let {isResubmitting} = state.registration
    let {auth} = state
    let {licences, user: userData} = payload
    console.log(licences, userData)
    try {
      let uploadedLicences = yield uploadLicenses(licences)
      let query = {
        ...userData,
        ...uploadedLicences
      }
      let response = {}

      console.log('query', query)
      if (isResubmitting) {
        response = yield call(resubmit, query, auth.token)
      } else {
        response = yield call(register, query)
      }

      const {data: {user, auth_token: token}} = response
      yield put({type: SIGN_UP.SUCCESS, payload: {user, token: token || auth.token}})
    } catch (error) {
      console.log('error response', error.response)
      console.log('error message', error.message)
      let payload = {}
      if (error.response) payload = error.response.data.message
      yield put({type: SIGN_UP.FAILURE, payload})
    }
  }
}

function * validateEmailFlow () {
  while (true) {
    let {payload} = yield take(VALIDATE_EMAIL.REQUEST)
    try {
      yield call(Api.validateEmail, payload.email)
      yield put({type: VALIDATE_EMAIL.SUCCESS, payload})
    } catch (error) {
      console.log('error response', error.response)
      console.log('error message', error.message)
      yield put({type: VALIDATE_EMAIL.FAILURE, payload: error.response.data.email})
    }
  }
}

export default [
  registrationFlow,
  validateEmailFlow
]
