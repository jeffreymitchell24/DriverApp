import { createStackNavigator } from 'react-navigation'
import React from 'react'
import { NavBackImage } from 'components/ui'
// import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'
import SignUpStepOne from './stack/SignUpStepOne'
import SignUpStepTwo from './stack/SignUpStepTwo'
import SignUpStepThree from './stack/SignUpStepThree'
import SignIn from './stack/SignIn'
import ResetPassword from './stack/ResetPassword'

export const SignUpStack = createStackNavigator(
  {
    SignUpStepOne: {
      screen: SignUpStepOne,
      navigationOptions: {
        title: 'Step 1'
      }
    },
    SignUpStepTwo: {
      screen: SignUpStepTwo,
      navigationOptions: {
        title: 'Step 2'
      }
    },
    SignUpStepThree: {
      screen: SignUpStepThree,
      navigationOptions: {
        title: 'Step 3'
      }
    }
  },
  {
    // transitionConfig: () => {
    //   return {screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    // },
    headerLayoutPreset: 'center',
    navigationOptions: {
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
  }
)

export const SignInStack = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In'
    }
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      title: 'Reset your password',
      headerTitle: null
    }
  }
},
{
  headerLayoutPreset: 'center',
  navigationOptions: {
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
}
)
