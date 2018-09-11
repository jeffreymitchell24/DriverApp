import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

import { Provider } from 'react-redux'
import configureStore from './app/store/configureStore';

const store = configureStore()

const Carflow = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Carflow);
