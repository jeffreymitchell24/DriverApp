import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {PicturePreviewView} from 'components/blocks'
import {ReceiptSubmit} from 'navigation/routeNames'

class ReceiptPreview extends Component {
  onCancelPress = () => {
    this.props.navigation.goBack()
  }

  onConfirmPress = (photoUri) => {
    const {navigation, onSaveReceiptPhoto} = this.props
    onSaveReceiptPhoto(photoUri)
    navigation.navigate(ReceiptSubmit)
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
  onSaveReceiptPhoto: PropTypes.func
}

export default ReceiptPreview
