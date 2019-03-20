import React, {Component} from 'react'
import Root from 'navigation/config'
import NavigationService from 'navigation/NavigationService'
import {Linking, Platform, Alert, View} from 'react-native'
import firebase from 'react-native-firebase'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
  }

  async componentDidMount() {
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log('notificationDisplayedListenernotification', notification)

      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    })
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      console.log('notificationListenernotification', notification)
    })
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action
      // Get information about the notification that was opened
      const notification = notificationOpen.notification
      console.log('notificationOpenedListenernotification', notification)
    })
    const notificationOpen = await firebase.notifications().getInitialNotification()
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action
      // Get information about the notification that was opened
      const notification = notificationOpen.notification
      console.log('notificationOpennotification', notification)
    }
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log('messageListener', message)

      // Process your message as required
    })
  }

  componentWillUnmount() {
    this.notificationDisplayedListener()
    this.notificationListener()
    this.notificationOpenedListener()
    this.messageListener()
  }

  // _handleOpenURL(event) {
  //   console.log(event.url)
  //   // const {user} = this.props

  //   console.log('isAuthed', this.props.isAuthed)
  //   if (event.url && this.props.isAuthed) {
  //     const screen = event.url.substr(event.url.lastIndexOf('/') + 1)
  //     setTimeout(() => {
  //       console.log('nav to ', screen)
  //       NavigationService.navigate(screen, {hideSplash: true})
  //     }, 2000)
  //   }
  // }

  render() {
    return (<Root
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef)
      }}
    />
    )
  }
}

export default App
