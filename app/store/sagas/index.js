import { fork, all } from 'redux-saga/effects'
import authSagas from './auth'
import registrationSagas from './registration'

export default function * root () {
  const sagas = [
    ...authSagas,
    ...registrationSagas
  ]
  yield all([...sagas].map(saga => fork(saga)))
}
