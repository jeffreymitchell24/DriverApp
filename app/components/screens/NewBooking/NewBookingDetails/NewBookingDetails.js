import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native'
import moment from 'moment'
import Spinner from 'react-native-loading-spinner-overlay'
// import Switch from 'react-native-switch-pro'
import PropTypes from 'prop-types'
import { NavButton, Button } from 'components/ui'
import { BookingDetail, CarImage, SectionTitle } from 'components/blocks'
import {Home, BookingConfirmed, BookingCalendar} from 'navigation/routeNames'
import {getMaxDate, tempDates} from 'helpers/date'

import styles from './styles'
import { colors } from 'theme'

const BOOKED = {
  '2018-10-14': ['16:00', '17:00'],
  '2018-10-15': false,
  '2018-10-16': false,
  '2018-10-17': ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  '2018-10-18': ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '19:00', '20:00']
}
class TimeSlot extends PureComponent {
  onPress = () => {
    this.props.onPress(this.props.time)
  }
  render () {
    const {time, slotType} = this.props
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
      <TouchableOpacity style={[styles.timeSlot, {backgroundColor}]} onPress={this.onPress}>
        <Text style={[styles.timeSlotText, {color: textColor}]}>{time.label}</Text>
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
  constructor (props) {
    super(props)
    // let timeSlots = getNext24hours()
    const {startTime, endTime} = tempDates()
    // console.log(timeSlots)
    this.state = {
      startDate: null, // : {value: null, label: '09:00 AM'},
      endDate: null, // : {value: null, label: '5:00 PM'},
      enableScrollViewScroll: true
    }
  }
  static navigationOptions = ({ navigation }) => {
    // return {
    //   headerLeft: <NavButton icon='cancel' imageStyle={{height: 12, width: 12}} onPress={() => navigation.navigate(Home)} />
    // }
  }

  componentWillUnmount () {
    this.props.onUnselectCar()
  }

  componentDidUpdate (prevProps) {
    let {bookingError, bookingPending} = this.props
    if (!bookingError && !bookingPending && prevProps.bookingPending) {
      return this.props.navigation.navigate(BookingConfirmed)
    }
  }

  onStartDatePress = () => {
    this.setState({endDate: null})
    this.props.navigation.navigate(BookingCalendar, {bookDateType: 'start', bookedHours: BOOKED})
  }
  onEndDatePress = () => {
    if (!this.props.startDate) Alert.alert('', 'Select start date first')
    else {
      let maxDate = getMaxDate(this.props.startDate, BOOKED)
      console.log('maxDate', maxDate)
      // Alert.alert('', maxDate)
      this.props.navigation.navigate(BookingCalendar, {
        bookDateType: 'end',
        bookedHours: BOOKED,
        maxDate,
        minDate: this.props.startDate.dateString,
        startHour: moment.unix(this.props.startDate.timestamp).hour()
      })
    }
  }

  onConfirmPress = () => {
    const {car: {car}} = this.props
    const {startDate, endDate} = this.props
    let timeStamps = {
      'booking_ending_at': moment.unix(endDate.timestamp).format('YYYY-MM-DD HH:mm'),
      'booking_starting_at': moment.unix(startDate.timestamp).format('YYYY-MM-DD HH:mm')
    }
    this.props.onBookCar({id: car.id, timeStamps})
  }

  enableContainerScroll = () => {
    this.setState({ enableScrollViewScroll: true })
  }

  enableTimeslotsScroll = () => {
    this.setState({ enableScrollViewScroll: false })
    if (this._myScroll.contentOffset === 0 && this.state.enableScrollViewScroll === false) {
      this.setState({ enableScrollViewScroll: true })
    }
  }

  keyExtractor = (item, index) => index.toString()

  render () {
    const {isFetchingCar} = this.props
    if (isFetchingCar) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={colors.red} size='large' />
        </View>
      )
    }
    const {car: {car}} = this.props
    const {
      image_s3_url: image,
      pickup_location: pickupLocation,
      return_location: returnLocation,
      manufacturer = '',
      model = '',
      color = ''
    } = car
    const {startDate, endDate} = this.props
    let isButtonActive = startDate && endDate
    return (
      <View
        onStartShouldSetResponderCapture={this.enableContainerScroll}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          // nestedScrollEnabled
          ref={myScroll => (this._myScroll = myScroll)}
          scrollEnabled={this.state.enableScrollViewScroll}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <CarImage imageUri={image} />
            <View style={styles.bookingDetailsList}>
              <View style={[styles.row, {marginBottom: 16}]}>
                <View style={{flex: 1}}>
                  <View style={{marginBottom: 16}}>
                    <BookingDetail
                      label='Car Maker'
                      text={manufacturer}
                    />
                  </View>
                  <BookingDetail
                    label='Color'
                    text={color}
                  />
                </View>
                <View style={{flex: 1}}>
                  <View style={{marginBottom: 16}}>
                    <BookingDetail
                      label='Year'
                      text=''
                    />
                  </View>
                  <BookingDetail
                    label='Model'
                    text={model}
                  />
                </View>
              </View>
              <View style={{marginBottom: 16}}>
                <BookingDetail
                  label='Pickup location'
                  text={pickupLocation}
                />
              </View>
              <View style={{marginBottom: 16}}>
                <BookingDetail
                  label='Return location'
                  text={returnLocation}
                />
              </View>
            </View>
            <View style={styles.scheduleContainer}>
              <SectionTitle title='SCHEDULE' />
              <View style={[styles.row, {marginVertical: 16}]}>
                <TouchableOpacity style={{flex: 1}} onPress={this.onStartDatePress}>
                  <BookingDetail
                    label='Start Date'
                    text={(startDate && moment.unix(startDate.timestamp).format('ddd MM/D hh:mm A')) || '--:--'}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}} onPress={this.onEndDatePress}>
                  <BookingDetail
                    label='End Date'
                    text={(endDate && moment.unix(endDate.timestamp).format('ddd MM/D hh:mm A')) || '--:--'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Button
              containerStyle={styles.button}
              disabled={!isButtonActive}
              title='CONFIRM'
              onPress={this.onConfirmPress}
            />
          </View>
        </ScrollView>
        <Spinner color={colors.red} visible={this.props.bookingPending} />
      </View>
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
