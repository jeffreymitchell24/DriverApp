import React, { Component } from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { RNCamera } from 'react-native-camera'
import {PicturePreview} from 'navigation/routeNames'
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
      this.props.navigation.navigate(PicturePreview, {
        photoUri: data.uri
      })
      this.setState({pictureSaving: false})
    }
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
              <TouchableOpacity style={styles.captureButton} onPress={this.takePicture} />
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
