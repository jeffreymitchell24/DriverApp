import React, { PureComponent } from 'react'
import { View, Text, Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import PropTypes from 'prop-types'
import { NavButton, HelpCenterSection, Button } from 'components/ui'
import {HelpCenter, Home} from 'navigation/routeNames'
import { colors } from 'theme'
import styles from './styles'

class RideCancel extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavButton icon='cancel' imageStyle={{height: 12, width: 12}} onPress={() => navigation.navigate(HelpCenter)} />
    }
  }

  componentDidUpdate (prevProps) {
    const {error, requestPending, navigation} = this.props
    if (prevProps.requestPending && !requestPending) {
      if (error)Alert.alert('Error', error)
      else navigation.navigate(Home)
    }
  }

  componentWillUnmount () {
    this.props.error && this.props.onResetError()
  }

  onCancel = () => {
    this.props.navigation.navigate(HelpCenter)
  }

  onConfirm = () => {
    this.props.onConfirm({carId: this.props.ride.id})
  }

  render () {
    let cancelLoss = '100'
    return (
      <HelpCenterSection>
        <View style={styles.container}>
          <View>
            <Text style={styles.cancelLoss}>-${cancelLoss}</Text>
            <Text style={styles.cancelText}>
              If you cancel,
              <Text style={styles.cancelTextBold}> ${cancelLoss} </Text>
              will be deducted from your earning. Are you sure you want to cancel booking?
            </Text>
          </View>
          <View style={styles.footerButtons}>
            <Button
              containerStyle={styles.cancelButton}
              textStyle={styles.cancelButtonText}
              title='DECLINE'
              onPress={this.onCancel} />
            <Button
              containerStyle={styles.confirmButton}
              title='CONFIRM'
              onPress={this.onConfirm} />
          </View>
        </View>
        <Spinner color={colors.red} visible={this.props.requestPending} />
      </HelpCenterSection>
    )
  }
}

RideCancel.propTypes = {
  error: PropTypes.string,
  navigation: PropTypes.object,
  requestPending: PropTypes.bool,
  ride: PropTypes.object,
  onConfirm: PropTypes.func,
  onResetError: PropTypes.func
}

RideCancel.defaultProps = {
  ride: {}
}

export default RideCancel
