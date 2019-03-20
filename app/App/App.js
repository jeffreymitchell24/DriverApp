import React, {Component} from 'react'
import Root from 'navigation/config'
import NavigationService from 'navigation/NavigationService'
import {Linking, Platform, Alert, View} from 'react-native'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

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
