import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import All from 'components/screens/Home/All'
import OneTime from 'components/screens/Home/OneTime'
import Recurring from 'components/screens/Home/Recurring'
import { Profile, History as HistoryRoute } from 'navigation/routeNames'
import { ProfileButton, HistoryButton } from 'components/ui'
import { colors } from 'theme'

const HomeTabStack = createMaterialTopTabNavigator(
  {
    All,
    'One-Time': OneTime,
    Recurring
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
    headerLeft: (
      <ProfileButton
        onPress={() => navigation.navigate(Profile, {
          backKey: HomeTabStack
        })}
      />
    ),
    headerRight: (
      <HistoryButton
        onPress={() => navigation.navigate(HistoryRoute, {
          backKey: HomeTabStack
        })}
      />
    )
  }
}

export {HomeTabStack}
