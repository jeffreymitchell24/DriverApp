import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob'
import { Platform } from 'react-native'
import { RNS3 } from 'react-native-aws3'
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import FCM from "react-native-fcm";
// import firebase from 'react-native-firebase'
const URL = 'http://54.183.254.243'

const AWS_ACCESS_KEY_ID = 'AKIAI5DVRLUDPCC3GE6Q'
const AWS_SECRET_ACCESS_KEY = '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'
const AWS_DEFAULT_REGION = 'us-west-1'
const AWS_BUCKET = 'carflow'

axios.interceptors.request.use(config => config, error => Promise.reject(error))

axios.interceptors.response.use(
    response => response,
    error => {
        console.log('axios.interceptors.response.error', error)

        return Promise.reject(error)
    }
)

export const authorize = async (email, password) => {
    let response = await axios.post(`${URL}/api/login`, { email, password })

    console.log('authorize response', response)

    return response.data
}

export const resetPassword = async email => {
    let response = await axios.post(`${URL}/api/password/email`, { email })

    console.log('resetPassowrd response', response)

    return response
}

export const resubmit = async (userData, token) => {
    console.log('resubmit', userData, token)

    let config = {
        headers: { Authorization: `Bearer ${token}` },
        'Content-Type': 'multipart/form-data'
    }

    let response = await axios.post(`${URL}/api/users/resubmit`, userData, config)

    console.log('register response', response)

    return response.data.data
}

export const register = async user => {
    console.log('user', user)

    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }

    let response = await axios.post(`${URL}/api/register/create`, user, config)

    console.log('register response', response)

    if(response?.data?.token) {
        await sendDeviceToken(response?.data?.token)
    }
    return response.data.data
}

export const checkStatus = async token => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.get(`${URL}/api/users/status`, config)

    // console.log('checkStatus response', response)

    return response.data.data
}

export const validateEmail = async email => {
    let response = await axios.post(`${URL}/api/validate-email`, { email })

    console.log('validateEmail response', response)

    return response.data.data
}

export const updateUser = async ({ token, data }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.post(`${URL}/api/users/update`, data, config)

    console.log('updateUser response', response)

    return response.data.data
}

const options = {
    keyPrefix: 'uploads/',
    bucket: AWS_BUCKET,
    region: AWS_DEFAULT_REGION,
    accessKey: AWS_ACCESS_KEY_ID,
    secretKey: AWS_SECRET_ACCESS_KEY,
    successActionStatus: 201
}

export const getUser = async ({ token }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.get(`${URL}/api/users/me`, config)

    console.log('getUser response', response)

    return response.data.data
}

export const uploadImageToAws = async imageFile => {
    try {
        let response = await RNS3.put(imageFile, options)

        console.log(response)

        if (response.status !== 201) {
            throw new Error('Failed to upload image to S3')
        }

        return response.body.postResponse.location
    } catch (error) {
        console.log('Upload error', error)

        throw error
    }

    /**
     * {
   *   postResponse: {
   *     bucket: "your-bucket",
   *     etag : "9f620878e06d28774406017480a59fd4",
   *     key: "uploads/image.png",
   *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
   *   }
   * }
     */
}

export const fetchUpcomingBookings = async (token, type) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    console.log(config)

    let response = await axios.get(`${URL}/api/bookings/upcoming/${type}`, config)

    console.log('fetchUpcomingBookings response', response)

    return response.data.data
}

export const fetchBookingsHistory = async token => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.get(`${URL}/api/bookings/history`, config)

    console.log('fetchBookingsHistory response', response)

    return response.data.data
}

export const fetchAvailableCars = async (params, token) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.post(`${URL}/api/cars/available`, params, config)

    console.log('fetchAvailableCars response', response)

    return response.data.data
}

export const fetchCarDetails = async ({ token, id, body }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.post(
        `${URL}/api/cars/${id}/book-preview`,
        body,
        config
    )

    console.log('fetchCarDetails response', response)

    return response.data.data
}

export const bookCar = async ({ token, id, timeStamps }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.post(
        `${URL}/api/cars/${id}/book`,
        timeStamps,
        config
    )

    console.log('bookCar response', response)

    return response.data.data
}

export const checkRideLicense = async ({ token, id, data }) => {
    const body = []
    forEach(data, (field, fieldName) => {
        if (get(field, 'type') === 'image/jpeg') {
            body.push({
                name: fieldName,
                filename: field.name,
                type: field.type,
                data: RNFetchBlob.wrap(
                    Platform.OS === 'ios' ? field.uri.replace('file://', '') : field.uri
                )
            })
        } else {
            body.push({
                name: fieldName,
                data: field
            })
        }
    })

    console.log('checkRideLicense', id, data, body)

    let response = await RNFetchBlob.fetch(
        'POST',
        `${URL}/api/bookings/${id}/start`,
        {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        body
    )

    console.log('checkRideLicense response', response.json())

    return response.json().data
}

export const sendRideReceipt = async ({ token, id, data }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.post(
        `${URL}/api/bookings/${id}/receipt`,
        data,
        config
    )

    console.log('sendRideReceipt response', response)

    return response.data
}

export const endRide = async ({ token, id, data }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    console.log(
        'endRide data',
        `${URL}/api/bookings/${id}/end`,
        data,
        data.toString()
    )

    let response = await axios.post(`${URL}/api/bookings/${id}/end`, data, config)

    console.log('endRide response', response)

    return response.data
}

export const cancelRide = async ({ token, id }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.post(
        `${URL}/api/bookings/${id}/cancel`,
        {},
        config
    )

    console.log('cancelRide response', response)

    return response.data
}

export const rideDamaged = async ({ token, id, data }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    console.log('data', data)
    console.log('id', id)

    let response = await axios.post(
        `${URL}/api/bookings/${id}/help/damage`,
        data,
        config
    )

    // console.log('rideDamaged response', response)


    return response.data.data
}

export const rideMalfunction = async ({ token, id, data }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.post(
        `${URL}/api/bookings/${id}/help/malfunction`,
        data,
        config
    )

    // console.log('rideMalfunction response', response)

    return response.data.data
}

export const rideLate = async ({ token, id, notificationId, data }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.post(
        `${URL}/api/bookings/${id}/help/late/${notificationId}/details`,
        data,
        config
    )

    console.log('rideLate response', response)

    return response.data.data
}

export const rideLateNotification = async ({ token, id }) => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.post(
        `${URL}/api/bookings/${id}/help/late`,
        {},
        config
    )

    console.log('rideLate response', response)

    return response.data.data
}

export const toFormData = data => {
    let form = new FormData()

    forEach(data, (field, fieldName) => {
        if (typeof field === 'object' && field.length) {
            forEach(field, (value, key) => {
                // console.log(`${fieldName}[${key}]`, value)

                form.append(`${fieldName}[${key}]`, value)
            })
        } else {
            // console.log(fieldName, field)

            form.append(fieldName, field)
        }
    })

    for (let pair of form.entries()) {
        console.log(pair[0] + ', ' + pair[1])
    }

    return form
}

export const fetchCarCategories = async token => {
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    let response = await axios.get(`${URL}/api/cars/categories`, config)

    console.log('fetchCarCategories response', response)

    return response.data.data
}

/**
 * Send device registration token to server
 * @param token Authorization token
 * @returns {Promise<void>}
 */
export const sendDeviceToken = async token =>{
    const device_token = await  FCM.getFCMToken()
    if (device_token) {

        console.log(device_token)
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        const data = new FormData()
        data.append('device_token',device_token)
        const response = await axios.post(`${URL}/api/device_token`,data, config)
        console.log(response)
        return response.data.data
    }


}/**
 * Remove device registration token from server when user logout
 * @param token Authorization token
 * @returns {Promise<void>}
 */
export const removeDeviceToken = async token =>{



    const device_token = await FCM.getFCMToken()
    if (device_token) {

        console.log('removeDeviceToken>',device_token)
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        const data = new FormData()
        data.append('device_token',device_token)
        const response = await axios.post(`${URL}/api/delete_device_token`,data, config)
        console.log('removeDeviceToken', response)
        return response.data.data
    }


}