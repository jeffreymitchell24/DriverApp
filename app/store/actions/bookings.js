import { createAsyncAction } from 'helpers/redux'

export const FETCH_USER_BOOKINGS = createAsyncAction('FETCH_USER_BOOKINGS')
export const fetchUserBookings = () => {
  return {
    type: FETCH_USER_BOOKINGS.REQUEST
  }
}

export const FETCH_AVAILABLE_CARS = createAsyncAction('FETCH_AVAILABLE_CARS')
export const fetchAvailableCars = () => {
  return {
    type: FETCH_AVAILABLE_CARS.REQUEST
  }
}
export const SELECT_CAR = 'SELECT_CAR'
export const selectCar = (car) => {
  return {
    type: SELECT_CAR,
    payload: car
  }
}

export const UNSELECT_CAR = 'UNSELECT_CAR'
export const unselectCar = (car) => {
  return {
    type: UNSELECT_CAR
  }
}

export const BOOK_CAR = createAsyncAction('BOOK_CAR')
export const bookCar = (bookingData) => {
  return {
    type: BOOK_CAR.REQUEST,
    payload: bookingData
  }
}
