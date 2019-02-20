import {PermissionsAndroid, Platform, Alert} from 'react-native'
import Permissions from 'react-native-permissions'
import forEach from 'lodash/forEach'
import FCM, {
    FCMEvent,
    NotificationType,
    RemoteNotificationResult,
    WillPresentNotificationResult
} from "react-native-fcm"


const requestPermission = async permissionType => {
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
        // .then(res => {
        //     requestFireabasePermission()
        //     return granted
        // })


    return granted
}

/**
 * Request FCM permission
 * @returns {Promise<boolean>}
 */
export const requestFireabasePermission = async () => {
    try {
        let result = await FCM.requestPermissions({
            badge: false,
            sound: true,
            alert: true
        });
    } catch (e) {
        console.error(e);
    }
    return true
}
