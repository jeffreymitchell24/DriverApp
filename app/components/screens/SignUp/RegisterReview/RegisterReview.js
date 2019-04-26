import React, { Component } from 'react'
import { View, Text, Image, BackHandler, AppState, Alert } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import { StackActions, NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'
import { Home, Intro } from 'navigation/routeNames'
import { backgrounds } from 'images'
import styles from './styles'

class RegisterReview extends Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    const hideSplash = this.props.navigation.getParam('hideSplash', false)
    setTimeout(() => {
      if (hideSplash) SplashScreen.hide()
    }, 500)

    AppState.addEventListener('change', this.onAppStateChange)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const prevProps = this.props

    if (prevProps.user && nextProps.user) {
      if (
        prevProps.user.status !== 'approved' &&
        nextProps.user.status === 'approved'
      ) {
        nextProps.navigation.navigate(Home)
      } else if (
        prevProps.user.status !== 'rejected' &&
        nextProps.user.status === 'rejected'
      ) {
        setTimeout(() => {
          Alert.alert(
            'Account was rejected',
            'Please sign in and re-submit your documents'
          )
          this.onResetTo(Intro)
          this.props.onSaveRejectedId(nextProps.user.id)
          this.props.onSignOut()
        }, 200)
      }
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onAppStateChange)
  }

  onResetTo = route => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  checkUserStatus = () => {
    const { onCheckStatus, user } = this.props
    user && onCheckStatus(user.id)
  }

  onAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.checkUserStatus()
    }
    this.setState({ appState: nextAppState })
  }

  onBackButtonPressAndroid = () => {
    BackHandler.exitApp()
    return true
  }

  render() {
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <View style={styles.container}>
          <Text style={styles.title}>Documents submitted!</Text>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={backgrounds['highFive']}
              style={styles.image}
            />
          </View>
          <Text style={styles.mainText}>
            We are reviewing your documents and will send you push notification
            and email once it’s ready!{' '}
          </Text>
          <Text style={styles.subText}>
            It usually takes less than 4 hours.
          </Text>
        </View>
      </AndroidBackHandler>
    )
  }
}

RegisterReview.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  onCheckStatus: PropTypes.func,
  onSaveRejectedId: PropTypes.func,
  onSignOut: PropTypes.func
}

export default RegisterReview
