import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import Upcoming from 'components/screens/Home/Upcoming'
import History from 'components/screens/Home/History'
import {Profile} from 'navigation/routeNames'
import {ProfileButton} from 'components/ui'
import { colors } from 'theme'

const HomeTabStack = createMaterialTopTabNavigator(
  {
    Upcoming: Upcoming,
    History: History
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: colors.red
      },
      activeTintColor: colors.red,
      inactiveTintColor: colors.gray200,
      style: {
        backgroundColor: colors.white,
        elevation: 0,
        borderBottomColor: colors.gray50,
        borderBottomWidth: 1
      },
      tabStyle: {},
      labelStyle: {
        fontSize: 13,
        fontFamily: 'SFProText-Medium'
      }
    }
  }
)
HomeTabStack.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: <ProfileButton onPress={() => navigation.navigate(Profile)} />
  }
}

export {HomeTabStack}
