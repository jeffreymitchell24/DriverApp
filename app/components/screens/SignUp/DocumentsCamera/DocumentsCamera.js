import React, { Component } from 'react'
import { View, TouchableOpacity, ActivityIndicator, CameraRoll, Image } from 'react-native'
import PropTypes from 'prop-types'
import { RNCamera } from 'react-native-camera'
import { icons } from 'images'
import {PicturePreview, PictureGallery} from 'navigation/routeNames'
import { colors } from 'theme'
import styles from './styles'

class DocumentsCamera extends Component {
  state = {
    pictureSaving: false
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '')
    }
  };

  getCamRef = (ref) => (this.camera = ref)
  takePicture = async () => {
    this.setState({pictureSaving: true})
    if (this.camera) {
      const options = { quality: 0.5, base64: true, fixOrientation: true }
      const data = await this.camera.takePictureAsync(options)
      let cameraRollUri = await CameraRoll.saveToCameraRoll(data.uri, 'photo')
      this.props.navigation.navigate(PicturePreview, {
        photoUri: cameraRollUri
      })
      this.setState({pictureSaving: false})
    }
  }

  onGalleryPress = () => {
    this.props.navigation.navigate(PictureGallery)
  }

  render () {
    return (
      <View style={styles.container}>
        <RNCamera
          flashMode={RNCamera.Constants.FlashMode.auto}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          permissionDialogTitle={'Permission to use camera'}
          ref={this.getCamRef}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
        />
        {
          this.state.pictureSaving
            ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator color={colors.red} size='large' />
              </View>
            ) : (
              <React.Fragment>
                <TouchableOpacity style={styles.captureButton} onPress={this.takePicture} />
                <TouchableOpacity style={styles.galleryButton} onPress={this.onGalleryPress}>
                  <Image source={icons['gallery']} style={styles.galleryIcon} />
                </TouchableOpacity>
              </React.Fragment>
            )
        }
      </View>
    )
  }
}

DocumentsCamera.propTypes = {
  navigation: PropTypes.object
}

export default DocumentsCamera
