
import R from 'ramda'
export const getUpcomingBookings = R.path(['bookings', 'history'])
export const getBookingsHistory = R.path(['bookings', 'upcoming'])
export const getFetchingStatus = R.path(['bookings', 'pending'])
export const getFetchError = R.path(['bookings', 'fetchError'])
