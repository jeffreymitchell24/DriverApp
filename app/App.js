import React from 'react'
import { Root } from 'navigation/config'
import NavigationService from 'navigation/NavigationService'

const App = (props) => (
  <Root
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef)
    }}
  />
)

// new changes

export default App
