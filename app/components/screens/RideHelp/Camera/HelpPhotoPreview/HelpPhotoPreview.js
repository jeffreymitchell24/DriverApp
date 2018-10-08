import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {PicturePreviewView} from 'components/blocks'
import {RideMalfunction, RideDamaged, RideLateDescription} from 'navigation/routeNames'

class HelpPhotoPreview extends Component {
  onCancelPress = () => {
    this.props.navigation.goBack()
  }

  onConfirmPress = (photoUri) => {
    const {navigation, onSavePhoto, selectedPhoto} = this.props
    const {type, index} = selectedPhoto
    onSavePhoto({type, index, photoUri})
    if (type === 'rideDamagedPhotos') navigation.navigate(RideDamaged)
    else if (type === 'rideMalfunctionPhotos') navigation.navigate(RideMalfunction)
    else if (type === 'rideLatePhotos') navigation.navigate(RideLateDescription)
  }

  render () {
    const photoUri = this.props.navigation.getParam('photoUri', null)
    return (
      <PicturePreviewView
        photoUri={photoUri}
        onCancelPress={this.onCancelPress}
        onConfirmPress={this.onConfirmPress}
      />
    )
  }
}
HelpPhotoPreview.propTypes = {
  navigation: PropTypes.object,
  selectedPhoto: PropTypes.object,
  onSavePhoto: PropTypes.func
}

export default HelpPhotoPreview
