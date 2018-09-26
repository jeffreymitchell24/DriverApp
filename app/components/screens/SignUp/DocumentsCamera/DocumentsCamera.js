import React, { Component } from 'react'
import { CameraView } from 'components/blocks'
import PropTypes from 'prop-types'
import {PicturePreview, PictureGallery} from 'navigation/routeNames'

class DocumentsCamera extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '')
    }
  };

  getCamRef = (ref) => (this.camera = ref)
  onTakePicture = ({photoUri}) => {
    this.props.navigation.navigate(PicturePreview, {
      photoUri
    })
  }

  onGalleryPress = () => {
    this.props.navigation.navigate(PictureGallery)
  }

  render () {
    return (
      <CameraView
        onGalleryPress={this.onGalleryPress}
        onTakePicture={this.onTakePicture}
      />
    )
  }
}

DocumentsCamera.propTypes = {
  navigation: PropTypes.object
}

export default DocumentsCamera
