import { createReducer } from '../../helpers/redux'

import {
  SELECT_PHOTO,
  UNSELECT_PHOTO,
  SAVE_PHOTO,
  RESET_PHOTOS
} from 'store/actions/helpCenter'

import {
  SEND_LATE_FOR_RIDE_DETAILS,
  SEND_LATE_FOR_RIDE_NOTIFICATION,
  HELP_RIDE_DAMAGED,
  HELP_RIDE_MALFUNCTIONED
} from 'store/actions/bookings'

const initialState = {
  rideDamagedPhotos: [],
  rideMalfunctionPhotos: [],
  rideLatePhotos: [],
  selectedPhoto: null,
  requestPending: false,
  error: null,
  lateNotifRequestPending: false,
  lateNotifRequestError: null,
  notification: {}
}

const handlers = {
  [SELECT_PHOTO]: (state, { payload }) => {
    return {
      ...state,
      selectedPhoto: payload
    }
  },
  [UNSELECT_PHOTO]: (state, { payload }) => {
    return {
      ...state,
      selectedPhoto: null
    }
  },
  [SAVE_PHOTO]: (state, {payload}) => {
    const {type: photosType, index, photoUri} = payload
    let updatedPhotos = []
    if (index > state[photosType].length - 1) {
      updatedPhotos = [...state[photosType], photoUri]
    } else updatedPhotos = state[photosType].map((photo, i) => index === i ? photoUri : photo)

    return {
      ...state,
      [photosType]: updatedPhotos,
      selectedPhoto: null
    }
  },
  [RESET_PHOTOS]: (state, {payload}) => {
    return {
      ...state,
      [payload.type]: []
    }
  },
  [SEND_LATE_FOR_RIDE_NOTIFICATION.REQUEST]: (state, {payload}) => {
    return {
      ...state,
      lateNotifRequestPending: true,
      lateNotifRequestError: null,
      notification: {}
    }
  },
  [SEND_LATE_FOR_RIDE_NOTIFICATION.SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      lateNotifRequestError: null,
      lateNotifRequestPending: false,
      notification: payload
    }
  },
  [SEND_LATE_FOR_RIDE_NOTIFICATION.FAILURE]: (state, {payload}) => {
    return {
      ...state,
      lateNotifRequestError: payload,
      lateNotifRequestPending: false
    }
  },
  [SEND_LATE_FOR_RIDE_DETAILS.REQUEST]: (state, {payload}) => {
    return {
      ...state,
      requestPending: true,
      error: null
    }
  },
  [SEND_LATE_FOR_RIDE_DETAILS.SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      error: null,
      requestPending: false
    }
  },
  [SEND_LATE_FOR_RIDE_DETAILS.FAILURE]: (state, {payload}) => {
    return {
      ...state,
      error: payload,
      requestPending: false
    }
  },
  [HELP_RIDE_DAMAGED.REQUEST]: (state, {payload}) => {
    return {
      ...state,
      requestPending: true,
      error: null
    }
  },
  [HELP_RIDE_DAMAGED.SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      error: null,
      requestPending: false
    }
  },
  [HELP_RIDE_DAMAGED.FAILURE]: (state, {payload}) => {
    return {
      ...state,
      error: payload,
      requestPending: false
    }
  },
  [HELP_RIDE_MALFUNCTIONED.REQUEST]: (state, {payload}) => {
    return {
      ...state,
      requestPending: true,
      error: null
    }
  },
  [HELP_RIDE_MALFUNCTIONED.SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      error: null,
      requestPending: false
    }
  },
  [HELP_RIDE_MALFUNCTIONED.FAILURE]: (state, {payload}) => {
    return {
      ...state,
      error: payload,
      requestPending: false
    }
  }
}
export default createReducer(initialState, handlers)
