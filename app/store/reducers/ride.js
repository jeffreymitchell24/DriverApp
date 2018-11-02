import { createReducer } from '../../helpers/redux'

import {
  SAVE_RIDE_PHOTO,
  CLEAR_RECEIPT_PHOTO,
  SELECT_PHOTO
} from 'store/actions/ride'

import { SUBMIT_RECEIPT } from 'store/actions/bookings'

const initialState = {
  carPhotos: [null, null, null, null],
  gasTankPhotos: [null],
  mileagePhotos: [null],
  selectedPhoto: null,
  receiptPhoto: null,
  receiptSubmitError: null,
  receiptSubmitPending: false
}

const handlers = {
  [SELECT_PHOTO]: (state, { payload }) => {
    return {
      ...state,
      selectedPhoto: payload
    }
  },
  [SAVE_RIDE_PHOTO]: (state, { payload }) => {
    const { type: photoType, index, photoUri } = payload
    if (photoType === 'receiptPhoto') {
      return {
        receiptPhoto: photoUri,
        selectedPhoto: null
      }
    }
    let updatedPhotos = []
    updatedPhotos = state[photoType].map((photo, i) => {
      return index === i ? photoUri : photo
    })

    return {
      ...state,
      [photoType]: updatedPhotos,
      selectedPhoto: null
    }
  },
  [CLEAR_RECEIPT_PHOTO]: (state, { payload }) => {
    return initialState
  },
  [SUBMIT_RECEIPT.REQUEST]: (state, { payload }) => {
    return {
      ...state,
      receiptSubmitPending: true,
      receiptSubmitError: null
    }
  },
  [SUBMIT_RECEIPT.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      receiptPhoto: null,
      receiptSubmitPending: false
    }
  },
  [SUBMIT_RECEIPT.FAILURE]: (state, { payload }) => {
    return {
      ...state,
      receiptSubmitPending: false,
      receiptSubmitError: payload
    }
  }
}
export default createReducer(initialState, handlers)
