import R from 'ramda'
export const getNewBookingStart = R.path(['newBooking', 'startDate'])
export const getNewBookingEnd = R.path(['newBooking', 'endDate'])
