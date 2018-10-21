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
  CHECK_LICENSE,
  CANCEL_RIDE,
  END_RIDE,
  LATE_FOR_RIDE,
  SUBMIT_RECEIPT,
  HELP_RIDE_DAMAGED,
  HELP_RIDE_MALFUNCTIONED
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
  const {carId: id} = payload // photoUri
  // let imageFile = yield toImageFile(photoUri)
  // let query = {photo: imageFile}
  // let data = Api.toFormData(query)
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.checkRideLicense, {id, token}) // data
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
function * rideCancel ({payload}) {
  const {carId: id} = payload
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.cancelRide, {id, token})
    console.log('response', response)
    yield put({type: CANCEL_RIDE.SUCCESS, payload: response})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: CANCEL_RIDE.FAILURE, payload: error.response.data.error.message})
  }
}

function * rideCancelFlow () {
  yield takeLatest(CANCEL_RIDE.REQUEST, checkUserStatusWrapper, rideCancel)
}
// function * rideEnd ({payload}) {
//   const {carId: id} = payload
//   let state = yield select()
//   let {token} = state.auth
//   try {
//     let response = yield call(Api.endRide, {id, data, token})
//     console.log('response', response)
//     yield put({type: END_RIDE.SUCCESS, payload: response})
//   } catch (error) {
//     console.log('error response', error.response)
//     console.log('error message', error.message)
//     yield put({type: END_RIDE.FAILURE, payload: error.response.data.error.message})
//   }
// }

// function * rideEndFlow () {
//   yield takeLatest(END_RIDE.REQUEST, checkUserStatusWrapper, rideEnd)
// }

function * rideDamaged ({payload}) {
  console.log('payload', payload)
  const {carId: id, data: {photos, description}} = payload
  let query = {description}
  if (photos.length > 0) {
    let transformedPhotos = yield transformPhotoArray(photos)
    query['car_photos'] = transformedPhotos
  }
  console.log('query', query)
  let data = Api.toFormData(query)
  console.log('data', data)
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.rideDamaged, {id, token, data})
    console.log('response', response)
    yield put({type: HELP_RIDE_DAMAGED.SUCCESS, payload: response})
  } catch (error) {
    console.log('error', error)
    console.log('error.request._response', error.request._response)
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: HELP_RIDE_DAMAGED.FAILURE, payload: (error.response && error.response.data.error.message) || ''})
  }
}

function * rideDamagedFlow () {
  yield takeLatest(HELP_RIDE_DAMAGED.REQUEST, checkUserStatusWrapper, rideDamaged)
}

function * rideMalfunction ({payload}) {
  const {carId: id, data: {photos, description, plate}} = payload
  let query = {description, 'license_plate': plate}
  if (photos.length > 0) {
    let transformedPhotos = yield transformPhotoArray(photos)
    query['car_photos'] = transformedPhotos
  }
  console.log('query', query)
  let data = Api.toFormData(query)
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.rideMalfunction, {id, token, data})
    console.log('response', response)
    yield put({type: HELP_RIDE_MALFUNCTIONED.SUCCESS, payload: response})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: HELP_RIDE_MALFUNCTIONED.FAILURE, payload: error.response.data.error.message})
  }
}

function * rideMalfunctionFlow () {
  yield takeLatest(HELP_RIDE_MALFUNCTIONED.REQUEST, checkUserStatusWrapper, rideMalfunction)
}

function * rideLate ({payload}) {
  const {carId: id, data: {photos, reason, delay}} = payload
  let query = {reason, 'delay_minutes': delay}
  if (photos.length > 0) {
    let transformedPhotos = yield transformPhotoArray(photos)
    query['car_photos'] = transformedPhotos
  }
  console.log('query', query)
  let data = Api.toFormData(query)
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.rideLate, {id, token, data})
    console.log('response', response)
    yield put({type: LATE_FOR_RIDE.SUCCESS, payload: response})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: LATE_FOR_RIDE.FAILURE, payload: error.response.data.error.message})
  }
}

function * rideLateFlow () {
  yield takeLatest(LATE_FOR_RIDE.REQUEST, checkUserStatusWrapper, rideLate)
}

function * submitRideReceipt ({payload}) {
  const {carId: id, data: {location, title, price, date, time, photo}} = payload
  let imageFile = yield toImageFile(photo)
  let query = {location, title, price, 'receipt_date': date, time, photo: imageFile}
  console.log('query', query)
  let data = Api.toFormData(query)
  let state = yield select()
  let {token} = state.auth
  try {
    let response = yield call(Api.sendRideReceipt, {id, token, data})
    console.log('response', response)
    yield put({type: SUBMIT_RECEIPT.SUCCESS, payload: response})
  } catch (error) {
    console.log('error response', error.response)
    console.log('error message', error.message)
    yield put({type: SUBMIT_RECEIPT.FAILURE, payload: error.response.data.error.message})
  }
}

function * submitRideReceiptFlow () {
  yield takeLatest(SUBMIT_RECEIPT.REQUEST, checkUserStatusWrapper, submitRideReceipt)
}

async function transformPhotoArray (photos) {
  let transformedPhotos = await Promise.all(photos.map(async (photoUri) => {
    let imageFile = await toImageFile(photoUri)
    return imageFile
  }))
  console.log('transformedPhotos', transformedPhotos)
  return transformedPhotos
}

export default [
  fetchUserBookingsFlow,
  fetchAvailableCarsFlow,
  bookCarFlow,
  fetchCarDetailsFlow,
  checkRideLicenseFlow,
  rideCancelFlow,
  rideDamagedFlow,
  rideMalfunctionFlow,
  rideLateFlow,
  submitRideReceiptFlow
  // rideEndFlow
]
