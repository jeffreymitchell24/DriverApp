import { createReducer } from '../../helpers/redux'

import {
  SAVE_RECEIPT_PHOTO,
  CLEAR_RECEIPT_PHOTO
} from 'store/actions/ride'

import {
  SUBMIT_RECEIPT
} from 'store/actions/bookings'

const initialState = {
  carPhotos: [],
  gasTankPhotos: [],
  receiptPhoto: null,
  receiptSubmitError: null,
  receiptSubmitPending: false
}

const handlers = {
  [SAVE_RECEIPT_PHOTO]: (state, { payload }) => {
    return {
      receiptPhoto: payload
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
