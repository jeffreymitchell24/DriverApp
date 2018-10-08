import { createReducer } from '../../helpers/redux'

import {
  SIGN_IN,
  SIGN_OUT,
  RESET_PASSWORD,
  CHECK_STATUS,
  SAVE_REJECTED_ID,
  DISCARD_RESET_ERROR,
  DISCARD_SIGNIN_ERROR,
  UPDATE_USER_IMAGE
} from 'store/actions/auth'
import {SIGN_UP} from 'store/actions/registration'
const REHYDRATE = 'persist/REHYDRATE'

// let user = {
//   'id': 0,
//   'full_name': 'Kyle Freedman',
//   'email': 'kyle@freedman.com',
//   'admin': true,
//   'address': '100 West 33rd Street, New York, NY, 10001',
//   'street': '100 West 33rd Street',
//   'city': 'New York',
//   'zip_code': '10001',
//   'state': 'NY',
//   'phone': '+1 212-695-4260',
//   'photo': 'string',
//   'status': 'pending',
//   'ridesharing_approved': true,
//   'documents_uploaded': true,
//   'ridesharing_apps': 'uber, lyft',
//   'tlcLicense': {
//     'front': 'string',
//     'back': 'string'
//   },
//   'drivingLicense': {
//     'front': 'string',
//     'back': 'strin'
//   }
// }

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
      authError: null
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
    const {user = null, token} = payload
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
    const {user = null, token} = payload
    return {
      ...state,
      user,
      token,
      isAuthed: true,
      pending: false
    }
  },
  [SIGN_OUT]: (state, { payload }) => {
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
        status: payload.status
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
  }
}
export default createReducer(initialState, handlers)
