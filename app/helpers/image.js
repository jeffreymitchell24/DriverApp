// import RNFetchBlob from 'rn-fetch-blob'

var RNFS = require('react-native-fs')
const uuidv4 = require('uuid/v4')

export const toImageFile = async (image, maxSize = 100000) => {
  let uri = image.uri

  if (uri.includes('assets-library://asset', 0)) {
    uri = await RNFS.copyAssetsFileIOS(
      uri,
      RNFS.DocumentDirectoryPath + `/${uuidv4()}.jpg`
    )
  }

  let imageFile = {
    name: `${uuidv4()}`,
    fileName: image.fileName,
    type: image.type,
    uri: image.uri
  }

  return imageFile
}
