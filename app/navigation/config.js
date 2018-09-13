import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import React from 'react'

import { Header } from 'components/blocks'

import Intro from './stack/Intro'
import SignUpStepOne from './stack/SignUpStepOne'
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
    screen: SignUpStepOne,
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
