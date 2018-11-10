import { createAsyncAction } from '../../helpers/redux'

export const ADD_ADDRESS_TO_HISTORY = 'ADD_ADDRESS_TO_HISTORY'
export const addAddressToHistory = address => {
  return {
    type: ADD_ADDRESS_TO_HISTORY,
    payload: address
  }
}

export const LOAD_CAR_CATEGORIES = createAsyncAction('LOAD_CAR_CATEGORIES')
export const loadCarCategories = () => {
  return {
    type: LOAD_CAR_CATEGORIES.REQUEST
  }
}
