import R from 'ramda'

// Bookings
export const getUpcomingAllBookings = R.path(['bookings', 'upcoming', 'all'])
export const getUpcomingOneTimeBookings = R.path([
  'bookings',
  'upcoming',
  'oneTime'
])
export const getUpcomingRecurringBookings = R.path([
  'bookings',
  'upcoming',
  'recurring'
])
export const getBookingsHistory = R.path(['bookings', 'history'])
export const getFetchingStatus = R.path(['bookings', 'pending'])
export const getFetchError = R.path(['bookings', 'fetchError'])

// Cars
export const getAvailableCars = R.path(['bookings', 'cars'])
export const getFetchingCarsStatus = R.path(['bookings', 'fetchCardsPending'])
export const getFetchCarsError = R.path(['bookings', 'fetchCarsError'])
export const getSelectedCar = R.path(['bookings', 'selectedCar'])
export const getCarFetchingStatus = R.path(['bookings', 'fetchingCar'])
export const getBookingRequestStatus = R.path(['bookings', 'bookCarPending'])
export const getBookingRequestError = R.path(['bookings', 'bookCarError'])

// Ride
export const getSelectedRide = R.path(['bookings', 'selectedRide'])
export const getLicenseCheckRequestStatus = R.path([
  'bookings',
  'licenseCheckPending'
])
export const getLicenseCheckError = R.path(['bookings', 'licenseCheckError'])
export const getLicenseCheckStatus = R.path(['bookings', 'licenseChecked'])
export const getRideCancelRequestStatus = R.path([
  'bookings',
  'rideCancelPending'
])
export const getRideCancelError = R.path(['bookings', 'rideCancelError'])
export const getRideEndRequestStatus = R.path(['bookings', 'rideEndPending'])
export const getRideEndError = R.path(['bookings', 'rideEndError'])
