import { fork, all } from 'redux-saga/effects'
import authSagas from './auth'
import registrationSagas from './registration'
import bookingsSagas from './bookings'

export default function * root () {
  const sagas = [
    ...authSagas,
    ...registrationSagas,
    ...bookingsSagas
  ]
  yield all([...sagas].map(saga => fork(saga)))
}
