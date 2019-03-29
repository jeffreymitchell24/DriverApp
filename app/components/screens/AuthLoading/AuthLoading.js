import React, {Component} from 'react'
import {
  Keyboard,
  View
} from 'react-native'
import { Home, Intro, NotificationScreen } from 'navigation/routeNames'
import PropTypes from 'prop-types'

class AuthLoading extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {isAuthed} = this.props

    Keyboard.dismiss()

    if (isAuthed) {
      if (this.props.navigation.state.routeName === NotificationScreen) {
        return
      }
      this.props.navigation.navigate(Home, {hideSplash: true})
    } else {
      this.props.navigation.navigate(Intro, {hideSplash: true})
    }
  }

  render() {
    return (
      <View />
    )
  }
}

AuthLoading.propTypes = {
  isAuthed: PropTypes.bool,
  navigation: PropTypes.object
}
export default AuthLoading
