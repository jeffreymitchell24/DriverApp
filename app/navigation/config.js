import { createStackNavigator } from 'react-navigation'
import { NavBackImage } from 'components/ui'
import React from 'react'

import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'

import BookingDetail from 'components/screens/Booking/BookingDetail'
import CarLocation from 'components/screens/Booking/CarLocation'
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
        title: 'Car Flow',
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
      return {screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    }
  }
)
