import React, {PureComponent} from 'react'
import { View, Text, Image, BackHandler } from 'react-native'
import PropTypes from 'prop-types'
import {backgrounds} from 'images'
import styles from './styles'

class RegisterReview extends PureComponent {
  didFocusSubscription;
  _willBlurSubscription;
  backPressCount = 0
  constructor (props) {
    super(props)
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    )
  }
  componentDidMount () {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    )
  }
  componentWillUnmount () {
    this._didFocusSubscription && this._didFocusSubscription.remove()
    this._willBlurSubscription && this._willBlurSubscription.remove()
  }
  onBackButtonPressAndroid = () => {
    if (this.backPressCount === 1) BackHandler.exitApp()
    this.backPressCount += 1
    return true
  }

  render () {
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
}

RegisterReview.propTypes = {
  navigation: PropTypes.object
}

export default RegisterReview
