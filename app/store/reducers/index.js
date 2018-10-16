
import { combineReducers } from 'redux'
import auth from './auth'
import registration from './registration'
import ride from './ride'
import email from './email'
import bookings from './bookings'
import helpCenter from './helpCenter'
import newBooking from './newBooking'

const rootReducer = combineReducers({
  auth, // : persistReducer(config, auth),
  registration,
  ride,
  email,
  bookings,
  helpCenter,
  newBooking
})

export default rootReducer
