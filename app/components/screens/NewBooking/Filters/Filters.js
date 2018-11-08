import React, { PureComponent } from 'react'
import { Switch } from 'react-native-switch'
import PropTypes from 'prop-types'
import { NavButton, Button } from 'components/ui'
import { Home, PickupLocation, AvailableBookings } from 'navigation/routeNames'
import { Slider } from 'react-native-elements'
import { View, Text, Image, TextInput } from 'react-native'

import moment from 'moment'

import { icons } from 'images'
import DatePicker from '../../../blocks/DatePicker'
import { styles } from './styles'

const RANGES = {
  0: {
    value: 0.5,
    title: '1/2 mile'
  },
  1: {
    value: 1,
    title: '1 mile'
  },
  2: {
    value: 2,
    title: '2 miles'
  },
  3: {
    value: 5,
    title: '5 miles'
  },
  4: {
    value: 10,
    title: '10 miles'
  },
  5: {
    value: 100,
    title: '10+ miles'
  }
}

class Filters extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <NavButton
          icon="arrowLeft"
          imageStyle={{
            width: 16,
            height: 14
          }}
          onPress={() => navigation.navigate(Home)}
        />
      )
    }
  }

  state = {
    address: '',
    addressSelected: false,
    showAddressResults: false
  }

  onConfirmPress = () => {
    const {
      filters: { startDate, endDate, isRecurring, location, range },
      onFetchAvailableCars,
      navigation
    } = this.props

    const req = {
      available_to: moment(endDate)
        // .unix(endDate)
        // .tz('America/New_York')
        .subtract(1, 'hours')
        .minutes(59)
        .format('YYYY-MM-DD HH:mm'),
      available_from: moment(startDate)
        // .unix(startDate)
        // .tz('America/New_York')
        .format('YYYY-MM-DD HH:mm'),
      categories: [1]
    }

    if (location.lat && location.lon) {
      req.pickup_location_lat = location.lat
      req.pickup_location_lon = location.lon
      req.allowed_range_miles = RANGES[range].value
    }

    if (isRecurring) {
      req.allowed_recurring = isRecurring
    }

    onFetchAvailableCars(req)

    navigation.navigate(AvailableBookings)
  }

  handleDateChange = (nextDate, type) => {
    const { onFilterUpdate } = this.props
    const nextState = {}

    if (type === 'Start') {
      onFilterUpdate('startDate', nextDate)
      onFilterUpdate(
        'endDate',
        moment(nextDate)
          .add({ hours: 12 })
          .format()
      )
    } else {
      onFilterUpdate('endDate', nextDate)
    }

    this.setState(nextState)
  }

  handleToogleRecurringSwitch = () => {
    const { filters, onFilterUpdate } = this.props

    onFilterUpdate('isRecurring', !filters.isRecurring)
  }

  render() {
    const {
      filters: { startDate, endDate, isRecurring, location, range },
      onFilterUpdate
    } = this.props

    return (
      <View style={styles.container}>
        <DatePicker
          formatter="dddd, DD MMM hh:mmA"
          // startDate={new Date()}
          style={{ marginTop: 20 }}
          type="Start"
          value={startDate}
          onChange={this.handleDateChange}
        />
        <DatePicker
          formatter="dddd, DD MMM hh:mmA"
          // startDate={moment(startDate)
          // .add({ hours: 1 })
          // .toDate()}
          type="End"
          value={endDate}
          onChange={this.handleDateChange}
        />
        <View style={styles.filterRow}>
          <TextInput
            placeholder="Pickup location"
            style={{ width: '100%', fontSize: 18, fontFamily: 'Helvetica' }}
            value={location.address || ''}
            onFocus={() => this.props.navigation.navigate(PickupLocation)}
          />
        </View>
        <View style={[styles.filterRow, { flexDirection: 'column' }]}>
          <View style={styles.filterRow}>
            <Text
              style={[styles.fieldName, { borderBottomWidth: 0, padding: 0 }]}
            >
              Range from location
            </Text>
            <Text style={styles.fieldValue}>{RANGES[range].title}</Text>
          </View>
          <Slider
            maximumTrackTintColor="#A4AAB3"
            maximumValue={5}
            minimumTrackTintColor="#F03E3E"
            minimumValue={0}
            step={1}
            style={{ width: '100%' }}
            thumbStyle={{
              backgroundColor: '#fff',
              height: 28,
              width: 28,
              borderRadius: 100,
              shadowOffset: { width: 3, height: 3 },
              shadowColor: 'black',
              shadowOpacity: 0.5
            }}
            thumbTintColor="#000"
            trackStyle={{
              height: 2
            }}
            value={range}
            onValueChange={value => onFilterUpdate('range', value)}
          />
        </View>
        <View style={styles.filterRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={icons.recurring}
              style={styles.recurringImageContainer}
            />
            <Text
              numberOfLines={2}
              style={[styles.fieldName, { width: '70%', marginLeft: 10 }]}
            >
              Show only cars avaliable for recurring bookin
            </Text>
          </View>
          <View>
            <Switch
              backgroundActive="#F03E3E"
              backgroundInactive={'#DEE2E6'}
              barHeight={30}
              circleBorderWidth={2}
              circleSize={27}
              innerCircleStyle={{
                borderColor: isRecurring ? '#F03E3E' : '#DEE2E6'
              }}
              switchWidthMultiplier={2}
              value={isRecurring}
              onValueChange={this.handleToogleRecurringSwitch}
            />
          </View>
        </View>
        <Button
          containerStyle={styles.button}
          // disabled={}
          title="SHOW AVAILABLE CARS"
          onPress={this.onConfirmPress}
        />
      </View>
    )
  }
}

Filters.propTypes = {
  filters: PropTypes.object,
  navigation: PropTypes.object,
  onFetchAvailableCars: PropTypes.func,
  onFilterUpdate: PropTypes.func
}

export default Filters
