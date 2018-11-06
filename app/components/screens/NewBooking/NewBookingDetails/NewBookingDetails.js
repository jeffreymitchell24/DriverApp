import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native'
import { Switch } from 'react-native-switch'
import moment from 'moment'
import Spinner from 'react-native-loading-spinner-overlay'
// import Switch from 'react-native-switch-pro'
import PropTypes from 'prop-types'
import { Button } from 'components/ui'
import {
  BookingDetail,
  CarImage,
  SectionTitle,
  DatePicker
} from 'components/blocks'
import {
  BookingConfirmed,
  BookingCalendar,
  CarLocation
} from 'navigation/routeNames'
import { getMaxDate } from 'helpers/date'

import { icons } from 'images'

import styles from './styles'
import { colors } from 'theme'

class TimeSlot extends PureComponent {
  onPress = () => {
    this.props.onPress(this.props.time)
  }
  render() {
    const { time, slotType } = this.props
    let backgroundColor = colors.gray50
    let textColor = colors.gray300
    if (slotType === 'border') {
      backgroundColor = colors.red
      textColor = colors.white
    } else if (slotType === 'middle') {
      backgroundColor = colors.pink
      textColor = colors.white
    }
    return (
      <TouchableOpacity
        style={[styles.timeSlot, { backgroundColor }]}
        onPress={this.onPress}
      >
        <Text style={[styles.timeSlotText, { color: textColor }]}>
          {time.label}
        </Text>
      </TouchableOpacity>
    )
  }
}

TimeSlot.propTypes = {
  slotType: PropTypes.string,
  time: PropTypes.object,
  onPress: PropTypes.func
}

class NewBookingDetails extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    console.log('!!!!!', navigation)
    return {
      title: navigation.getParam('carName', 'New booking')
    }
  }

  constructor(props) {
    super(props)
    // let timeSlots = getNext24hours()
    // console.log(timeSlots)
    this.state = {
      startDate: null,
      endDate: null,
      isRecurring: false
    }
  }

  componentWillUnmount() {
    this.props.onUnselectCar()
  }

  componentDidMount() {
    const { car: carData } = this.props
    console.log('carData', carData)
    if (carData && carData.car) {
      const { car } = carData
      console.log('car', car)
      this.props.navigation.setParams({
        carName: `${car.manufacturer.name} ${car.model}`
      })
    }

    const now = moment()
    const start =
      now.minute() || now.second() || now.millisecond()
        ? now.add(1, 'hour').startOf('hour')
        : now.startOf('hour')

    this.setState({
      startDate: start.format(),
      endDate: start.add({ hours: 12 }).format()
    })
  }

  componentDidUpdate(prevProps) {
    let { bookingError, bookingPending } = this.props
    if (!bookingPending && prevProps.bookingPending) {
      if (!bookingError) {
        const { manufacturer, model } = this.props.car.car
        let bookingData = {
          car: `${manufacturer.name} ${model}`,
          startDate: moment
            .unix(this.props.startDate.timestamp)
            .tz('America/New_York')
            .format('MMMM DD, hh:mm A'),
          endDate: moment
            .unix(this.props.endDate.timestamp)
            .tz('America/New_York')
            .format('MMMM DD, hh:mm A')
        }
        return this.props.navigation.navigate(BookingConfirmed, { bookingData })
      } else {
        Alert.alert('', bookingError)
      }
    }
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.isFetchingCar && !nextProps.isFetchingCar) {
      let { car: carData, navigation } = nextProps

      if (carData && carData.car) {
        const { car } = carData

        navigation.setParams({
          carName: `${car.manufacturer.name} ${car.model}`
        })
      }
    }
  }

  handleToogleRecurringSwitch = () => {
    this.setState({
      isRecurring: !this.state.isRecurring
    })
  }

  handleDateChange = (nextDate, type) => {
    const updateField = type === 'Start' ? 'startDate' : 'endDate'

    this.setState({
      [updateField]: nextDate
    })
  }

  onStartDatePress = () => {
    this.setState({ endDate: null })
    this.props.navigation.navigate(BookingCalendar, {
      bookDateType: 'start',
      bookedHours: this.props.car.booked
    })
  }
  onEndDatePress = () => {
    if (!this.props.startDate) Alert.alert('', 'Select start date first')
    else {
      let maxDate = getMaxDate(this.props.startDate, this.props.car.booked)
      console.log('maxDate', maxDate)
      // Alert.alert('', maxDate)
      this.props.navigation.navigate(BookingCalendar, {
        bookDateType: 'end',
        bookedHours: this.props.car.booked,
        maxDate,
        minDate: this.props.startDate.dateString,
        startHour: moment
          .unix(this.props.startDate.timestamp)
          .tz('America/New_York')
          .hour()
      })
    }
  }

  onConfirmPress = () => {
    const {
      car: { car }
    } = this.props
    const { startDate, endDate } = this.props
    const { isRecurring } = this.state
    console.log(startDate, endDate)
    let timeStamps = {
      booking_ending_at: moment
        .unix(endDate.timestamp)
        .tz('America/New_York')
        .subtract(1, 'hours')
        .minutes(59)
        .format('YYYY-MM-DD HH:mm'),
      booking_starting_at: moment
        .unix(startDate.timestamp)
        .tz('America/New_York')
        .format('YYYY-MM-DD HH:mm'),
      is_recurring: isRecurring
    }
    this.props.onBookCar({
      id: car.id,
      timeStamps
    })
  }

  keyExtractor = (item, index) => index.toString()

  onMapPress = locationType => {
    let geo = {}

    const {
      pickup_location_lat: pickupLat,
      pickup_location_lon: pickupLon,
      return_location_lat: returnLat,
      return_location_lon: returnLon
    } = this.props.car.car

    geo.lat = locationType === 'pickup' ? pickupLat : returnLat
    geo.lon = locationType === 'pickup' ? pickupLon : returnLon

    console.log('onMapPress', this.props.car, geo)

    this.props.navigation.navigate(CarLocation, { geo })
  }

  renderRecurringBlock = () => {
    const { startDate, endDate, isRecurring } = this.state

    return (
      <View styles={{ ...styles.timeContainer, ...styles.recurringContainer }}>
        <View style={styles.reccuringBanner}>
          <Image
            source={icons.recurring}
            style={styles.recurringImageContainer}
          />
          <Text style={styles.recurringBannerText}>
            Available for recurring bookings
          </Text>
        </View>
        <View style={styles.createRecurringBlockContainer}>
          <View style={styles.recurringLeftBlock}>
            <Text style={styles.recurringText}>Create recurring booking</Text>
            <Text style={styles.recurringDescription}>
              Book this car automatically on every{' '}
              {moment(startDate).format('dddd [from] hhA')} to{' '}
              {moment(endDate).format('hhA')}
            </Text>
          </View>
          <View style={styles.recurringRightBlock}>
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
      </View>
    )
  }

  render() {
    const { isRecurring } = this.state
    const { isFetchingCar, navigation } = this.props
    if (isFetchingCar) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={colors.red} size="large" />
        </View>
      )
    }

    if (!this.props.car) return navigation.goBack()

    const {
      car: { car }
    } = this.props
    const {
      image_s3_url: image,
      full_pickup_location: pickupLocation,
      full_return_location: returnLocation,
      plate,
      manufacturer = {},
      model = '',
      color = '',
      year = ''
    } = car
    const { startDate, endDate } = this.props
    let isButtonActive = startDate && endDate
    return (
      <React.Fragment>
        <ScrollView
          contentContainerStyle={styles.container}
          // nestedScrollEnabled
          ref={myScroll => (this._myScroll = myScroll)}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <CarImage imageUri={image} />
            <View style={styles.bookingDetailsList}>
              <View style={[styles.row, { marginBottom: 16 }]}>
                <View style={{ flex: 1 }}>
                  <View style={{ marginBottom: 16 }}>
                    <BookingDetail
                      label="CAR"
                      text={`${manufacturer.name} ${model}, ${color}, ${year}`}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.row, { marginBottom: 16 }]}>
                <View style={{ flex: 1 }}>
                  <View style={{ width: '80%' }}>
                    <BookingDetail label="PICKUP" text={pickupLocation} />
                  </View>
                  <TouchableOpacity onPress={() => this.onMapPress('pickup')}>
                    <Text style={styles.mapButtonText}>Open in Maps</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ width: '80%' }}>
                    <BookingDetail
                      label="RETURN"
                      text={`${returnLocation}, ${plate}`}
                    />
                  </View>
                  <TouchableOpacity onPress={() => this.onMapPress('return')}>
                    <Text style={styles.mapButtonText}>Open in Maps</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.scheduleContainer}>
              <SectionTitle title="SCHEDULE" />
              {!!car['allowed_recurring'] && this.renderRecurringBlock()}
              <DatePicker
                formatter={
                  isRecurring ? '[Every] dddd, hh:mmA' : 'dddd, DD MMM hh:mmA'
                }
                type="Start"
                value={this.state.startDate}
                onChange={this.handleDateChange}
              />
              <DatePicker
                formatter={isRecurring ? 'dddd, hh:mmA' : 'dddd, DD MMM hh:mmA'}
                type="End"
                value={this.state.endDate}
                onChange={this.handleDateChange}
              />
              <View style={[styles.row, { marginVertical: 16 }]}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={this.onStartDatePress}
                >
                  <BookingDetail
                    label="Start Date"
                    text={
                      (startDate &&
                        moment
                          .unix(startDate.timestamp)
                          .tz('America/New_York')
                          .format('ddd MM/D hh:mm A')) ||
                      '--:--'
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={this.onEndDatePress}
                >
                  <BookingDetail
                    label="End Date"
                    text={
                      (endDate &&
                        moment
                          .unix(endDate.timestamp)
                          .tz('America/New_York')
                          .format('ddd MM/D hh:mm A')) ||
                      '--:--'
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Button
            containerStyle={styles.button}
            disabled={!isButtonActive}
            title="CONFIRM"
            onPress={this.onConfirmPress}
          />
        </ScrollView>
        <Spinner color={colors.red} visible={this.props.bookingPending} />
      </React.Fragment>
    )
  }
}
NewBookingDetails.propTypes = {
  bookingError: PropTypes.string,
  bookingPending: PropTypes.bool,
  car: PropTypes.object,
  endDate: PropTypes.object,
  isFetchingCar: PropTypes.bool,
  navigation: PropTypes.object,
  startDate: PropTypes.object,
  onBookCar: PropTypes.func,
  onUnselectCar: PropTypes.func
}

export default NewBookingDetails
