import R from 'ramda'

export const getRideMalfunctionPhotos = R.path(['helpCenter', 'rideMalfunctionPhotos'])
export const getRideDamagedPhotos = R.path(['helpCenter', 'rideDamagedPhotos'])
export const getSelectedPhotoData = R.path(['helpCenter', 'selectedPhoto'])
