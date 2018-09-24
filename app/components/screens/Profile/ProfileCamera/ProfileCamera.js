import React, { Component } from 'react'
import { CameraView } from 'components/blocks'
import PropTypes from 'prop-types'
import {PicturePreview, PictureGallery} from 'navigation/routeNames'

class ProfileCamera extends Component {
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
        switchable
        onGalleryPress={this.onGalleryPress}
        onTakePicture={this.onTakePicture}
      />
    )
  }
}

ProfileCamera.propTypes = {
  navigation: PropTypes.object
}

export default ProfileCamera
