import { fork, all } from 'redux-saga/effects'
import authSagas from './auth'

export default function * root () {
  const sagas = [
    ...authSagas
  ]
  yield all([...sagas].map(saga => fork(saga)))
}
