import R from 'ramda'

export const getRideMalfunctionPhotos = R.path(['helpCenter', 'rideMalfunctionPhotos'])
export const getRideDamagedPhotos = R.path(['helpCenter', 'rideDamagedPhotos'])
export const getRideLatePhotos = R.path(['helpCenter', 'rideLatePhotos'])
export const getSelectedPhotoData = R.path(['helpCenter', 'selectedPhoto'])
export const getRideHelpRequestStatus = R.path(['helpCenter', 'requestPending'])
export const getRideHelpRequestError = R.path(['helpCenter', 'error'])
