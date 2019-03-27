import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'components/ui'
import styles from './styles'

class NotificationModal extends Component {
  hahdleSaveYes = () => {
    const positiveScreen = this.props.navigation.getParam('positiveScreen', null)
    this.props.navigation.navigate(positiveScreen, {hideSplash: true})
  }
  hahdleSaveNo = () => {
    const negativeScreen = this.props.navigation.getParam('negativeScreen', null)
    this.props.navigation.navigate(negativeScreen, {hideSplash: true})
  }
  render() {
    console.log('this.props NotificationModal')
    const negativeText = this.props.navigation.getParam('negativeText', null)
    const positiveText = this.props.navigation.getParam('positiveText', null)
    const title = this.props.navigation.getParam('title', null)
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>
          {title}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.yesButton}
            title={positiveText}
            onPress={this.hahdleSaveYes}
          />
          <Button
            containerStyle={styles.noButton}
            title={negativeText}
            onPress={this.hahdleSaveNo}
          />
        </View>
      </View>
    )
  }
}

export default NotificationModal
