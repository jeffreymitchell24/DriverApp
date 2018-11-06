import React, { PureComponent } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { Home, NewBookingDetails } from 'navigation/routeNames'
import { NavFilterImg } from 'components/ui'
import { BookingCard } from 'components/blocks'
import moment from 'moment'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { colors } from 'theme'
import styles from './styles'

class AvailableBookings extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <NavFilterImg
          onPress={() => {
            navigation.navigate(Home)
          }}
        />
      )
    }
  }

  componentDidMount() {
    this.props.onFetchAvailableCars()
  }

  onBookingPress = car => {
    this.props.onSelectCar(car.id)
    this.props.navigation.navigate(NewBookingDetails)
  }

  keyExtractor = (item, index) => item.car.id.toString()

  renderItem = ({ item, index }) => {
    const { availability, car } = item

    const bookingEnd = moment(car['booking_available_to'], 'HH:mm:ss')
    const bookingStart = moment(car['booking_available_from'], 'HH:mm:ss')

    return (
      <BookingCard
        booking={car}
        bookingEnd={bookingEnd.format()}
        bookingStart={bookingStart.format()}
        extraDetail={`Available ${availability}`}
        isRecurring={!!car['allowed_recurring']}
        onPress={this.onBookingPress}
      />
    )
  }
  render() {
    const { isFetchingPending, cars } = this.props

    if (isFetchingPending) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={colors.red} size="large" />
        </View>
      )
    }

    const ordered = _.orderBy(cars, 'availability', ['asc'])

    return (
      <View style={styles.container}>
        <FlatList
          data={ordered}
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
  // fetchError: PropTypes.string,
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
