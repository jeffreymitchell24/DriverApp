import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {PicturePreviewView} from 'components/blocks'
import {Documentation} from 'navigation/routeNames'

class PicturePreview extends Component {
  state = {
    key: 0
  }
  onCancelPress = () => {
    this.props.navigation.goBack()
  }

  onConfirmPress = () => {
    const {onUpdateLicense, selectedLicense, navigation} = this.props
    const {type, side} = selectedLicense
    const imageUri = navigation.getParam('photoUri', null)
    // Alert.alert('photoUri', imageUri)
    onUpdateLicense({
      type,
      side,
      imageUri
    })
    navigation.navigate(Documentation)
  }
  onError = () => {
    console.log('onError')
    const {key} = this.state
    if (key === 0) {
      this.setState({key: 1})
      Alert.alert('onError', 'onError')
    }
  }
  onLoadEnd = (e) => {
    console.log('onLoadEnd', e)
    const {key} = this.state
    if (key === 0) {
      this.setState({key: 1})
      Alert.alert('onLoadEnd', 'onLoadEnd')
    }
  }

  render () {
    const photoUri = this.props.navigation.getParam('photoUri', null)
    console.log(this.state.key)
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
  navigation: PropTypes.object,
  selectedLicense: PropTypes.object,
  onUpdateLicense: PropTypes.func
}

export default PicturePreview
