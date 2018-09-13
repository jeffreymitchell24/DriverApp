import { createStackNavigator } from 'react-navigation'
import React from 'react'

import { Header } from 'components/blocks'

import Intro from './stack/Intro'
import Register from './stack/Register'
import PersonalInfo from './stack/PersonalInfo'

export const Root = createStackNavigator({
  Intro: {
    screen: Intro,
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
  initialRouteName: 'Intro',
  mode: 'modal',
  headerMode: 'screen'
})
