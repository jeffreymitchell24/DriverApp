import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert} from 'react-native'
import {PicturePreviewView} from 'components/blocks'
import {BookingDetail} from 'navigation/routeNames'
import Spinner from 'react-native-loading-spinner-overlay'
import { colors } from 'theme'

class LicensePreview extends Component {
  componentDidUpdate (prevProps) {
    const {error, requestPending, navigation, licenseChecked} = this.props
    if (prevProps.requestPending && !requestPending) {
      if (error) {
        Alert.alert(
          '',
          error,
          [
            {text: 'Cancel', onPress: () => navigation.navigate(BookingDetail), style: 'cancel'},
            {text: 'Try Again', onPress: () => this.onCancelPress()}
          ],
          { cancelable: false }
        )
      } else if (!error && licenseChecked) navigation.navigate(BookingDetail)
    }
  }
  onCancelPress = () => {
    this.props.navigation.goBack()
  }

  onConfirmPress = (photoUri) => {
    const {onCheckLicense, ride = {}} = this.props
    onCheckLicense({photoUri, carId: ride.id})
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
LicensePreview.propTypes = {
  error: PropTypes.string,
  licenseChecked: PropTypes.bool,
  navigation: PropTypes.object,
  requestPending: PropTypes.bool,
  ride: PropTypes.object,
  onCheckLicense: PropTypes.func
}

export default LicensePreview
