import React, { PureComponent } from 'react'
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from 'react-native'
import { NewBookingDetails } from 'navigation/routeNames'
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
            navigation.goBack()
          }}
        />
      )
    }
  }

  componentDidMount() {
    // this.props.onFetchAvailableCars()
  }

  onBookingPress = car => {
    const { filters, onSelectCar, navigation } = this.props

    const now = moment().tz('America/New_York')
    const startDate =
      now.minute() || now.second() || now.millisecond()
        ? now.add(1, 'hour').startOf('hour')
        : now.startOf('hour')

    const endDateMonth = startDate.clone().add(1, 'M')
    const endDate = moment(endDateMonth).endOf('month')

    const body = {
      calendar_date_to: moment(endDate)
        // .unix(endDate)
        .tz('America/New_York')
        .subtract(1, 'hours')
        .minutes(59)
        .format('YYYY-MM-DD HH:mm'),
      calendar_date_from: startDate
        // .unix(startDate)
        .tz('America/New_York')
        .format('YYYY-MM-DD HH:mm')
    }

    console.log(body)

    onSelectCar({ id: car.id, body })
    navigation.navigate(NewBookingDetails)
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
        // extraDetail={`Available ${availability}`}
        isRecurring={!!car['allowed_recurring']}
        onPress={this.onBookingPress}
      />
    )
  }

  renderEmptyList = () => {
    const { navigation } = this.props

    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>No results found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.emptyListText, { color: colors.red }]}>OK</Text>
        </TouchableOpacity>
      </View>
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
        {ordered.length ? (
          <FlatList
            data={ordered}
            extraData={cars}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
          />
        ) : (
          this.renderEmptyList()
        )}
      </View>
    )
  }
}
AvailableBookings.propTypes = {
  cars: PropTypes.array,
  // fetchError: PropTypes.string,
  filters: PropTypes.object,
  isFetchingPending: PropTypes.bool,
  navigation: PropTypes.object,
  // onFetchAvailableCars: PropTypes.func,
  onSelectCar: PropTypes.func
}

AvailableBookings.defaultProps = {
  cars: [],
  isFetchingPending: false
}

export default AvailableBookings
