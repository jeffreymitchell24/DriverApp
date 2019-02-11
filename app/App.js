import React from 'react'
import { Root } from 'navigation/config'
import NavigationService from 'navigation/NavigationService'

// import firebase from "react-native-firebase"


// firebase.database().ref('test').once('value', function(snapshot) {
//     console.log('postElement', snapshot.val());
// });

const App = (props) => (
  <Root
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef)
    }}
  />
)

// new changes

export default App
