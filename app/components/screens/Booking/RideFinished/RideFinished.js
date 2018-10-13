import React from 'react'
import { View, Text, Image } from 'react-native'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import {Home} from 'navigation/routeNames'
import PropTypes from 'prop-types'
import {backgrounds} from 'images'
import { Button } from 'components/ui'
import styles from './styles'

const RideFinished = ({navigation}) => {
  const onBackButtonPressAndroid = () => true
  const onPress = () => {
    navigation.navigate(Home)
  }
  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Thanks for driving with us!</Text>
          <View style={styles.imageContainer}>
            <Image resizeMode='contain' source={backgrounds['highFive']} style={styles.image} />
          </View>
          <Text style={styles.mainText}>Your drive was successfully ended. Hope to see you soon again!</Text>
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

RideFinished.propTypes = {
  navigation: PropTypes.object
}

export default RideFinished
