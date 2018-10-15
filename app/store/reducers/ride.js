import { createReducer } from '../../helpers/redux'

import {
  SAVE_RECEIPT_PHOTO,
  CLEAR_RECEIPT_PHOTO
} from 'store/actions/ride'

const initialState = {
  carPhotos: [],
  gasTankPhotos: [],
  receiptPhoto: null
}

const handlers = {
  [SAVE_RECEIPT_PHOTO]: (state, { payload }) => {
    return {
      receiptPhoto: payload
    }
  },
  [CLEAR_RECEIPT_PHOTO]: (state, { payload }) => {
    return initialState
  }
}
export default createReducer(initialState, handlers)
