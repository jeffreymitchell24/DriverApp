import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { NavButton, HelpCenterSection, Button } from 'components/ui'
import {HelpCenter} from 'navigation/routeNames'
import styles from './styles'

class RideCancel extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavButton icon='cancel' imageStyle={{height: 12, width: 12}} onPress={() => navigation.navigate(HelpCenter)} />
    }
  }

  onCancel = () => {
    this.props.navigation.navigate(HelpCenter)
  }

  onConfirm = () => {
    this.props.navigation.navigate(HelpCenter)
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
      </HelpCenterSection>
    )
  }
}

RideCancel.propTypes = {
  navigation: PropTypes.object
}

export default RideCancel
