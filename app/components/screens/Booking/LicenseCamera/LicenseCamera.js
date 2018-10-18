import React, { Component } from 'react'
import { CameraView } from 'components/blocks'
import PropTypes from 'prop-types'
import {RideLicensePreview} from 'navigation/routeNames'

class LicenseCamera extends Component {
  getCamRef = (ref) => (this.camera = ref)
  onTakePicture = ({photoUri}) => {
    this.props.navigation.navigate(RideLicensePreview, {
      photoUri
    })
  }

  render () {
    return (
      <CameraView
        withGallery={false}
        onTakePicture={this.onTakePicture}
      />
    )
  }
}

LicenseCamera.propTypes = {
  navigation: PropTypes.object
}

export default LicenseCamera
