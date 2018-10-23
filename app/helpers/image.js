
import { Image, Platform } from 'react-native'
import ImageResizer from 'react-native-image-resizer'
import RNFetchBlob from 'rn-fetch-blob'
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

export const toImageFile = async (imageUri, maxSize = 100000) => {
  // let details = await RNFetchBlob.fs.stat(imageUri)
  let uriToUpload = imageUri
  // console.log('details', details)
  // console.log('uriToUpload 1', uriToUpload)
  // if (details.size > maxSize) {
  //   let imageSize = await getImageSize(uriToUpload)
  //   console.log('imageSize', imageSize)
  //   // const result = await ImageResizer.createResizedImage(imageUri, imageSize.width, imageSize.height, 'JPEG', 60)
  //   // console.log('RESIZE RESULT', result)
  //   uriToUpload = imageUri// Platform.OS === 'android' ? result.uri : result.path
  // }
  // let imageFile = new FormData()
  // imageFile.append('image', {
  //   uri: uriToUpload,
  //   name: `${uuidv4()}.jpg`,
  //   type: 'image/jpeg'
  // })
  let imageFile = {
    uri: uriToUpload,
    name: `${uuidv4()}.jpg`,
    type: 'image/jpeg'
  }
  console.log('imageFIle', imageFile)
  return imageFile
}
