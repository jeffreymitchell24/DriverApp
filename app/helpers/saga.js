import {cancel, fork, take} from 'redux-saga/effects'

export const takeLatest = (pattern, saga, ...args) => fork(function * () {
  let lastTask
  while (true) {
    console.log('takeLatest take')
    const action = yield take(pattern)
    if (lastTask) {
      console.log('takeLatest cancel')
      yield cancel(lastTask) // cancel is no-op if the task has already terminated
    }
    lastTask = yield fork(saga, ...args.concat(action))
  }
})

// export const handleError = ({error}) => {

// }
