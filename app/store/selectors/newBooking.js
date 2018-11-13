import R from 'ramda'

export const getAdressHistory = R.path(['newBooking', 'addressHistory'])

export const getIsFetchingCarCategories = R.path([
  'newBooking',
  'isFetchingCarCategories'
])
export const getNewBookingStart = R.path(['newBooking', 'startDate'])
export const getNewBookingEnd = R.path(['newBooking', 'endDate'])
