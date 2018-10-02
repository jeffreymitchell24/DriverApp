export const SAVE_RECEIPT_PHOTO = 'SAVE_RECEIPT_PHOTO'
export const saveReceiptPhoto = (photoUri) => {
  return {
    type: SAVE_RECEIPT_PHOTO,
    payload: photoUri
  }
}

export const CLEAR_RECEIPT_PHOTO = 'CLEAR_RECEIPT_PHOTO'
export const clearReceiptPhoto = () => {
  return {
    type: CLEAR_RECEIPT_PHOTO
  }
}
