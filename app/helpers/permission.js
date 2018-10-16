import { PermissionsAndroid, Platform } from 'react-native'

let permissions = [
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.CAMERA
]

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
const requestMultiplePermissions = async (permissions) => {
  if (Platform.OS === 'android') {
    try {
      let results = await PermissionsAndroid.requestMultiple(permissions)
      let granted = true
      results.forEach(result => {
        console.log('result', result)
        if (result !== PermissionsAndroid.RESULTS.GRANTED) granted = false
      })
      console.log('granted', granted)
      return granted
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

export const requestCameraPermission = async () => {
  let result = await requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA)
  return result
}

export const requestMainPermissions = async () => {
  let result = await requestMultiplePermissions(permissions)
  return result
}
