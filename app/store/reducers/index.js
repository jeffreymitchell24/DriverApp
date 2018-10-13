
import { combineReducers } from 'redux'
import auth from './auth'
import registration from './registration'
import ride from './ride'
import email from './email'
import bookings from './bookings'
import helpCenter from './helpCenter'

const rootReducer = combineReducers({
  auth, // : persistReducer(config, auth),
  registration,
  ride,
  email,
  bookings,
  helpCenter
})

export default rootReducer
