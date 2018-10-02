import {cancel, fork, take} from 'redux-saga/effects'

export const takeLatest = (pattern, saga, ...args) => fork(function * () {
  let lastTask
  while (true) {
    const action = yield take(pattern)
    if (lastTask) {
      yield cancel(lastTask) // cancel is no-op if the task has already terminated
    }
    lastTask = yield fork(saga, ...args.concat(action))
  }
})
