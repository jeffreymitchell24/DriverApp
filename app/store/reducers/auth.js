import { createReducer } from '../../helpers/redux'

import {
  SIGN_IN,
  SIGN_OUT,
  RESET_PASSWORD,
  CHECK_STATUS,
  SAVE_REJECTED_ID,
  DISCARD_RESET_ERROR,
  DISCARD_SIGNIN_ERROR,
  UPDATE_USER_IMAGE,
  UPDATE_USER_PROFILE
} from 'store/actions/auth'
import { SIGN_UP } from 'store/actions/registration'
const REHYDRATE = 'persist/REHYDRATE'

const initialState = {
  pending: false,
  authError: null,
  resetPasswordSent: false,
  resetError: null,
  resetPending: false,
  isAuthed: false,
  checkingUserStatus: false,
  user: null,
  token: null,
  prevRejected: null,
  updateError: null
}

const handlers = {
  [REHYDRATE]: (state, { payload, key }) => {
    const rehydrate = (payload && payload.auth) || state // payload && key === 'auth' ? payload : state
    return {
      ...rehydrate,
      resetError: null,
      updateError: null,
      authError: null,
      pending: false,
      resetPending: false,
      checkingUserStatus: false
    }
  },
  [SIGN_IN.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      user: null,
      isAuthed: false,
      authError: null,
      pending: true
    }
  },
  [SIGN_IN.SUCCESS]: (state, { payload }) => {
    const { user = null, token } = payload
    return {
      ...state,
      user,
      token,
      isAuthed: true,
      pending: false
    }
  },
  [SIGN_IN.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      authError: payload,
      pending: false
    }
  },
  [SIGN_UP.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      isAuthed: false
    }
  },
  [SIGN_UP.SUCCESS]: (state, { payload }) => {
    const { user = null, token } = payload
    return {
      ...state,
      user,
      token,
      isAuthed: true,
      pending: false
    }
  },
  [SIGN_OUT.SUCCESS]: (state, { payload }) => {
    return {
      ...initialState,
      prevRejected: state.prevRejected
    }
  },
[SIGN_OUT.ERROR]: (state, { payload }) => {
    return {
      ...initialState,
      prevRejected: state.prevRejected
    }
  },
  [DISCARD_SIGNIN_ERROR]: (state, { payload }) => {
    return {
      ...state,
      authError: null
    }
  },
  [RESET_PASSWORD.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      resetPasswordSent: false,
      resetError: null,
      resetPending: true
    }
  },
  [RESET_PASSWORD.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      resetPasswordSent: true,
      resetPending: false
    }
  },
  [RESET_PASSWORD.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      resetPasswordSent: false,
      resetError: payload,
      resetPending: false
    }
  },
  [DISCARD_RESET_ERROR]: (state, { payload }) => {
    return {
      ...state,
      resetError: null,
      resetPasswordSent: false
    }
  },
  [CHECK_STATUS.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      checkingUserStatus: true
    }
  },
  [CHECK_STATUS.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      user: {
        ...state.user,
        status: payload.status,
        profileUpdateStatus: payload.profileUpdateStatus
      },
      checkingUserStatus: false
    }
  },
  [CHECK_STATUS.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      checkingUserStatus: false
    }
  },
  [SAVE_REJECTED_ID]: (state, { payload }) => {
    return {
      ...state,
      prevRejected: payload.id
    }
  },
  [UPDATE_USER_IMAGE.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      pending: true,
      updateError: null
    }
  },
  [UPDATE_USER_IMAGE.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      pending: false,
      user: payload
    }
  },
  [UPDATE_USER_IMAGE.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      pending: false,
      updateError: payload
    }
  },
  [UPDATE_USER_PROFILE.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      pending: true,
      updateError: null
    }
  },
  [UPDATE_USER_PROFILE.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      pending: false,
      user: payload
    }
  },
  [UPDATE_USER_PROFILE.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      pending: false,
      updateError: payload
    }
  }
}
export default createReducer(initialState, handlers)
