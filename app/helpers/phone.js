export const formatPhoneNumber = (initialPhone) => {
  let phoneString = initialPhone
  let length = phoneString.length

  if (phoneString.length <= 2) return '+1 '
  if ((phoneString.length === 7 || phoneString.length === 11) && phoneString[length - 1] !== '-') {
    return phoneString.slice(0, length - 1) + '-' + phoneString[length - 1]
  }
  return phoneString
}
