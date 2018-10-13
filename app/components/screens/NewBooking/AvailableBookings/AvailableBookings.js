import React, { PureComponent } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { NavButton } from 'components/ui'
import {Home, NewBookingDetails} from 'navigation/routeNames'
import { BookingCard } from 'components/blocks'
import PropTypes from 'prop-types'
import { colors } from 'theme'
import styles from './styles'

class AvailableBookings extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavButton icon='cancel' imageStyle={{height: 12, width: 12}} onPress={() => navigation.navigate(Home)} />
      // headerRight: <NavButton icon='filter' imageStyle={{height: 15, width: 15}} />
    }
  }

  componentDidMount () {
    this.props.onFetchAvailableCars()
  }

  onBookingPress = (car) => {
    this.props.onSelectCar(car.car.id)
    this.props.navigation.navigate(NewBookingDetails)
  }

  keyExtractor = (item, index) => item.car.id.toString()

  renderItem = ({item, index}) => {
    const {availability} = item
    return (
      <BookingCard
        booking={item}
        extraDetail={`Available ${availability}`}
        onPress={this.onBookingPress}
      />
    )
  }
  render () {
    const {isFetchingPending, cars} = this.props
    if (isFetchingPending) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={colors.red} size='large' />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={cars}
          extraData={cars}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}
AvailableBookings.propTypes = {
  cars: PropTypes.array,
  fetchError: PropTypes.string,
  isFetchingPending: PropTypes.bool,
  navigation: PropTypes.object,
  onFetchAvailableCars: PropTypes.func,
  onSelectCar: PropTypes.func
}

AvailableBookings.defaultProps = {
  isFetchingPending: false,
  cars: []
}

export default AvailableBookings
