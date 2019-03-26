import {PermissionsAndroid, Platform, Alert} from 'react-native'
import Permissions from 'react-native-permissions'
import firebase from 'react-native-firebase'
import forEach from 'lodash/forEach'

const requestPermission = async permissionType => {
  console.log('Platform.OS', Platform.OS)

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
  let result = await requestPermission(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  )

  return result
}

export const requestWriteStoragePermission = async () => {
  let result = await requestPermission(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  )

  return result
}

export const requestCameraPermission = async () => {
  let result = await requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA)

  return result
}

export const requestMainPermissions = async (showAlert = false) => {
  let results = {}

  let granted = await Permissions.request('location')
    .then(res => {
      results.location = res
      return Permissions.request('camera')
    })
    .then(res => {
      results.camera = res
      return Permissions.request(
        Platform.OS === 'android' ? 'storage' : 'photo'
      )
    })
    .then(res => {
      results[Platform.OS === 'android' ? 'storage' : 'photo'] = res
      let granted = true

      if (Platform.OS === 'android') {
        let restricted = []

        forEach(results, (result, type) => {
          if (result === 'restricted') {
            granted = false
            restricted.push(type)
          } else if (result === 'denied') {
            granted = false
          }
        })

        if (restricted.length > 0 && showAlert) {
          setTimeout(
            () =>
              Alert.alert(
                'Permissions',
                'We need access to your camera and storage'
              ),
            200
          )
        }
      } else {
        let denied = []

        forEach(results, (result, type) => {
          if (result === 'denied') {
            granted = false
            denied.push(type)
          } else if (result === 'restricted') {
            granted = false
          }
        })

        if (denied.length > 0 && showAlert) {
          setTimeout(
            () =>
              Alert.alert('Permissions', 'We need access to your camera', [
                {
                  text: 'No way',
                  onPress: () => console.log('Permission denied'),
                  style: 'cancel'
                },
                {text: 'Open Settings', onPress: Permissions.openSettings}
              ]),
            200
          )
        }
      }
      return granted
    })

  return granted
}

/**
 * Request FCM permission
 * @returns {Promise<boolean>}
 */
export const requestFireabasePermission = async () => {
  try {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      console.log('enabled', enabled)
    } else {
      console.log('Error user doesnt have permission')
      await firebase.messaging().requestPermission()
    }
  } catch (e) {
    console.error(e)
  }
  return true
}
