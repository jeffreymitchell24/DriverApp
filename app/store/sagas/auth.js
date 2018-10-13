import { take, put, call, cancelled, select, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {Alert} from 'react-native'
import NavigationService from 'navigation/NavigationService'
import {Auth} from 'navigation/routeNames'
import * as Api from 'helpers/api'
import {toImageFile} from 'helpers/image'
import {takeLatest} from 'helpers/saga'
import {
  SIGN_IN,
  SIGN_OUT,
  RESET_PASSWORD,
  CHECK_STATUS,
  UPDATE_USER_IMAGE,
  REJECT_USER
} from 'store/actions/auth'

function * authorize ({payload}) {
  const {email, password} = payload
  try {
    console.log(email, password)
    yield call(delay, 3000)
    const {user, auth_token: token} = yield call(Api.authorize, email, password)
    yield put({type: SIGN_IN.SUCCESS, payload: {user, token}})
    // yield call(Api.storeItem, {token})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: SIGN_IN.FAILURE, payload: error.response.data.error.message})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

function * loginFlow () {
  yield takeLatest(SIGN_IN.REQUEST, authorize)
  // while (true) {
  //   const {payload: {email, password}} = yield take(SIGN_IN.REQUEST)
  //   // fork return a Task object
  //   const task = yield fork(authorize, email, password)
  //   const action = yield take([SIGN_OUT, SIGN_IN.FAILURE])
  //   if (action.type === SIGN_OUT) yield cancel(task)
  //   // yield call(Api.clearItem, 'token')
  // }
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
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.checkStatus, token)
    const {status} = response
    yield put({type: CHECK_STATUS.SUCCESS, payload: {status}})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: CHECK_STATUS.FAILURE, payload: error.response.data.error.message})
  }
}

function * checkStatusFlow () {
  yield takeLatest(CHECK_STATUS.REQUEST, checkStatus)
}

function * updateProfileImage ({payload: photoUri}) {
  let imageFile = yield toImageFile(photoUri)
  let query = {photo: imageFile}
  let data = Api.toFormData(query)
  let state = yield select()
  let {token} = state.auth
  try {
    let {user} = yield call(Api.updateUser, {token, data})
    console.log('user', user)
    yield put({type: UPDATE_USER_IMAGE.SUCCESS, payload: user})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: UPDATE_USER_IMAGE.FAILURE, payload: error.response.data.error.message})
  }
}

function * updateProfileImageFlow () {
  while (true) {
    let action = yield take(UPDATE_USER_IMAGE.REQUEST)
    yield fork(checkUserStatusWrapper, () => updateProfileImage(action))
  }
}

function * rejectUserFlow () {
  while (true) {
    yield take(REJECT_USER)
    Alert.alert('Account was rejected', 'Please sign in and re-submit your documents')
    yield put({type: SIGN_OUT})
    NavigationService.reset(Auth)
  }
}

export function * checkUserStatusWrapper (cbSaga, action) {
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.checkStatus, token)
    const {status} = response
    if (status === 'rejected') {
      yield put({type: REJECT_USER})
    } else {
      yield fork(cbSaga, action)
    }
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: CHECK_STATUS.FAILURE, payload: error.response.data.error.message})
  }
}

export default [
  loginFlow,
  rejectUserFlow,
  resetPasswordFlow,
  checkStatusFlow,
  updateProfileImageFlow
]
