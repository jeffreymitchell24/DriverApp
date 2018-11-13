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

export const SET_DATE = 'SET_DATE'
export const setBookingDate = ({ type, date }) => {
  return {
    type: SET_DATE,
    payload: { type, date }
  }
}

export const RESET_DATES = 'RESET_DATES'
export const resetDates = () => {
  return {
    type: RESET_DATES
  }
}
