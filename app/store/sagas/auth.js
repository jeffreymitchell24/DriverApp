import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as Api from 'helpers/api'
import {takeLatest} from 'helpers/saga'
import {
  SIGN_IN,
  SIGN_OUT,
  RESET_PASSWORD,
  CHECK_STATUS
} from 'store/actions/auth'

function * authorize (userData, password) {
  try {
    console.log(userData, password)
    yield call(delay, 3000)
    const {user, auth_token: token} = yield call(Api.authorize, userData, password)
    yield put({type: SIGN_IN.SUCCESS, payload: {user, token}})
    // yield call(Api.storeItem, {token})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: SIGN_IN.FAILURE, payload: error.response.data.message})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

function * loginFlow () {
  while (true) {
    const {payload: {email, password}} = yield take(SIGN_IN.REQUEST)
    // fork return a Task object
    const task = yield fork(authorize, email, password)
    const action = yield take([SIGN_OUT, SIGN_IN.FAILURE])
    if (action.type === SIGN_OUT) yield cancel(task)
    // yield call(Api.clearItem, 'token')
  }
}

function * resetPasswordFlow () {
  while (true) {
    const {payload: email} = yield take(RESET_PASSWORD.REQUEST)
    try {
      let response = yield call(Api.resetPassword, email)
      console.log('response', response)
      yield put({type: RESET_PASSWORD.SUCCESS, payload: {}})
    } catch (error) {
      console.log('error response', error.response)
      console.log('error message', error.message)
      yield put({type: RESET_PASSWORD.FAILURE, payload: error.response.data.message})
    }
  }
}

function * checkStatus (action) {
  const { payload } = action
  const { id } = payload
  try {
    let response = yield call(Api.checkStatus, id)
    const {status} = response
    yield put({type: CHECK_STATUS.SUCCESS, payload: {status}})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: CHECK_STATUS.FAILURE, payload: error.response.data.message})
  }
}

function * checkStatusFlow () {
  yield takeLatest(CHECK_STATUS.REQUEST, checkStatus)
}

export default [
  loginFlow,
  resetPasswordFlow,
  checkStatusFlow
]
