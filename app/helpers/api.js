import axios from 'axios'

const URL = 'http://54.183.254.243'

export const authorize = async (credentials) => {
  let response = await axios.post(`${URL}/api/login`, credentials)
  console.log('authorize response', response)
  return response
}

export const resetPassword = async (email) => {
  let response = await axios.post(`${URL}/api/password/email`, {email})
  console.log('resetPassowrd response', response)
  return response
}
