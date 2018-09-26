import React, { PureComponent } from 'react'
import { View, Text, FlatList } from 'react-native'
import { NavButton } from 'components/ui'
import {Home, NewBookingDetails} from 'navigation/routeNames'
import { BookingCard } from 'components/blocks'
import PropTypes from 'prop-types'
import styles from './styles'
import {BOOKINGS} from 'constants/bookings'

class AvailableBookings extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavButton icon='cancel' imageStyle={{height: 12, width: 12}} onPress={() => navigation.navigate(Home)} />,
      headerRight: <NavButton icon='filter' imageStyle={{height: 15, width: 15}} />
    }
  }

  onBookingPress = () => {
    this.props.navigation.navigate(NewBookingDetails)
  }

  keyExtractor = (item, index) => item.id

  renderItem = ({item, index}) => {
    return (
      <BookingCard
        booking={item}
        onPress={this.onBookingPress}
      />
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={BOOKINGS}
          extraData={BOOKINGS}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}
AvailableBookings.propTypes = {
  navigation: PropTypes.object
}

export default AvailableBookings
