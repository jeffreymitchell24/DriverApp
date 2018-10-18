
import R from 'ramda'

// Bookings
export const getUpcomingBookings = R.path(['bookings', 'upcoming'])
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
export const getLicenseCheckRequestStatus = R.path(['bookings', 'licenseCheckPending'])
export const getLicenseCheckError = R.path(['bookings', 'licenseCheckError'])
export const getLicenseCheckStatus = R.path(['bookings', 'licenseChecked'])

// HelpCenter
export const getRideHelpRequestStatus = R.path(['bookings', 'requestPending'])
export const getRideHelpRequestError = R.path(['bookings', 'error'])
