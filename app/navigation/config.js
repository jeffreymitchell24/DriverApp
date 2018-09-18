import { createStackNavigator } from 'react-navigation'
import { NavBackImage } from 'components/ui'
import React from 'react'
import Intro from 'components/screens/Intro'
// import { SignUpStack, SignInStack } from './stackNavigation'
import Account from 'components/screens/SignUp/Account'
import PersonalInfo from 'components/screens/SignUp/PersonalInfo'
import Documentation from 'components/screens/SignUp/Documentation'
import DocumentsCamera from 'components/screens/SignUp//DocumentsCamera'
import RegisterReview from 'components/screens/SignUp/RegisterReview'
import PicturePreview from 'components/screens/SignUp/PicturePreview'
import PictureGallery from 'components/screens/SignUp/PictureGallery'
import TermsConditions from 'components/screens/TermsConditions'
import SignIn from 'components/screens/SignIn'
import ResetPassword from 'components/screens/ResetPassword'

let navigationOptions = {
  headerStyle: {
    elevation: 0
  },
  headerTitleStyle: {
    fontSize: 16,
    fontFamily: 'SFProText-Regular',
    fontWeight: 'normal',
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
    Account: {
      screen: Account,
      navigationOptions: {
        title: 'Account',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    PersonalInfo: {
      screen: PersonalInfo,
      navigationOptions: {
        title: 'Personal Information',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    Documentation: {
      screen: Documentation,
      navigationOptions: {
        title: 'Documentation',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    DocumentsCamera: {
      screen: DocumentsCamera,
      navigationOptions: {
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    PicturePreview: {
      screen: PicturePreview,
      navigationOptions: {
        header: null
      }
    },
    PictureGallery: {
      screen: PictureGallery,
      navigationOptions: {
        title: 'Select photo',
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
    },
    TermsConditions: {
      screen: TermsConditions,
      navigationOptions: {
        title: 'Terms & conditions',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    RegisterReview: {
      screen: RegisterReview,
      navigationOptions: {
        title: null,
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
