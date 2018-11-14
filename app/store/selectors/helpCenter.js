import R from 'ramda'

export const getRideMalfunctionPhotos = R.path([
  'helpCenter',
  'rideMalfunctionPhotos'
])
export const getRideDamagedPhotos = R.path(['helpCenter', 'rideDamagedPhotos'])
export const getRideLatePhotos = R.path(['helpCenter', 'rideLatePhotos'])
export const getSelectedPhotoData = R.path(['helpCenter', 'selectedPhoto'])
export const getRideHelpRequestStatus = R.path(['helpCenter', 'requestPending'])
export const getRideHelpRequestError = R.path(['helpCenter', 'error'])
export const getRideLateNotifRequestError = R.path([
  'helpCenter',
  'lateNotifRequestError'
])
export const getRideLateNotifRequestStatus = R.path([
  'helpCenter',
  'lateNotifRequestPending'
])
export const getLateNotificationData = R.path(['helpCenter', 'notification'])
