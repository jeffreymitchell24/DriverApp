import { createReducer } from '../../helpers/redux'

import {
  SELECT_PHOTO,
  UNSELECT_PHOTO,
  SAVE_PHOTO,
  RESET_PHOTOS
} from 'store/actions/helpCenter'

const initialState = {
  rideDamagedPhotos: [],
  rideMalfunctionPhotos: [],
  rideLatePhotos: [],
  selectedPhoto: null
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
  }
}
export default createReducer(initialState, handlers)
