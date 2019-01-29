// import RNFetchBlob from 'rn-fetch-blob'
var RNFS = require('react-native-fs')
const uuidv4 = require('uuid/v4')

export const toImageFile = async (imageUri, maxSize = 100000) => {
  let uri = imageUri
  let uriToUpload = imageUri

  if (uri.includes('assets-library://asset', 0)) {
    uri = await RNFS.copyAssetsFileIOS(
      uri,
      RNFS.DocumentDirectoryPath + `/${uuidv4()}.jpg`
    )
  }

  let imageFile = {
    uri: uriToUpload,
    name: `${uuidv4()}.jpg`,
    type: 'image/jpeg'
  }

  return imageFile
}
