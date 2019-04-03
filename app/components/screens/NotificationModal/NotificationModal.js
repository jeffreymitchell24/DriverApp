import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'components/ui'
import { BookingDetail } from 'navigation/routeNames'
import styles from './styles'

class NotificationModal extends Component {
  componentDidMount() {
    const {bookings} = this.props
    if (!bookings.length) {
      this.props.onFetchUserBookings('upcoming')
    }
  }
  hahdleSaveYes = () => {
    const {bookings} = this.props

    const bookin = bookings[0]

    this.props.onSelectRide(bookin)
    this.props.navigation.navigate(BookingDetail)
  }
  hahdleSaveNo = () => {
    const negativeScreen = this.props.navigation.getParam('negativeScreen', null)
    this.props.navigation.navigate(negativeScreen, {hideSplash: true})
  }
  render() {
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
