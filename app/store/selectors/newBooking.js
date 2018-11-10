import R from 'ramda'

export const getAdressHistory = R.path(['newBooking', 'addressHistory'])

export const getIsFetchingCarCategories = R.path([
  'newBooking',
  'isFetchingCarCategories'
])
