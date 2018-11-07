import React from 'react'
import { View, Text, Image } from 'react-native'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import { Home } from 'navigation/routeNames'
import PropTypes from 'prop-types'
import { backgrounds } from 'images'
import { Button } from 'components/ui'
import styles from './styles'

const BookingConfirmed = ({ navigation }) => {
  const onBackButtonPressAndroid = () => true
  const onPress = () => {
    navigation.navigate(Home)
  }

  let {
    car = '',
    startDate = '',
    endDate = '',
    isRecurring = false
  } = navigation.getParam('bookingData', {})

  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            {isRecurring ? 'Recurring booking created!' : 'Booking created!'}
          </Text>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={backgrounds['highFive']}
              style={styles.image}
            />
          </View>
          <Text style={styles.mainText}>
            {isRecurring
              ? `You have successfully created a recurring booking on every ${startDate.format(
                  'dddd [from] hh:mmA'
                )} to ${endDate.format('dddd hh:mmA')} on ${car}.`
              : `You have successfully created a booking on ${startDate.format(
                  'dddd DD MMM [from] hh:mmA'
                )} to ${endDate.format('dddd DD MMM hh:mmA')} on ${car}.`}
          </Text>
        </View>
        <Button
          containerStyle={styles.button}
          inverted
          textStyle={styles.buttonText}
          title="CONTINUE"
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
