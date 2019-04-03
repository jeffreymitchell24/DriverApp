import React, {Component} from 'react'
import Root from 'navigation/config'
import NavigationService from 'navigation/NavigationService'
import {Linking, Platform, Alert, View} from 'react-native'
import firebase from 'react-native-firebase'
import { NotificationScreen } from 'navigation/routeNames'

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
      const data = notification ? notification._data : null
      if (Platform.OS === 'ios' && data && data['gcm.notification.negativeScreen']) {
        const negativeScreen = data['gcm.notification.negativeScreen']
        const negativeText = data['gcm.notification.negativeText']
        const positiveScreen = data['gcm.notification.positiveScreen']
        const positiveText = data['gcm.notification.positiveText']
        const title = notification._title
        this.props.updateNotificationStatus()
        NavigationService.navigate(NotificationScreen, {hideSplash: true, negativeScreen, negativeText, positiveScreen, positiveText, title })
      }
    })
    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'Channel Name',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel')
    firebase.notifications().android.createChannel(channel)

    // the listener returns a function you can use to unsubscribe
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      if (Platform.OS === 'android') {
        const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true
        })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId('channelId') // e.g. the id you chose above
          .android.setSmallIcon('ic_stat_notification') // create this icon in Android Studio
          .android.setColor('#000000') // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High)

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err))
      } else if (Platform.OS === 'ios') {
        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .ios.setBadge(notification.ios.badge)

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err))
      }
    })
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action
      console.log('notificationOpenedListenernotificationAction', action)
      // Get information about the notification that was opened
      const notificationArr = notificationOpen.notification
      console.log('notificationOpenedListenernotification', notificationArr)
      const data = notificationArr ? notificationArr._data : null
      if (Platform.OS === 'ios' && data && data['gcm.notification.negativeScreen']) {
        const negativeScreen = data['gcm.notification.negativeScreen']
        const negativeText = data['gcm.notification.negativeText']
        const positiveScreen = data['gcm.notification.positiveScreen']
        const positiveText = data['gcm.notification.positiveText']
        const title = notificationArr._title

        this.props.updateNotificationStatus()
        NavigationService.navigate(NotificationScreen, {hideSplash: true, negativeScreen, negativeText, positiveScreen, positiveText, title})
      } else if (data['negativeScreen']) {
        const negativeScreen = data['negativeScreen']
        const negativeText = data['negativeText']
        const positiveScreen = data['positiveScreen']
        const positiveText = data['positiveText']
        const title = data['title']

        this.props.updateNotificationStatus()
        NavigationService.navigate(NotificationScreen, {hideSplash: true, negativeScreen, negativeText, positiveScreen, positiveText, title})
      }
    })
    const notificationOpen = await firebase.notifications().getInitialNotification()
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action
      console.log('notificationOpennotificationAction', action)
      // Get information about the notification that was opened
      const notification = notificationOpen.notification
      console.log('notificationOpennotification', notification)
      const data = notification ? notification._data : null
      if (Platform.OS === 'ios' && data && data['gcm.notification.negativeScreen']) {
        const negativeScreen = data['gcm.notification.negativeScreen']
        const negativeText = data['gcm.notification.negativeText']
        const positiveScreen = data['gcm.notification.positiveScreen']
        const positiveText = data['gcm.notification.positiveText']
        const title = notification._title

        this.props.updateNotificationStatus()
        NavigationService.navigate(NotificationScreen, {hideSplash: true, negativeScreen, negativeText, positiveScreen, positiveText, title})
      } else if (data['negativeScreen']) {
        const negativeScreen = data['negativeScreen']
        const negativeText = data['negativeText']
        const positiveScreen = data['positiveScreen']
        const positiveText = data['positiveText']
        const title = data['title']

        this.props.updateNotificationStatus()
        NavigationService.navigate(NotificationScreen, {hideSplash: true, negativeScreen, negativeText, positiveScreen, positiveText, title})
      }
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
