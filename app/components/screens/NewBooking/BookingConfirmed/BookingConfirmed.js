import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

class BookingConfirmed extends PureComponent {
  render () {
    return (
      <View>
        <Text> BookingConfirmed </Text>
      </View>
    )
  }
}
BookingConfirmed.propTypes = {
  navigation: PropTypes.object 
}

export default BookingConfirmed
