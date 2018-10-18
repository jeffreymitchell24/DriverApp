import React, { PureComponent } from 'react'
import { View, TouchableOpacity, ActivityIndicator, CameraRoll, Image } from 'react-native'
import throttle from 'lodash/throttle'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { RNCamera } from 'react-native-camera'
import { icons } from 'images'
import { colors } from 'theme'
import styles from './styles'

let FRONT = RNCamera.Constants.Type.front
let BACK = RNCamera.Constants.Type.back

class CameraView extends PureComponent {
  state = {
    type: BACK,
    pictureSaving: false
  }
  static propTypes = {
    switchable: PropTypes.bool,
    withGallery: PropTypes.bool,
    onGalleryPress: PropTypes.func,
    onTakePicture: PropTypes.func
  }
  static defaultProps = {
    switchable: false,
    withGallery: true
  }

  getCamRef = (ref) => (this.camera = ref)
  takePicture = async () => {
    this.setState({pictureSaving: true})
    if (this.camera) {
      let quality = this.state.type === BACK ? 0.5 : 0.8
      const options = { quality, base64: true, fixOrientation: true }
      const data = await this.camera.takePictureAsync(options)
      console.log('picture taken')
      let cameraRollUri = await CameraRoll.saveToCameraRoll(data.uri, 'photo')
      console.log('picture saved')
      this.props.onTakePicture({
        photoUri: cameraRollUri
      })
      this.setState({pictureSaving: false})
    }
  }

  onGalleryPress = () => {
    this.props.onGalleryPress()
  }

  onSwitchPress = throttle(() => {
    this.setState(state => ({type: state.type === BACK ? FRONT : BACK}))
  }, 1000)

  render () {
    return (
      <View style={styles.container}>
        <RNCamera
          flashMode={RNCamera.Constants.FlashMode.auto}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          permissionDialogTitle={'Permission to use camera'}
          ref={this.getCamRef}
          style={styles.preview}
          type={this.state.type}
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
                {this.props.withGallery && (
                  <TouchableOpacity style={styles.galleryButton} onPress={this.onGalleryPress}>
                    <Image source={icons['gallery']} style={styles.galleryIcon} />
                  </TouchableOpacity>
                )}
                {
                  this.props.switchable &&
                  <TouchableOpacity style={styles.switchButton} onPress={this.onSwitchPress}>
                    <Icon color={colors.white} name='ios-reverse-camera' size={60} />
                  </TouchableOpacity>
                }
              </React.Fragment>
            )
        }
      </View>
    )
  }
}

export {CameraView}
