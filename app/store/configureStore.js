import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'

export default (rootReducer, rootSaga) => {
  const middlewares = [
    thunk
  ]
  const enhancers = []

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
  }

  // const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null
  const sagaMonitor = null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middlewares.push(sagaMiddleware)

  const composeEnhancers = composeWithDevTools

  enhancers.push(composeEnhancers(applyMiddleware(...middlewares)))

  const persistedReducer = persistCombineReducers(persistConfig, rootReducer)

  const createAppropriateStore = createStore
  const store = createAppropriateStore(persistedReducer, compose(...enhancers))

  sagaMiddleware.run(rootSaga)

  // store = createStore(persistedReducer, composeEnhancers(
  //   applyMiddleware(thunk)
  // ))
  let persistor = persistStore(store)
  // persistor.purge()

  return { persistor, store }
}
