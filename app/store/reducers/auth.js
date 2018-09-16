import { createReducer } from '../../helpers/redux'

import {
  SAVE_SIGNUP_STEP_DATA,
  UPDATE_LICENSE
} from 'store/actions/auth'

const initialState = {
  signUpData: {
    documents: {
      licenses: {
        tlc: {},
        driving: {}
      }
    }
  }
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
  },
  [UPDATE_LICENSE]: (state, { payload, key }) => {
    const {type, side, imageUri} = payload
    return ({
      ...state,
      signUpData: {
        ...state.signUpData,
        documents: {
          ...state.signUpData.documents,
          licenses: {
            ...state.signUpData.documents.licenses,
            [type]: {
              ...state.signUpData.documents.licenses[type],
              [side]: imageUri
            }
          }
        }
      }
    })
  }
}
export default createReducer(initialState, handlers)
