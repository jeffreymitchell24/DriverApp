import { createStackNavigator } from 'react-navigation'
import React from 'react'

import { Header } from 'components/blocks'

import Preloader from './stack/Preloader'
import Register from './stack/Register'
import PersonalInfo from './stack/PersonalInfo'

export const Root = createStackNavigator({
  Preloader: {
    screen: Preloader,
    navigationOptions: {
      title: null,
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: null,
      header: <Header text='Account' />
    }
  },
  PersonalInfo: {
    screen: PersonalInfo,
    navigationOptions: {
      title: null,
      header: <Header text='Personal information' />
    }
  }
},
{
  initialRouteName: 'Preloader',
  mode: 'modal',
  headerMode: 'screen'
})
