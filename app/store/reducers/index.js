import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import createSensitiveStorage from 'redux-persist-sensitive-storage'
import auth from './auth'
import registration from './registration'

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'CarflowKeychain',
  sharedPreferencesName: 'CarflowPrefs'
})

const config = {
  key: 'auth',
  storage: sensitiveStorage
}

const rootReducer = {
  auth: persistReducer(config, auth),
  registration
}

export default rootReducer
