import { take, put, call, select } from 'redux-saga/effects'

import * as Api from 'helpers/api'
import { toImageFile } from 'helpers/image'
import { SIGN_UP } from 'store/actions/registration'
import { VALIDATE_EMAIL } from 'store/actions/email'

async function transformLicenses({ tlc, driving }) {
  let compressed = {}
  compressed['tlc_license_front'] = await toImageFile(tlc.front)
  compressed['tlc_license_back'] = await toImageFile(tlc.back)
  compressed['driving_license_front'] = await toImageFile(driving.front)
  compressed['driving_license_back'] = await toImageFile(driving.back)

  return compressed
}

function* register(query) {
  let response = yield call(Api.register, query)
  return response
}

function* resubmit(query, token) {
  delete query.password
  delete query.password_confirmation
  delete query.email

  let response = yield call(Api.resubmit, query, token)

  return response
}

function* registrationFlow() {
  while (true) {
    let { payload } = yield take(SIGN_UP.REQUEST)
    let state = yield select()

    let { isResubmitting } = state.registration
    let { auth } = state
    let { licences, user: userData } = payload

    try {
      let uploadedLicences = yield transformLicenses(licences)

      let query = {
        ...userData,
        ...uploadedLicences
      }

      let formattedQuery = Api.toFormData(query)
      let response = {}

      if (isResubmitting && auth.user) {
        response = yield call(resubmit, formattedQuery, auth.token)
      } else {
        response = yield call(register, formattedQuery)
      }

      const { user, auth_token: token } = response
      // todo uncoment, now can't check auth
      yield call(Api.sendDeviceToken, token)

      yield put({
        type: SIGN_UP.SUCCESS,
        payload: { user, token: token || auth.token }
      })
    } catch (error) {
      console.log('registrationFlow error', error)

      let payload = {}

      if (error.response) {
        payload = error.response.data.error.message
      }

      yield put({ type: SIGN_UP.FAILURE, payload })
    }
  }
}

function* validateEmailFlow() {
  while (true) {
    let { payload } = yield take(VALIDATE_EMAIL.REQUEST)

    try {
      yield call(Api.validateEmail, payload.email)

      yield put({ type: VALIDATE_EMAIL.SUCCESS, payload })
    } catch (error) {
      console.log('validateEmailFlow error', error)

      let responseError = error.response.data.error.message
      let errorMsg =
        responseError === 'Email is taken'
          ? 'Email already exists'
          : responseError

      yield put({ type: VALIDATE_EMAIL.FAILURE, payload: errorMsg })
    }
  }
}

export default [registrationFlow, validateEmailFlow]
