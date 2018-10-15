import React from 'react'
import { View, Text, Image } from 'react-native'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import {Home} from 'navigation/routeNames'
import PropTypes from 'prop-types'
import {backgrounds} from 'images'
import { Button } from 'components/ui'
import styles from './styles'

const BookingConfirmed = ({navigation}) => {
  const onBackButtonPressAndroid = () => true
  const onPress = () => {
    navigation.navigate(Home)
  }
  let {car = '', startDate = '', endDate = ''} = navigation.getParam('bookingData', {})
  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Booking Confirmed!</Text>
          <View style={styles.imageContainer}>
            <Image resizeMode='contain' source={backgrounds['highFive']} style={styles.image} />
          </View>
          <Text style={styles.mainText}>{`You have successfully booked a ride from ${startDate} to ${endDate} on ${car}.`}</Text>
        </View>
        <Button
          containerStyle={styles.button}
          inverted
          textStyle={styles.buttonText}
          title='CONTINUE'
          onPress={onPress}
        />
      </View>
    </AndroidBackHandler>
  )
}

BookingConfirmed.propTypes = {
  navigation: PropTypes.object
}

export default BookingConfirmed
