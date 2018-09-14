import { createReducer } from '../../helpers/redux'

import {
  SAVE_SIGNUP_STEP_DATA
} from 'store/actions/auth'

const initialState = {
  signUpData: {}
}

const handlers = {
  [SAVE_SIGNUP_STEP_DATA]: (state, { payload, key }) => {
    const {step, stepData} = payload
    return ({
      ...state,
      signUpData: {
        ...state.signUpData,
        [step]: stepData
      }
    })
  }
}
export default createReducer(initialState, handlers)
