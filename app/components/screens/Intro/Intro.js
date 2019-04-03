import React, {Component} from 'react'
import {View, Image, Platform, Text, Keyboard, Dimensions, Alert, Linking} from 'react-native'
import PropTypes from 'prop-types'
import SplashScreen from 'react-native-splash-screen'
import {backgrounds} from 'images'
import {Button} from 'components/ui'
import {requestMainPermissions, requestFireabasePermission} from 'helpers/permission'
import {SignIn, Home, RegisterReview} from 'navigation/routeNames'
import {StackActions, NavigationActions, SafeAreaView} from 'react-navigation'
import Swiper from 'react-native-swiper'
import {CONFIG} from './config'
import styles from './styles'
import NavigationService from '../../../navigation/NavigationService'

class Intro extends Component {
  async componentDidMount () {
    const {user} = this.props

    // Linking.getInitialURL().then((url) => {
    //     if (url) {
    //         console.log('Initial url is: ' + url);
    //         this.setState({link: url.substr(url.lastIndexOf('/') + 1)})
    //         // NavigationService.navigate("Profile", {hideSplash: true})
    //     }
    // }).catch(err => console.log('An error occurred', err));
    Keyboard.dismiss()

    if (!user) {
      SplashScreen.hide()
      await requestMainPermissions()
      await requestFireabasePermission()
    } else {
      this.props.onCheckStatus(user.id)
    }
  }

  componentDidUpdate(prevProps) {
    const {isCheckingStatus, user} = this.props

    if (prevProps.isCheckingStatus && !isCheckingStatus) {

      if (user.status === 'pending') {
        this.onResetTo(RegisterReview)
      } else if (user.status === 'approved') {
        if (this.props.getFilters.notificationScreen) {
          return
        }
        this.props.navigation.navigate(Home, {hideSplash: true})
      } else if (user.status === 'rejected') {
        SplashScreen.hide()

        Keyboard.dismiss()

        setTimeout(
          () =>
            Alert.alert(
              'Account was rejected',
              'Please sign in and re-submit your documents'
            ),
          200
        )

        this.props.onSaveRejectedId(user.id)

        this.props.onSignOut()
      }
    }
  }

    onResetTo = route => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: route,
            params: {hideSplash: true}
          })
        ]
      })

      this.props.navigation.dispatch(resetAction)
    }

    handleStartPress = () => {
      this.props.navigation.navigate('Account')
    }

    handleSignInPress = () => {
      this.props.navigation.navigate(SignIn, {
        showFromBottom: true
      })
    }

    renderSlides = () => {
      return CONFIG.map((slideData, index) => {
        const {image, title, text} = slideData
        return (
          <View key={index} style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode={'contain'}
                source={backgrounds[image]}
                style={styles.previewImage}
              />
            </View>

            <View style={styles.slideTextContainer}>
              <Text style={styles.slideTitle}>{title}</Text>

              <Text style={styles.mainText}>{text}</Text>
            </View>
          </View>
        )
      })
    }

    render() {
      return (
        <SafeAreaView style={styles.container}>
          <Swiper
            activeDot={
              <View
                style={{
                  backgroundColor: 'rgb(222,71,71)',
                  width: height * 0.0063,
                  height: height * 0.0063,
                  borderRadius: 100,
                  marginLeft: 15,
                  marginRight: 15
                }}
              />
            }
            // autoplay
            autoplayTimeout={5}
            dot={
              <View
                style={{
                  backgroundColor: 'rgb(rgb(88, 92, 97))',
                  width: height * 0.0063,
                  height: height * 0.0063,
                  borderRadius: 100,
                  marginLeft: 15,
                  marginRight: 15
                }}
              />
            }
            paginationStyle={styles.paginationStyle}
            removeClippedSubviews={false}
          >
            {this.renderSlides()}
          </Swiper>

          <View style={styles.footer}>
            <Button
              containerStyle={styles.startButton}
              title={'LOGIN'}
              onPress={this.handleSignInPress}
            />

            <Text style={styles.bottomText}>{'Don’t have an account?'}</Text>

            <Text style={styles.bottomText}>
              <Text
                style={[styles.signInButtonText, {fontWeight: '700'}]}
                onPress={this.handleStartPress}
              >
                {' Sign up '}
              </Text>
              {'to book TLC car rentals'}
            </Text>
          </View>
        </SafeAreaView>
      )
    }
}

Intro.propTypes = {
  isCheckingStatus: PropTypes.bool,
  navigation: PropTypes.object,
  user: PropTypes.object,
  onCheckStatus: PropTypes.func,
  onSaveRejectedId: PropTypes.func,
  onSignOut: PropTypes.func
}

const height = Dimensions.get('window').height

export default Intro
