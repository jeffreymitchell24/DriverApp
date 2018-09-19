import { combineReducers } from 'redux'
import auth from './auth'
import registration from './registration'

const rootReducer = combineReducers({
  auth,
  registration
})

export default rootReducer
