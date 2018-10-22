import { PermissionsAndroid, Platform, Alert } from 'react-native'
import Permissions from 'react-native-permissions'
import forEach from 'lodash/forEach'

// let permissions = [
//   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//   PermissionsAndroid.PERMISSIONS.CAMERA
// ]

let permissions = [
  'camera',
  'photo'
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
  // try {
  //   let results = await Promise.all(permissions.map((type) => {
  //     console.log('type', type)
  //     return Permissions.request(type)
  //   }))
  //   console.log('results', results)
  //   let granted = true
  //   forEach(results, result => {
  //     if (result !== 'authorized') granted = false
  //   })
  //   return granted
  // } catch (err) {
  //   return false
  // }
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

export const requestMainPermissions = async (showAlert = false) => {
  let results = {}
  let granted = await Permissions.request('camera')
    .then(res => {
      results.camera = res
      return (Permissions.request(Platform.OS === 'android' ? 'storage' : 'photo'))
    }).then(res => {
      results[Platform.OS === 'android' ? 'storage' : 'photo'] = res
      console.log('results', results)
      let granted = true
      if (Platform.OS === 'android') {
        let restricted = []
        forEach(results, (result, type) => {
          if (result === 'restricted') {
            granted = false
            restricted.push(type)
          } else if (result === 'denied') granted = false
        })
        if (restricted.length > 0 && showAlert) {
          Alert.alert('Permissions', 'We need access to your camera')
        }
      } else {
        let denied = []
        forEach(results, (result, type) => {
          if (result === 'denied') {
            granted = false
            denied.push(type)
          } else if (result === 'restricted') granted = false
        })
        if (denied.length > 0 && showAlert) {
          Alert.alert(
            'Permissions',
            'We need access to your camera',
            [
              {
                text: 'No way',
                onPress: () => console.log('Permission denied'),
                style: 'cancel'
              },
              { text: 'Open Settings', onPress: Permissions.openSettings }
            ]
          )
        }
      }
      return granted
    })
  console.log('granted', granted)
  return granted
}
