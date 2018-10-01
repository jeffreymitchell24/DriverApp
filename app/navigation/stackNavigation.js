import { createStackNavigator } from 'react-navigation'
import React from 'react'
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'

import { NavBackImage } from 'components/ui'
import BookingConfirmed from 'components/screens/NewBooking/BookingConfirmed'
import NewBookingDetails from 'components/screens/NewBooking/NewBookingDetails'
import AvailableBookings from 'components/screens/NewBooking/AvailableBookings'
import TermsConditions from 'components/screens/TermsConditions'
import ChangePassword from 'components/screens/Profile/ChangePassword'
import ChangesReview from 'components/screens/Profile/ChangesReview'
import ProfileDetails from 'components/screens/Profile/ProfileDetails'
import ProfileMain from 'components/screens/Profile/ProfileMain'
import PrivacyPolicy from 'components/screens/Profile/PrivacyPolicy'
import ProfileCamera from 'components/screens/Profile/ProfileCamera'
import PicturePreview from 'components/screens/Profile/PicturePreview'
import PictureGallery from 'components/screens/SignUp/PictureGallery'

import HelpCenter from 'components/screens/RideHelp/HelpCenter'
import RideMalfunction from 'components/screens/RideHelp/RideMalfunction'
import RideDamaged from 'components/screens/RideHelp/RideDamaged'
import RideAccident from 'components/screens/RideHelp/RideAccident'
import RideCancel from 'components/screens/RideHelp/RideCancel'
import RideLateDescription from 'components/screens/RideHelp/RideLateDescription'

export const NewBookingStack = createStackNavigator({
  BookingConfirmed: {
    screen: BookingConfirmed,
    navigationOptions: {
      title: null,
      header: null,
      headerTitle: null,
      headerBackTitle: null
    }
  },
  NewBookingDetails: {
    screen: NewBookingDetails,
    navigationOptions: {
      title: 'New booking',
      headerTitle: null,
      headerBackTitle: null
    }
  },
  AvailableBookings: {
    screen: AvailableBookings,
    navigationOptions: {
      title: 'New booking',
      headerTitle: null,
      headerBackTitle: null
    }
  }
},
{
  initialRouteName: 'AvailableBookings',
  headerLayoutPreset: 'center',
  navigationOptions: {
    headerStyle: {
      elevation: 0,
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      fontSize: 16,
      fontFamily: 'SFProText-Regular',
      fontWeight: 'normal',
      color: '#343A40'
    },
    headerLeftContainerStyle: {
      paddingLeft: 16
    },
    headerRightContainerStyle: {
      paddingRight: 16
    }
  }
}
)
// NewBookingStack.navigationOptions = ({ navigation }) => {
//   return {
//     headerLeft: <NavButton icon='cancel' onPress={() => navigation.navigate(Home)} />,
//     headerStyle: {
//       elevation: 0,
//       borderBottomWidth: 0
//     },
//     headerTitleStyle: {
//       fontSize: 16,
//       fontFamily: 'SFProText-Regular',
//       fontWeight: 'normal',
//       color: '#343A40'
//     }
//   }
// }

let navigationOptions = {
  headerStyle: {
    elevation: 0,
    borderBottomWidth: 0
  },
  headerBackImage: (<NavBackImage />),
  headerTitleStyle: {
    fontSize: 16,
    fontFamily: 'SFProText-Regular',
    fontWeight: 'normal',
    color: '#343A40'
  },
  headerLeftContainerStyle: {
    // paddingLeft: 16
  },
  headerRightContainerStyle: {
    paddingRight: 16
  }
}

export const ProfileStack = createStackNavigator({
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      title: 'Change password',
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions
    }
  },
  ChangesReview: {
    screen: ChangesReview,
    navigationOptions: {
      title: 'Approve changes',
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions
    }
  },
  ProfileCamera: {
    screen: ProfileCamera,
    navigationOptions: {
      title: 'Profile Photo',
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
  ProfileDetails: {
    screen: ProfileDetails,
    navigationOptions: {
      title: 'Personal details',
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions
    }
  },
  ProfileMain: {
    screen: ProfileMain,
    navigationOptions: {
      title: null,
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions,
      headerLeftContainerStyle: {
        paddingLeft: 22
      },
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0
      }
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
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: {
      title: 'Privacy policy',
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions
    }
  }
},
{
  initialRouteName: 'ProfileMain',
  headerLayoutPreset: 'center',
  transitionConfig: (prop) => {
    const routeName = prop.scene.route.routeName
    if (routeName === 'ChangesReview') {
      return {screenInterpolator: CardStackStyleInterpolator.forVertical}
    } else {
      return {screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    }
  }
})

export const HelpCenterStack = createStackNavigator({
  HelpCenter: {
    screen: HelpCenter,
    navigationOptions: {
      title: 'Help Center',
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions
    }
  },
  RideMalfunction: {
    screen: RideMalfunction,
    navigationOptions: {
      title: 'Car malfunctioned',
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions
    }
  },
  RideDamaged: {
    screen: RideDamaged,
    navigationOptions: {
      title: 'Car damaged',
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions
    }
  },
  RideAccident: {
    screen: RideAccident,
    navigationOptions: {
      title: 'I had an accident',
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions
    }
  },
  RideCancel: {
    screen: RideCancel,
    navigationOptions: {
      title: 'Cancel booking',
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions,
      headerLeftContainerStyle: {
        paddingLeft: 16
      }
    }
  },
  RideLateDescription: {
    screen: RideLateDescription,
    navigationOptions: {
      title: "I'm late",
      headerTitle: null,
      headerBackTitle: null,
      ...navigationOptions
    }
  }
},
{
  initialRouteName: 'HelpCenter',
  headerLayoutPreset: 'center',
  transitionConfig: (toTransitionProps, fromTransitionProps) => {
    // let isBack = false
    let backRoute = null
    if (fromTransitionProps) {
      // isBack = fromTransitionProps.navigation.state.index >= toTransitionProps.navigation.state.index
      backRoute = fromTransitionProps.scene.route.routeName
    }
    const route = toTransitionProps.scene.route
    if (route.routeName === 'RideCancel' || backRoute === 'RideCancel') {
      return {screenInterpolator: CardStackStyleInterpolator.forVertical}
    } else return {screenInterpolator: CardStackStyleInterpolator.forHorizontal}
  }
})
