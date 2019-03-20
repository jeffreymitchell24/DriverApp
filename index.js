import React from 'react'
import {AppRegistry, Platform} from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import App from './app/App'
import {name as appName} from './app.json'
import rootSaga from 'store/sagas'
import rootReducer from 'store/reducers'
import { Provider } from 'react-redux'
import configureStore from './app/store/configureStore'
const {store, persistor} = configureStore(rootReducer, rootSaga)

const Carflow = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <App />
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(appName, () => Carflow)
