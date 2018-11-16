import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert} from 'react-native'
import {PicturePreviewView} from 'components/blocks'
import {ProfileMain} from 'navigation/routeNames'
import { Spinner } from 'components/ui'
import { colors } from 'theme'

class PicturePreview extends Component {
  componentDidUpdate (prevProps) {
    const {error, requestPending, navigation} = this.props
    if (prevProps.requestPending && !requestPending) {
      if (error)Alert.alert('Error', error)
      else navigation.navigate(ProfileMain)
    }
  }
  onCancelPress = () => {
    this.props.navigation.goBack()
  }

  onConfirmPress = (photoUri) => {
    const {onUpdateUserImage} = this.props
    onUpdateUserImage(photoUri)
  }

  render () {
    const photoUri = this.props.navigation.getParam('photoUri', null)
    return (
      <React.Fragment>
        <PicturePreviewView
          photoUri={photoUri}
          onCancelPress={this.onCancelPress}
          onConfirmPress={this.onConfirmPress}
        />
        <Spinner color={colors.red} visible={this.props.requestPending} />
      </React.Fragment>
    )
  }
}
PicturePreview.propTypes = {
  error: PropTypes.string,
  navigation: PropTypes.object,
  requestPending: PropTypes.bool,
  onUpdateUserImage: PropTypes.func
}

export default PicturePreview
