import { createStackNavigator } from 'react-navigation'
import React from 'react'
import { NavBackImage } from 'components/ui'
import BookingConfirmed from 'components/screens/NewBooking/BookingConfirmed'
import BookingDetails from 'components/screens/NewBooking/BookingDetails'
import AvailableBookings from 'components/screens/NewBooking/AvailableBookings'

import ChangePassword from 'components/screens/Profile/ChangePassword'
import ChangesReview from 'components/screens/Profile/ChangesReview'
import ProfileCamera from 'components/screens/Profile/ProfileCamera'
import ProfileDetails from 'components/screens/Profile/ProfileDetails'
import ProfileMain from 'components/screens/Profile/ProfileMain'

export const NewBookingStack = createStackNavigator({
  BookingConfirmed: {
    screen: BookingConfirmed,
    navigationOptions: {
      title: null,
      headerTitle: null,
      headerBackTitle: null
    }
  },
  BookingDetails: {
    screen: BookingDetails,
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
      title: 'Your Photo',
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
      ...navigationOptions
    }
  }
},
{
  initialRouteName: 'ProfileMain',
  headerLayoutPreset: 'center'
})
