import R from 'ramda'

export const getReceiptPhoto = R.path(['ride', 'receiptPhoto'])
export const getReceiptSubmitRequestStatus = R.path(['ride', 'receiptSubmitPending'])
export const getReceiptSubmitError = R.path(['ride', 'receiptSubmitError'])
export const getCarPhotos = R.path(['ride', 'carPhotos'])
export const getGasTankPhotos = R.path(['ride', 'gasTankPhotos'])
export const getSelectedRidePhotoData = R.path(['ride', 'selectedPhoto'])
