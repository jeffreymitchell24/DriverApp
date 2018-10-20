import R from 'ramda'

export const getReceiptPhoto = R.path(['ride', 'receiptPhoto'])
export const getReceiptSubmitRequestStatus = R.path(['ride', 'receiptSubmitPending'])
export const getReceiptSubmitError = R.path(['ride', 'receiptSubmitError'])
