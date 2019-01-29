import { take, put, call, cancelled, select, fork } from 'redux-saga/effects'
import { Alert } from 'react-native'
import NavigationService from 'navigation/NavigationService'
import { Auth } from 'navigation/routeNames'
import * as Api from 'helpers/api'
import { toImageFile } from 'helpers/image'
import { takeLatest } from 'helpers/saga'
import {
  SIGN_IN,
  SIGN_OUT,
  RESET_PASSWORD,
  CHECK_STATUS,
  UPDATE_USER_IMAGE,
  UPDATE_USER_PROFILE,
  REJECT_USER,
  CHECK_PROFILE_UPDATE
} from 'store/actions/auth'

function* authorize({ payload }) {
  const { email, password } = payload
  try {
    const response = yield call(Api.authorize, email, password)

    const { user, auth_token: token } = response

    yield put({ type: SIGN_IN.SUCCESS, payload: { user, token } })
  } catch (error) {
    console.log('authorize error', error)

    yield put({
      type: SIGN_IN.FAILURE,
      payload: error.response.data.error.message
    })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

function* loginFlow() {
  yield takeLatest(SIGN_IN.REQUEST, authorize)
}

function* resetPasswordFlow() {
  while (true) {
    const { payload: email } = yield take(RESET_PASSWORD.REQUEST)
    try {
      let response = yield call(Api.resetPassword, email)

      yield put({ type: RESET_PASSWORD.SUCCESS, payload: {} })
    } catch (error) {
      console.log('resetPasswordFlow error', error)

      yield put({
        type: RESET_PASSWORD.FAILURE,
        payload: error.response.data.message
      })
    }
  }
}

function* checkStatus(action) {
  let state = yield select()

  let { token } = state.auth

  try {
    let response = yield call(Api.checkStatus, token)

    const { status, profileUpdateStatus } = response

    yield put({
      type: CHECK_STATUS.SUCCESS,
      payload: { status, profileUpdateStatus }
    })
  } catch (error) {
    console.log('checkStatus error', error)

    yield put({
      type: CHECK_STATUS.FAILURE,
      payload: error.response.data.error.message
    })
  }
}

function* checkStatusFlow() {
  yield takeLatest(CHECK_STATUS.REQUEST, checkStatus)
}

function* updateProfileImage({ payload: photoUri }) {
  let imageFile = yield toImageFile(photoUri)

  let query = { photo: imageFile }

  let data = Api.toFormData(query)

  let state = yield select()

  let { token } = state.auth

  try {
    let { user } = yield call(Api.updateUser, { token, data })

    yield put({ type: UPDATE_USER_IMAGE.SUCCESS, payload: user })
  } catch (error) {
    console.log('updateProfileImage error', error)

    yield put({
      type: UPDATE_USER_IMAGE.FAILURE,
      payload: error.response.data.error.message
    })
  }
}

function* updateProfileImageFlow() {
  while (true) {
    let action = yield take(UPDATE_USER_IMAGE.REQUEST)

    yield fork(checkUserStatusWrapper, () => updateProfileImage(action))
  }
}

function* updateProfileData({ payload }) {
  let data = Api.toFormData(payload)

  let state = yield select()

  let { token } = state.auth

  try {
    let { user } = yield call(Api.updateUser, { token, data })

    yield put({ type: UPDATE_USER_PROFILE.SUCCESS, payload: user })
  } catch (error) {
    console.log('updateProfileData error', error)

    yield put({
      type: UPDATE_USER_PROFILE.FAILURE,
      payload: error.response.data.error.message
    })
  }
}

function* updateProfileDataFlow() {
  yield takeLatest(
    UPDATE_USER_PROFILE.REQUEST,
    checkUserStatusWrapper,
    updateProfileData
  )
}

function* rejectUserFlow() {
  while (true) {
    yield take(REJECT_USER)

    setTimeout(
      () =>
        Alert.alert(
          'Account was rejected',
          'Please sign in and re-submit your documents'
        ),
      200
    )

    yield put({ type: SIGN_OUT })

    NavigationService.reset(Auth)
  }
}

// pending,approved,rejected
function* profileUpdateCheck() {
  let state = yield select()

  let { token } = state.auth

  try {
    let { user } = yield call(Api.getUser, { token })

    let { profile_update_request: profileUpdRequest = {}, status } = user

    if (status === 'rejected') {
      yield put({ type: REJECT_USER })
    } else {
      if (profileUpdRequest && profileUpdRequest.status === 'rejected') {
        setTimeout(() => Alert.alert('', 'Profile update was rejected'), 200)
      }

      yield put({ type: UPDATE_USER_PROFILE.SUCCESS, payload: user })
    }
  } catch (error) {
    console.log('profileUpdateCheck error', error)

    yield put({
      type: CHECK_PROFILE_UPDATE.FAILURE,
      payload: error.response.data.error.message
    })
  }
}

function* profileUpdateCheckFlow() {
  yield takeLatest(
    CHECK_PROFILE_UPDATE.REQUEST,
    checkUserStatusWrapper,
    profileUpdateCheck
  )
}

export function* checkUserStatusWrapper(cbSaga, action) {
  let state = yield select()
  let { token } = state.auth

  try {
    let response = yield call(Api.checkStatus, token)

    const { status } = response

    if (status === 'rejected') {
      yield put({ type: REJECT_USER })
    } else {
      yield fork(cbSaga, action)
    }
  } catch (error) {
    console.log('checkUserStatusWrapper error', error)

    yield put({
      type: CHECK_STATUS.FAILURE,
      payload: error.response.data.error.message
    })
  }
}

export default [
  loginFlow,
  rejectUserFlow,
  resetPasswordFlow,
  checkStatusFlow,
  updateProfileImageFlow,
  updateProfileDataFlow,
  profileUpdateCheckFlow
]
