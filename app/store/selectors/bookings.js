
import R from 'ramda'

// Bookings
export const getUpcomingBookings = R.path(['bookings', 'history'])
export const getBookingsHistory = R.path(['bookings', 'upcoming'])
export const getFetchingStatus = R.path(['bookings', 'pending'])
export const getFetchError = R.path(['bookings', 'fetchError'])

// Cars
export const getAvailableCars = R.path(['bookings', 'cars'])
export const getFetchingCarsStatus = R.path(['bookings', 'fetchCardsPending'])
export const getFetchCarsError = R.path(['bookings', 'fetchCarsError'])
export const getSelectedCar = R.path(['bookings', 'selectedCar'])
export const getBookingRequestStatus = R.path(['bookings', 'bookCarPending'])
export const getBookingRequestError = R.path(['bookings', 'bookCarError'])
