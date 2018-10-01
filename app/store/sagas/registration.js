import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as Api from 'helpers/api'
import {resizeAndUpload} from 'helpers/image'
import {
  SIGN_UP,
  SAVE_CREDENTIALS
} from 'store/actions/registration'

async function uploadLicenses ({tlc, driving}) {
  let compressed = {}
  compressed['tlc_license_front'] = await resizeAndUpload(tlc.front)
  compressed['tlc_license_back'] = await resizeAndUpload(tlc.back)
  compressed['driving_license_front'] = await resizeAndUpload(driving.front)
  compressed['driving_license_back'] = await resizeAndUpload(driving.back)
  return compressed
}

function * registrationFlow () {
  while (true) {
    let {payload} = yield take(SIGN_UP.REQUEST)
    let {licences, user: userData} = payload
    console.log(licences, userData)
    try {
      let uploadedLicences = yield uploadLicenses(licences)
      let query = {
        ...userData,
        ...uploadedLicences
      }
      console.log('query', query)
      const {user, auth_token: token} = yield call(Api.register, query)
      yield put({type: SIGN_UP.SUCCESS, payload: {user, token}})
    } catch (error) {
      console.log('error response', error.response)
      console.log('error message', error.message)
      yield put({type: SIGN_UP.FAILURE, payload: error.response.data.message})
    }
  }
}

function * validateEmailFlow () {
  while (true) {
    let {payload} = yield take(SAVE_CREDENTIALS.REQUEST)
    try {
      // yield call(Api.validateEmail, payload.email)
      yield put({type: SAVE_CREDENTIALS.SUCCESS, payload})
    } catch (error) {
      console.log('error response', error.response)
      console.log('error message', error.message)
      yield put({type: SAVE_CREDENTIALS.FAILURE, payload: error.response.data.message})
    }
  }
}

export default [
  registrationFlow,
  validateEmailFlow
]
