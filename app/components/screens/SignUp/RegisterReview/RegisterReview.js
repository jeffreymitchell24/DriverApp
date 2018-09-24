import React from 'react'
import { View, Text, Image } from 'react-native'
import {backgrounds} from 'images'
import styles from './styles'

const RegisterReview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents submitted!</Text>
      <View style={styles.imageContainer}>
        <Image resizeMode='contain' source={backgrounds['highFive']} style={styles.image} />
      </View>
      <Text style={styles.mainText}>We are reviewing your documents and will send you push notification and email once it’s ready! </Text>
      <Text style={styles.subText}>It usually takes less than 4 hours.</Text>
    </View>
  )
}

export default RegisterReview
