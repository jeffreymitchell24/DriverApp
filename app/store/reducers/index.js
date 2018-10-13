
import { combineReducers } from 'redux'
import auth from './auth'
import registration from './registration'
import receipt from './receipt'
import email from './email'
import bookings from './bookings'
import helpCenter from './helpCenter'

const rootReducer = combineReducers({
  auth, // : persistReducer(config, auth),
  registration,
  receipt,
  email,
  bookings,
  helpCenter
})

export default rootReducer
