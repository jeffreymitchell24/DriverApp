import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {PicturePreviewView} from 'components/blocks'
import {ProfileMain} from 'navigation/routeNames'

class PicturePreview extends Component {
  onCancelPress = () => {
    this.props.navigation.goBack()
  }

  onConfirmPress = () => {
    const {navigation} = this.props
    navigation.navigate(ProfileMain)
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
PicturePreview.propTypes = {
  navigation: PropTypes.object
}

export default PicturePreview
