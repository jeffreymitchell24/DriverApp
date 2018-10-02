import { persistReducer } from 'redux-persist'
import createSensitiveStorage from 'redux-persist-sensitive-storage'
import auth from './auth'
import registration from './registration'
import receipt from './receipt'

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
  registration,
  receipt
}

export default rootReducer
