import { PermissionsAndroid, Platform } from 'react-native'

const requestPermission = async (permissionType) => {
  if (Platform.OS === 'android') {
    try {
      let granted = await PermissionsAndroid.request(permissionType)
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      return false
    }
  } else return true
}

export const requestReadStoragePermission = async () => {
  let result = await requestPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
  return result
}

export const requestWriteStoragePermission = async () => {
  let result = await requestPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
  return result
}
