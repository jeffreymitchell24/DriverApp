import React from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import { colors } from 'theme'
import styles from './styles'

const PicturePreviewView = ({photoUri, onCancelPress, onConfirmPress}) => {
  const _onConfirmPress = () => {
    onConfirmPress(photoUri)
  }
  return (
    <ImageBackground source={{uri: photoUri}} style={styles.preview}>
      <TouchableOpacity style={styles.cancel} onPress={onCancelPress}>
        <Icon color={colors.white} name='x' size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirm} onPress={_onConfirmPress} >
        <Icon color={colors.white} name='check' size={30} />
      </TouchableOpacity>
    </ImageBackground>
  )
}
PicturePreviewView.propTypes = {
  photoUri: PropTypes.string,
  onCancelPress: PropTypes.func,
  onConfirmPress: PropTypes.func
}

export {PicturePreviewView}
