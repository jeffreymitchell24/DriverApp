import React, {Component} from 'react'
import Root from 'navigation/config'
import NavigationService from 'navigation/NavigationService'
import {Linking, Platform, View} from 'react-native'
import FCM, {
    FCMEvent,
    NotificationType,
    RemoteNotificationResult,
    WillPresentNotificationResult
} from "react-native-fcm"


class App extends Component {
    constructor(props) {
        super(props);
        console.log('props', props)
    }


    registerAppListener(navigation) {
        FCM.on(FCMEvent.Notification, notif => {
            console.log("Notification", notif);

            if (notif.action !== undefined) {
                this.showLocalNotificationWithAction()
            }


            if (Platform.OS === 'ios' && notif._notificationType === NotificationType.WillPresent && !notif.local_notification) {
                // this notification is only to decide if you want to show the notification when user if in foreground.
                // usually you can ignore it. just decide to show or not.
                notif.finish(WillPresentNotificationResult.All)
                return;
            }

            if (notif?.opened_from_tray && this.props.isAuthed) {
                console.log('nav to ', notif?.targetScreen)

                setTimeout(() => {
                    NavigationService.navigate(notif.targetScreen, {hideSplash: true})
                }, 500)
            }

            if (Platform.OS === 'ios') {
                //optional
                //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch (notif._notificationType) {
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                        // this type of notificaiton will be called only when you are in foreground.
                        // if it is a remote notification, don't do any app logic here. Another notification callback will be triggered with type NotificationType.Remote
                        break;
                }
            }
        });
    }


    componentDidMount() {

        Linking.addEventListener('url', this._handleOpenURL.bind(this));
        if (Platform.OS == 'ios') {
            this.registerAppListener()
        }
    }


    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenURL.bind(this));
    }

    showLocalNotificationWithAction() {
        FCM.presentLocalNotification({
            title: "Test Notification with action",
            body: "Force touch to reply",
            priority: "high",
            show_in_foreground: true,
            click_action: "com.myidentifi.fcm.text", // for ios
            android_actions: JSON.stringify([
                {
                    id: "view",
                    title: "view"
                },
                {
                    id: "dismiss",
                    title: "dismiss"
                }
            ]) // for android, take syntax similar to ios's. only buttons are supported
        });


    }


    _handleOpenURL(event) {
        console.log(event.url);
        // const {user} = this.props

        console.log('isAuthed', this.props.isAuthed)
        if (event.url && this.props.isAuthed) {
            const screen = event.url.substr(event.url.lastIndexOf('/') + 1)
            setTimeout(() => {
                console.log('nav to ', screen)
                NavigationService.navigate(screen, {hideSplash: true})
            }, 2000)
        }
    }


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
