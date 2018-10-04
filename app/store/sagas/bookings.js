import { take, put, call, select, all } from 'redux-saga/effects'
import {takeLatest} from 'helpers/saga'
import * as Api from 'helpers/api'

import {
  FETCH_USER_BOOKINGS
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

export default [
  fetchUserBookingsFlow
]
