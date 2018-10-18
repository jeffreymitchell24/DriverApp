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
export const FETCH_SELECTED_CAR = createAsyncAction('FETCH_SELECTED_CAR')
export const fetchSelectedCar = (id) => {
  return {
    type: FETCH_SELECTED_CAR.REQUEST,
    payload: id
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

export const SELECT_RIDE = 'SELECT_RIDE'
export const selectRide = (ride) => {
  return {
    type: SELECT_RIDE,
    payload: ride
  }
}
export const UNSELECT_RIDE = 'UNSELECT_RIDE'
export const unselectRide = () => {
  return {
    type: UNSELECT_CAR
  }
}

export const CHECK_LICENSE = createAsyncAction('CHECK_LICENSE')
export const checkLicense = ({photoUri, carId}) => {
  return {
    type: CHECK_LICENSE.REQUEST,
    payload: {photoUri, carId}
  }
}
