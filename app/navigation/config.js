import { createStackNavigator } from 'react-navigation'
import { NavBackImage } from 'components/ui'
import React from 'react'

import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'

import History from 'components/screens/History'
import BookingDetail from 'components/screens/Booking/BookingDetail'
import CarLocation from 'components/screens/Booking/CarLocation'
import RideLicenseCamera from 'components/screens/Booking/LicenseCamera'
import RideLicensePreview from 'components/screens/Booking/LicensePreview'
import RideEnd from 'components/screens/Booking/RideEnd'
import RideFinished from 'components/screens/Booking/RideFinished'
import ReceiptSubmit from 'components/screens/ReceiptSubmit/ReceiptSubmit'
import ReceiptCamera from 'components/screens/ReceiptSubmit/ReceiptCamera'
import ReceiptGallery from 'components/screens/ReceiptSubmit/ReceiptGallery'
import ReceiptPreview from 'components/screens/ReceiptSubmit/ReceiptPreview'

import { NewBookingStack, ProfileStack, HelpCenterStack, AuthStack } from './stackNavigation'
import {HomeTabStack} from './tabNavigation'

let navigationOptions = {
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
  headerBackImage: (<NavBackImage />)
}

export const Root = createStackNavigator(
  {
    Auth: {
      screen: AuthStack,
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: HomeTabStack,
      navigationOptions: {
        title: 'Bookings',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions,
        headerLeftContainerStyle: {
          paddingLeft: 16
        }
      }
    },
    BookingDetail: {
      screen: BookingDetail,
      navigationOptions: {
        title: 'Regular Car',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions,
        headerLeftContainerStyle: {
          // paddingLeft: 16
        }
      }
    },
    History: {
      screen: History,
      navigationOptions: {
        title: 'Booking history',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions,
        headerLeftContainerStyle: {
          paddingLeft: 22
        }
      }
    },
    CarLocation: {
      screen: CarLocation,
      navigationOptions: {
        title: 'Car Location',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions,
        headerLeftContainerStyle: {
          // paddingLeft: 16
        }
      }
    },
    RideLicenseCamera: {
      screen: RideLicenseCamera,
      navigationOptions: {
        title: 'Take a photo of license plate',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    RideLicensePreview: {
      screen: RideLicensePreview,
      navigationOptions: {
        header: null
      }
    },
    RideEnd: {
      screen: RideEnd,
      navigationOptions: {
        title: 'End ride',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions,
        headerLeftContainerStyle: {
          // paddingLeft: 16
        }
      }
    },
    RideFinished: {
      screen: RideFinished,
      navigationOptions: {
        header: null
      }
    },
    ReceiptSubmit: {
      screen: ReceiptSubmit,
      navigationOptions: {
        title: 'Submit receipt',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions,
        headerLeftContainerStyle: {
          // paddingLeft: 16
        }
      }
    },
    ReceiptCamera: {
      screen: ReceiptCamera,
      navigationOptions: {
        title: 'Receipt photo',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    ReceiptGallery: {
      screen: ReceiptGallery,
      navigationOptions: {
        title: 'Select photo',
        headerTitle: null,
        headerBackTitle: null,
        ...navigationOptions
      }
    },
    ReceiptPreview: {
      screen: ReceiptPreview,
      navigationOptions: {
        header: null
      }
    },
    RideHelp: {
      screen: HelpCenterStack,
      navigationOptions: {
        header: null
      }
    },
    NewBooking: {
      screen: NewBookingStack,
      navigationOptions: {
        title: null,
        header: null,
        headerTitle: null,
        headerBackTitle: null
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Auth',
    headerLayoutPreset: 'center',
    transitionConfig: (toTransitionProps, fromTransitionProps) => {
      let isBack = false
      let backRoute = null
      if (fromTransitionProps) {
        isBack = fromTransitionProps.navigation.state.index >= toTransitionProps.navigation.state.index
        backRoute = fromTransitionProps.scene.route.routeName
      }
      const route = toTransitionProps.scene.route
      if (route.routeName === 'NewBooking' || (backRoute === 'NewBooking' && isBack)) {
        return {screenInterpolator: CardStackStyleInterpolator.forVertical}
      }
      return {screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    }
  }
)
