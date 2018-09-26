import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export default (rootReducer, rootSaga) => {
  const middlewares = [
    thunk
  ]
  const enhancers = []

  // const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null
  const sagaMonitor = null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middlewares.push(sagaMiddleware)

  const composeEnhancers = composeWithDevTools

  enhancers.push(composeEnhancers(applyMiddleware(...middlewares)))

  const createAppropriateStore = createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  sagaMiddleware.run(rootSaga)

  return store
}
