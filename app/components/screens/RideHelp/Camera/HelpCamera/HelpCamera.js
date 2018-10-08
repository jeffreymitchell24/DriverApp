import React, { Component } from 'react'
import { CameraView } from 'components/blocks'
import PropTypes from 'prop-types'
import {HelpPhotoPreview, HelpPhotoGallery} from 'navigation/routeNames'

class HelpCamera extends Component {
  getCamRef = (ref) => (this.camera = ref)
  onTakePicture = ({photoUri}) => {
    this.props.navigation.navigate(HelpPhotoPreview, {
      photoUri
    })
  }

  onGalleryPress = () => {
    this.props.navigation.navigate(HelpPhotoGallery)
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

HelpCamera.propTypes = {
  navigation: PropTypes.object
}

export default HelpCamera
