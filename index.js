import React from 'react'
import {AppRegistry} from 'react-native'
import App from './app/App'
import {name as appName} from './app.json'
import rootSaga from 'store/sagas'
import rootReducer from 'store/reducers'
import { Provider } from 'react-redux'
import configureStore from './app/store/configureStore'

const store = configureStore(rootReducer, rootSaga)

const Carflow = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Carflow)
