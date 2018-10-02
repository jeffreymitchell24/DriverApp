import React, {Component} from 'react'
import { View, Text, Image, BackHandler, AppState } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import PropTypes from 'prop-types'
import {Home} from 'navigation/routeNames'
import {backgrounds} from 'images'
import styles from './styles'

class RegisterReview extends Component {
  backPressCount = 0
  state = {
    appState: AppState.currentState
  }

  componentDidMount () {
    const hideSplash = this.props.navigation.getParam('hideSplash', false)
    if (hideSplash) SplashScreen.hide()

    AppState.addEventListener('change', this.onAppStateChange)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.user && prevProps.user.status !== 'approved' && this.props.user.status === 'approved') {
      this.props.navigation.navigate(Home)
    }
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.onAppStateChange)
  }

  checkUserStatus = () => {
    const {onCheckStatus, user} = this.props
    onCheckStatus(user.id)
  }

  onAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.checkUserStatus()
    }
    this.setState({appState: nextAppState})
  }

  onBackButtonPressAndroid = () => {
    if (this.backPressCount === 1) BackHandler.exitApp()
    this.backPressCount += 1
    return true
  }

  render () {
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <View style={styles.container}>
          <Text style={styles.title}>Documents submitted!</Text>
          <View style={styles.imageContainer}>
            <Image resizeMode='contain' source={backgrounds['highFive']} style={styles.image} />
          </View>
          <Text style={styles.mainText}>We are reviewing your documents and will send you push notification and email once it’s ready! </Text>
          <Text style={styles.subText}>It usually takes less than 4 hours.</Text>
        </View>
      </AndroidBackHandler>
    )
  }
}

RegisterReview.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  onCheckStatus: PropTypes.func
}

export default RegisterReview
