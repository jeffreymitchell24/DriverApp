
import { Image, Platform } from 'react-native'
import ImageResizer from 'react-native-image-resizer'
import RNFetchBlob from 'rn-fetch-blob'
var RNFS = require('react-native-fs')
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
  let uri = imageUri
  let uriToUpload = imageUri
  let imageSize = await getImageSize(uriToUpload)
  let ratio = imageSize.width / imageSize.height
  console.log(uri.includes('assets-library://asset', 0))
  if (uri.includes('assets-library://asset', 0)) {
    uri = await RNFS.copyAssetsFileIOS(uri, RNFS.DocumentDirectoryPath + `${uuidv4()}.jpg`, imageSize.width, imageSize.height)
    console.log('res', uri)
  }
  console.log('imageUri', uri)
  let details = await RNFS.stat(uri)
  console.log('details', details)
  console.log('uriToUpload 1', uriToUpload)
  if (details.size > maxSize) {
    console.log('imageSize', imageSize)
    const result = await ImageResizer.createResizedImage(uri, 800, 800 / ratio, 'JPEG', 60)
    console.log('RESIZE RESULT', result)
    uriToUpload = Platform.OS === 'android' ? result.uri : result.path
  }
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
