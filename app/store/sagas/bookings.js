import { take, put, call, select, all, fork } from 'redux-saga/effects'
import {takeLatest} from 'helpers/saga'
import * as Api from 'helpers/api'
import {toImageFile} from 'helpers/image'
import {checkUserStatusWrapper} from './auth'
import {
  FETCH_USER_BOOKINGS,
  FETCH_AVAILABLE_CARS,
  FETCH_SELECTED_CAR,
  BOOK_CAR,
  CHECK_LICENSE
} from 'store/actions/bookings'

function * fetchUserBookings (action) {
  let state = yield select()
  let {token} = state.auth
  try {
    let [upcoming, history] = yield all([
      Api.fetchUpcomingBookings(token),
      Api.fetchBookingsHistory(token)
    ])
    console.log('Booking Response', upcoming, history)
    yield put({type: FETCH_USER_BOOKINGS.SUCCESS, payload: {upcoming: upcoming.bookings, history: history.bookings}})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: FETCH_USER_BOOKINGS.FAILURE, payload: error.response.data.message})
  }
}

function * fetchUserBookingsFlow () {
  yield takeLatest(FETCH_USER_BOOKINGS.REQUEST, checkUserStatusWrapper, fetchUserBookings)
}

function * fetchAvailableCars () {
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.fetchAvailableCars, token)
    yield put({type: FETCH_AVAILABLE_CARS.SUCCESS, payload: response})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: FETCH_AVAILABLE_CARS.FAILURE, payload: error.response.data.error.message})
  }
}

function * fetchAvailableCarsFlow () {
  yield takeLatest(FETCH_AVAILABLE_CARS.REQUEST, checkUserStatusWrapper, fetchAvailableCars)
}

function * fetchCarDetails ({payload: id}) {
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.fetchCarDetails, {token, id})
    yield put({type: FETCH_SELECTED_CAR.SUCCESS, payload: response})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: FETCH_SELECTED_CAR.FAILURE, payload: error.response.data.error.message})
  }
}

function * fetchCarDetailsFlow () {
  yield takeLatest(FETCH_SELECTED_CAR.REQUEST, checkUserStatusWrapper, fetchCarDetails)
}

function * bookCar ({payload}) {
  let {id, timeStamps} = payload
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.bookCar, {token, id, timeStamps})
    console.log('response', response)
    yield put({type: BOOK_CAR.SUCCESS, payload: {booking: response.booking}})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: BOOK_CAR.FAILURE, payload: error.response.data.error.message})
  }
}

function * bookCarFlow () {
  while (true) {
    let action = yield take(BOOK_CAR.REQUEST)
    yield fork(checkUserStatusWrapper, () => bookCar(action))
  }
}

function * checkRideLicense ({payload}) {
  const {id, photoUri} = payload
  let imageFile = yield toImageFile(photoUri)
  let query = {photo: imageFile}
  let data = Api.toFormData(query)
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.checkRideLicense, {data, id, token})
    console.log('response', response)
    yield put({type: CHECK_LICENSE.SUCCESS, payload: response})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: CHECK_LICENSE.FAILURE, payload: error.response.data.error.message})
  }
}

function * checkRideLicenseFlow () {
  yield takeLatest(CHECK_LICENSE.REQUEST, checkUserStatusWrapper, checkRideLicense)
}

export default [
  fetchUserBookingsFlow,
  fetchAvailableCarsFlow,
  bookCarFlow,
  fetchCarDetailsFlow,
  checkRideLicenseFlow
]
