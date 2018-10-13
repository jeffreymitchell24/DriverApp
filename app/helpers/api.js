import axios from 'axios'
import { RNS3 } from 'react-native-aws3'
import forEach from 'lodash/forEach'
const URL = 'http://54.183.254.243'

const AWS_ACCESS_KEY_ID = 'AKIAI5DVRLUDPCC3GE6Q'
const AWS_SECRET_ACCESS_KEY = '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'
const AWS_DEFAULT_REGION = 'us-west-1'
const AWS_BUCKET = 'carflow'

export const authorize = async (email, password) => {
  console.log('credentials', {email, password})
  let response = await axios.post(`${URL}/api/login`, {email, password})
  console.log('authorize response', response)
  return response.data
}

export const resetPassword = async (email) => {
  let response = await axios.post(`${URL}/api/password/email`, {email})
  console.log('resetPassowrd response', response)
  return response
}

export const resubmit = async (userData, token) => {
  console.log('user', userData)
  console.log('token', token)
  let config = {
    headers: {'Authorization': `Bearer ${token}`},
    'Content-Type': 'multipart/form-data'
  }
  let response = await axios.post(`${URL}/api/users/resubmit`, userData, config)
  console.log('register response', response)
  return response.data.data
}

export const register = async (user) => {
  console.log('user', user)
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  let response = await axios.post(`${URL}/api/register/create`, user, config)
  // let response = await fetch(`${URL}/api/register/create`, {
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'multipart/form-data'
  //   },
  //   method: 'POST',
  //   body: user
  // })
  console.log('register response', response)
  return response.data.data
}

export const checkStatus = async (token) => {
  let config = {
    headers: {'Authorization': `Bearer ${token}`}
  }
  let response = await axios.get(`${URL}/api/users/status`, config)
  console.log('checkStatus response', response)
  return response.data.data
}

export const validateEmail = async (email) => {
  let response = await axios.post(`${URL}/api/validate-email`, {email})
  console.log('validateEmail response', response)
  return response.data.data
}

export const updateUser = async ({token, data}) => {
  let config = {
    headers: {'Authorization': `Bearer ${token}`}
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

export const uploadImageToAws = async (imageFile) => {
  try {
    let response = await RNS3.put(imageFile, options)
    console.log(response)
    if (response.status !== 201) throw new Error('Failed to upload image to S3')
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

export const fetchUpcomingBookings = async (token) => {
  let config = {
    headers: {'Authorization': `Bearer ${token}`}
  }
  let response = await axios.get(`${URL}/api/bookings/upcoming`, config)
  console.log('fetchUpcomingBookings response', response)
  return response.data.data
}

export const fetchBookingsHistory = async (token) => {
  let config = {
    headers: {'Authorization': `Bearer ${token}`}
  }
  let response = await axios.get(`${URL}/api/bookings/history`, config)
  console.log('fetchBookingsHistory response', response)
  return response.data.data
}

export const fetchAvailableCars = async (token) => {
  let config = {
    headers: {'Authorization': `Bearer ${token}`}
  }
  let response = await axios.get(`${URL}/api/cars/available`, config)
  console.log('fetchAvailableCars response', response)
  return response.data.data
}

export const fetchCarDetails = async ({token, id}) => {
  let config = {
    headers: {'Authorization': `Bearer ${token}`}
  }
  let response = await axios.get(`${URL}/api/cars/${id}/book`, config)
  console.log('fetchAvailableCars response', response)
  return response.data.data
}

export const bookCar = async ({token, id, timeStamps}) => {
  let config = {
    headers: {'Authorization': `Bearer ${token}`}
  }
  let response = await axios.post(`${URL}/api/cars/${id}/book`, timeStamps, config)
  console.log('bookCar response', response)
  return response.data.data
}

export const toFormData = (data) => {
  let form = new FormData()
  forEach(data, (field, fieldName) => {
    form.append(fieldName, field)
  })
  return form
}
