import { createAsyncAction } from 'helpers/redux'

export const FETCH_USER_BOOKINGS = createAsyncAction('FETCH_USER_BOOKINGS')
export const fetchUserBookings = type => {
  return {
    type: FETCH_USER_BOOKINGS.REQUEST,
    payload: type
  }
}

export const FETCH_AVAILABLE_CARS = createAsyncAction('FETCH_AVAILABLE_CARS')
export const fetchAvailableCars = () => {
  return {
    type: FETCH_AVAILABLE_CARS.REQUEST
  }
}
export const FETCH_SELECTED_CAR = createAsyncAction('FETCH_SELECTED_CAR')
export const fetchSelectedCar = id => {
  return {
    type: FETCH_SELECTED_CAR.REQUEST,
    payload: id
  }
}

export const UNSELECT_CAR = 'UNSELECT_CAR'
export const unselectCar = car => {
  return {
    type: UNSELECT_CAR
  }
}

export const BOOK_CAR = createAsyncAction('BOOK_CAR')
export const bookCar = bookingData => {
  return {
    type: BOOK_CAR.REQUEST,
    payload: bookingData
  }
}

export const SELECT_RIDE = 'SELECT_RIDE'
export const selectRide = ride => {
  return {
    type: SELECT_RIDE,
    payload: ride
  }
}
export const UNSELECT_RIDE = 'UNSELECT_RIDE'
export const unselectRide = () => {
  return {
    type: UNSELECT_RIDE
  }
}

export const CHECK_LICENSE = createAsyncAction('CHECK_LICENSE')
export const checkLicense = ({ photoUri, carId }) => {
  return {
    type: CHECK_LICENSE.REQUEST,
    payload: { photoUri, carId }
  }
}

export const CANCEL_RIDE = createAsyncAction('CANCEL_RIDE')
export const cancelRide = ({ carId }) => {
  return {
    type: CANCEL_RIDE.REQUEST,
    payload: { carId }
  }
}

export const END_RIDE = createAsyncAction('END_RIDE')
export const endRide = ({ data, carId }) => {
  return {
    type: END_RIDE.REQUEST,
    payload: { data, carId }
  }
}

export const SEND_LATE_FOR_RIDE_NOTIFICATION = createAsyncAction(
  'SEND_LATE_FOR_RIDE_NOTIFICATION'
)
export const sendLateNotification = ({ carId }) => {
  return {
    type: SEND_LATE_FOR_RIDE_NOTIFICATION.REQUEST,
    payload: { carId }
  }
}

export const SEND_LATE_FOR_RIDE_DETAILS = createAsyncAction(
  'SEND_LATE_FOR_RIDE_DETAILS'
)
export const lateForRide = ({ data, carId, notificationId }) => {
  return {
    type: SEND_LATE_FOR_RIDE_DETAILS.REQUEST,
    payload: { data, carId, notificationId }
  }
}

export const SUBMIT_RECEIPT = createAsyncAction('SUBMIT_RECEIPT')
export const submitReceipt = ({ data, carId }) => {
  return {
    type: SUBMIT_RECEIPT.REQUEST,
    payload: { data, carId }
  }
}

export const HELP_RIDE_DAMAGED = createAsyncAction('HELP_RIDE_DAMAGED')
export const helpRideDamaged = ({ data, carId }) => {
  return {
    type: HELP_RIDE_DAMAGED.REQUEST,
    payload: { data, carId }
  }
}

export const HELP_RIDE_MALFUNCTIONED = createAsyncAction(
  'HELP_RIDE_MALFUNCTIONED'
)
export const helpRideMalfunction = ({ data, carId }) => {
  return {
    type: HELP_RIDE_MALFUNCTIONED.REQUEST,
    payload: { data, carId }
  }
}

export const START_RIDE = createAsyncAction('START_RIDE')
export const startRide = ({ data, carId }) => {
  return {
    type: START_RIDE.REQUEST,
    payload: { data, carId }
  }
}
