import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import { icons } from 'images'
import styles from './styles'

const Photo = ({ onPress, imageUri, touchable = true }) => {
  let image = ''
  if (imageUri) image = { uri: imageUri }
  let Wrapper = touchable ? TouchableOpacity : View
  return (
    <Wrapper style={styles.photoContainer} onPress={onPress}>
      {imageUri ? (
        <Image source={image} style={styles.licenseImage} />
      ) : (
        <Image source={icons['camera']} style={styles.iconCamera} />
      )}
    </Wrapper>
  )
}

Photo.propTypes = {
  imageUri: PropTypes.string,
  touchable: PropTypes.bool,
  onPress: PropTypes.func
}

export { Photo }
