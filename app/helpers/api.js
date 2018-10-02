import axios from 'axios'
import { RNS3 } from 'react-native-aws3'

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

export const register = async (user) => {
  console.log('user', user)
  let config = {
    // headers: {'Content-Type': 'multipart/form-data'}
  }
  let response = await axios.post(`${URL}/api/register/create`, user, config)
  console.log('register response', response)
  return response
}

export const checkStatus = async (id) => {
  let response = await axios.post(`${URL}/api/users/${id}/check-status`)
  console.log('register response', response)
  return response.data
}

export const validateEmail = async (email) => {

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
  let response = await RNS3.put(imageFile, options)

  console.log(response)
  if (response.status !== 201) throw new Error('Failed to upload image to S3')
  return response.body.postResponse.location
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
