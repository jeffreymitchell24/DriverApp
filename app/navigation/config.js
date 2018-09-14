import { createStackNavigator } from 'react-navigation'
import { NavBackImage } from 'components/ui'
import React from 'react'
import Intro from './stack/Intro'
// import { SignUpStack, SignInStack } from './stackNavigation'
import SignUpStepOne from './stack/SignUpStepOne'
import SignUpStepTwo from './stack/SignUpStepTwo'
import SignUpStepThree from './stack/SignUpStepThree'
import SignIn from './stack/SignIn'
import ResetPassword from './stack/ResetPassword'

let navigationOptions = {
  headerStyle: {
    elevation: 0
  },
  headerTitleStyle: {
    fontSize: 16,
    fontFamily: 'SFProText-Regular',
    color: '#343A40'
  },
  headerBackImage: (<NavBackImage />)
}

export const Root = createStackNavigator(
  {
    Intro: {
      screen: Intro,
      navigationOptions: {
        title: null,
        header: null
      }
    },
    SignUpStepOne: {
      screen: SignUpStepOne,
      navigationOptions: {
        title: 'Step 1',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    SignUpStepTwo: {
      screen: SignUpStepTwo,
      navigationOptions: {
        title: 'Step 2',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    SignUpStepThree: {
      screen: SignUpStepThree,
      navigationOptions: {
        title: 'Step 3',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: 'Sign In',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        title: 'Reset your password',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    }
  },
  {
    initialRouteName: 'Intro',
    headerLayoutPreset: 'center'
  }
)
