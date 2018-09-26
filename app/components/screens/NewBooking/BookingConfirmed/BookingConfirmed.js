import React from 'react'
import { View, Text, Image } from 'react-native'
import {backgrounds} from 'images'
import { Button } from 'components/ui'
import styles from './styles'

const BookingConfirmed = () => {
  const onPress = () => {

  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <View style={styles.imageContainer}>
          <Image resizeMode='contain' source={backgrounds['highFive']} style={styles.image} />
        </View>
        <Text style={styles.mainText}>You have successfully booked a ride from August 30, 11:00 AM to August 31, 08:00 PM on Toyota Prius.</Text>
      </View>
      <Button
        containerStyle={styles.button}
        inverted
        textStyle={styles.buttonText}
        title='CONTINUE'
        onPress={onPress}
      />
    </View>
  )
}

export default BookingConfirmed
