import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {PicturePreviewView} from 'components/blocks'
import {ReceiptSubmit, RideEnd} from 'navigation/routeNames'

class ReceiptPreview extends Component {
  onCancelPress = () => {
    this.props.navigation.goBack()
  }

  onConfirmPress = (photoUri) => {
    const {navigation, onSavePhoto, selectedPhoto} = this.props
    const {type, index} = selectedPhoto
    onSavePhoto({type, index, photoUri})
    if (type === 'gasTankPhotos' || type === 'carPhotos') navigation.navigate(RideEnd)
    else if (type === 'receiptPhoto') navigation.navigate(ReceiptSubmit)
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
ReceiptPreview.propTypes = {
  navigation: PropTypes.object,
  selectedPhoto: PropTypes.object,
  onSavePhoto: PropTypes.func
}

export default ReceiptPreview
