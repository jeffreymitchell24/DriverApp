import React, { Component } from 'react'
import { CameraView } from 'components/blocks'
import PropTypes from 'prop-types'
import { ReceiptPreview, ReceiptGallery } from 'navigation/routeNames'

class ReceiptCamera extends Component {
  getCamRef = ref => (this.camera = ref)
  onTakePicture = ({ photoUri }) => {
    this.props.navigation.navigate(ReceiptPreview, {
      photoUri
    })
  }

  onGalleryPress = () => {
    this.props.navigation.navigate(ReceiptGallery)
  }

  render() {
    return (
      <CameraView
        withGallery={false}
        onGalleryPress={this.onGalleryPress}
        onTakePicture={this.onTakePicture}
      />
    )
  }
}

ReceiptCamera.propTypes = {
  navigation: PropTypes.object
}

export default ReceiptCamera
