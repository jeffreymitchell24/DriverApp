import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { NavButton } from 'components/ui'
import {Home} from 'navigation/routeNames'

class BookingDetails extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavButton icon='cancel' imageStyle={{height: 12, width: 12}} onPress={() => navigation.navigate(Home)} />
    }
  };
  render () {
    return (
      <View>
        <Text> BookingConfirmed </Text>
      </View>
    )
  }
}
BookingDetails.propTypes = {
  navigation: PropTypes.object 
}

export default BookingDetails
