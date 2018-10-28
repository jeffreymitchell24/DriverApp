import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
// import createSensitiveStorage from 'redux-persist-sensitive-storage'
import storage from 'redux-persist/lib/storage'
export default (rootReducer, rootSaga) => {
  const middlewares = [
    thunk
  ]
  const enhancers = []
  // const sensitiveStorage = createSensitiveStorage({
  //   keychainService: 'CarflowKeychain',
  //   sharedPreferencesName: 'CarflowPrefs'
  // })
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
  }

  const sagaMonitor = null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middlewares.push(sagaMiddleware)

  const composeEnhancers = composeWithDevTools

  enhancers.push(composeEnhancers(applyMiddleware(...middlewares)))

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const createAppropriateStore = createStore
  const store = createAppropriateStore(persistedReducer, compose(...enhancers))

  sagaMiddleware.run(rootSaga)

  let persistor = persistStore(store)
  // persistor.purge()

  return { persistor, store }
}
