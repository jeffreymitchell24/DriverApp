
import { Image } from 'react-native'
import ImageResizer from 'react-native-image-resizer'
import RNFetchBlob from 'rn-fetch-blob'
import {uploadImageToAws} from 'helpers/api'
const uuidv4 = require('uuid/v4')

function getImageSize (uri) {
  const success = (resolve) => (width, height) => {
    resolve({
      width,
      height
    })
  }
  const error = (reject) => (failure) => {
    reject(failure)
  }

  return new Promise((resolve, reject) => {
    Image.getSize(uri, success(resolve), error(reject))
  })
}

export const resizeAndUpload = async (imageUri, maxSize = 100000) => {
  let details = await RNFetchBlob.fs.stat(imageUri)
  let uriToUpload = imageUri
  console.log('details', details)
  console.log('uriToUpload 1', uriToUpload)
  if (details.size > maxSize) {
    let imageSize = await getImageSize(uriToUpload)
    console.log('imageSize', imageSize)
    const {uri} = await ImageResizer.createResizedImage(imageUri, imageSize.width, imageSize.height, 'JPEG', 60)
    let details2 = await RNFetchBlob.fs.stat(uri)
    console.log('details2', details2)
    uriToUpload = uri
  }
  let imageFile = {
    type: 'image/jpeg',
    name: `${uuidv4()}.jpg`,
    uri: uriToUpload
  }
  console.log('imageFIle', imageFile)
  let uploadedUrl = await uploadImageToAws(imageFile)
  console.log('uploadedUrl', uploadedUrl)
  return uploadedUrl
}
// export const convertLicences = async ({tlc, driving}) => {
//   let converted = {}
//   converted['tlc_license_front'] = await convertToBase64(tlc.front)
//   converted['tlc_license_back'] = await convertToBase64(tlc.back)
//   converted['driving_license_front'] = await convertToBase64(driving.front)
//   converted['driving_license_back'] = await convertToBase64(driving.back)

//   console.log('converted', converted)
//   return converted
// }
