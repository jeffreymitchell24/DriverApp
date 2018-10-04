import { createReducer } from '../../helpers/redux'

import {
  SAVE_SIGNUP_STEP_DATA,
  SAVE_CREDENTIALS,
  SAVE_PROFILE_INFO,
  UPDATE_LICENSE,
  SELECT_LICENSE,
  UPDATE_RIDESHARE_APPS,
  SIGN_UP,
  SAVE_RESUBMIT_STATUS
} from 'store/actions/registration'

const initialState = {
  credentials: {},
  profileInfo: {},
  documents: {
    licenses: {
      tlc: {},
      driving: {}
    }
  },
  apps: {
    main: [],
    other: []
  },
  selectedLicense: {
    side: null,
    type: null
  },
  pending: false,
  error: null,
  isResubmitting: false
}

const handlers = {
  [SAVE_SIGNUP_STEP_DATA]: (state, { payload }) => {
    const {step, stepData} = payload
    return {
      ...state,
      signUpData: {
        ...state.signUpData,
        [step]: stepData
      }
    }
  },

  [SAVE_CREDENTIALS]: (state, { payload }) => {
    return {
      ...state,
      credentials: {
        ...state.credentials,
        ...payload
      }
    }
  },
  [SAVE_PROFILE_INFO]: (state, { payload }) => {
    return {
      ...state,
      profileInfo: {
        ...state.profileInfo,
        ...payload
      }
    }
  },
  [UPDATE_LICENSE]: (state, { payload }) => {
    const {type, side, imageUri} = payload
    return {
      ...state,
      documents: {
        ...state.documents,
        licenses: {
          ...state.documents.licenses,
          [type]: {
            ...state.documents.licenses[type],
            [side]: imageUri
          }
        }
      }
    }
  },
  [SELECT_LICENSE]: (state, { payload }) => {
    return {
      ...state,
      selectedLicense: payload
    }
  },
  [UPDATE_RIDESHARE_APPS]: (state, { payload }) => {
    return {
      ...state,
      apps: payload
    }
  },
  [SIGN_UP.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      error: null,
      pending: true
    }
  },
  [SIGN_UP.SUCCESS]: (state, { payload }) => {
    return initialState
  },
  [SIGN_UP.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      error: payload,
      pending: false
    }
  },
  [SAVE_RESUBMIT_STATUS]: (state, { payload }) => {
    return {
      ...state,
      isResubmitting: payload
    }
  }
}
export default createReducer(initialState, handlers)
