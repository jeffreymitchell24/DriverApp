import React from 'react'
import {Root} from 'navigation/config'
import NavigationService from 'navigation/NavigationService'
import firebase from "react-native-firebase";

// todo: willl be removed, only for test
const init = async () => {
    const enabled = await
        firebase.messaging().hasPermission();
    if (enabled) {
        // user has permissions
        return true
    } else {
        try {
            await
                firebase.messaging().requestPermission();
            // User has authorised
        } catch (error) {
            // User has rejected permissions
            return false
        }
    }

}
init();
const App = (props) => (
    <Root
        ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
        }}
    />
)

// new changes

export default App
