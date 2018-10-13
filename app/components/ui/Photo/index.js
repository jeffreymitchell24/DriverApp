import React from 'react'
import {
  Image,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { icons } from 'images'
import styles from './styles'

const Photo = ({onPress, imageUri}) => {
  let image = ''
  if (imageUri) image = {uri: imageUri}
  return (
    <TouchableOpacity style={styles.photoContainer} onPress={onPress}>
      {
        imageUri
          ? (
            <Image source={image} style={styles.licenseImage} />
          ) : (
            <Image source={icons['camera']} style={styles.iconCamera} />
          )
      }
    </TouchableOpacity>
  )
}

Photo.propTypes = {
  imageUri: PropTypes.string,
  onPress: PropTypes.func
}

export {Photo}
