import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import createSensitiveStorage from 'redux-persist-sensitive-storage'
import auth from './auth'
import registration from './registration'
import receipt from './receipt'
import email from './email'
import bookings from './bookings'

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'CarflowKeychain',
  sharedPreferencesName: 'CarflowPrefs'
})

const config = {
  key: 'auth',
  storage: sensitiveStorage
}

const rootReducer = combineReducers({
  auth, // : persistReducer(config, auth),
  registration,
  receipt,
  email,
  bookings
})

export default rootReducer
