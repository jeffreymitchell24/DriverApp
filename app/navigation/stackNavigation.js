import { createStackNavigator } from 'react-navigation'
// // import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'

import BookingConfirmed from 'components/screens/NewBooking/BookingConfirmed'
import BookingDetails from 'components/screens/NewBooking/BookingDetails'
import AvailableBookings from 'components/screens/NewBooking/AvailableBookings'

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
