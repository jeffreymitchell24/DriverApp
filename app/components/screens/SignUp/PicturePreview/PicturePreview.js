import React, { Component } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import { colors } from 'theme'
import styles from './styles'

class PicturePreview extends Component {
  onCancelPress = () => {

  }

  onConfirmPress = () => {

  }

  render () {
    const photoUri = this.props.navigation.getParam('photoUri', null)
    return (
      <ImageBackground source={{uri: photoUri}} style={styles.preview}>
        <TouchableOpacity style={styles.cancel} onPress={this.onCancelPress}>
          <Icon color={colors.white} name='x' size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirm} onPress={this.onConfirmPress} >
          <Icon color={colors.white} name='check' size={30} />
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}
PicturePreview.propTypes = {
  navigation: PropTypes.object
}

export default PicturePreview
