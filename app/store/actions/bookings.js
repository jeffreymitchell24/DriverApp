import { createAsyncAction } from 'helpers/redux'

export const FETCH_USER_BOOKINGS = createAsyncAction('FETCH_USER_BOOKINGS')
export const fetchUserBookings = () => {
  return {
    type: FETCH_USER_BOOKINGS.REQUEST
  }
}
