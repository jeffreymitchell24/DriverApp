import { take, put, call, select, all } from 'redux-saga/effects'
import {takeLatest} from 'helpers/saga'
import * as Api from 'helpers/api'

import {
  FETCH_USER_BOOKINGS,
  FETCH_AVAILABLE_CARS,
  BOOK_CAR
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
    yield put({type: FETCH_USER_BOOKINGS.SUCCESS, payload: {upcoming, history}})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: FETCH_USER_BOOKINGS.FAILURE, payload: error.response.data.message})
  }
}

function * fetchUserBookingsFlow () {
  yield takeLatest(FETCH_USER_BOOKINGS.REQUEST, fetchUserBookings)
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
  yield takeLatest(FETCH_AVAILABLE_CARS.REQUEST, fetchAvailableCars)
}

function * bookCarFlow () {
  while (true) {
    let {payload: {id, timeStamps}} = yield take(BOOK_CAR.REQUEST)
    let state = yield select()
    let {token} = state.auth
    try {
      let response = yield call(Api.bookCar, {token, id, timeStamps})
      console.log('response', response)
      yield put({type: BOOK_CAR.SUCCESS, payload: {}})
    } catch (error) {
      console.log('error response', error.response)
      console.log('error message', error.message)
      yield put({type: BOOK_CAR.FAILURE, payload: error.response.data.error.message})
    }
  }
}

export default [
  fetchUserBookingsFlow,
  fetchAvailableCarsFlow,
  bookCarFlow
]
