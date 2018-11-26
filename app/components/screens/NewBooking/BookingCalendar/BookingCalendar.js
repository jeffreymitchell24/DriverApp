import React, { Component, PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { Calendar } from 'react-native-calendars'
import { NewBookingDetails } from 'navigation/routeNames'
import { NavButton, Button } from 'components/ui'
import { colors } from 'theme'
import styles, { pickerHeight } from './styles'
import _ from 'lodash'

class PickerItem extends PureComponent {
  onPress = () => {
    const { onPress } = this.props

    if (onPress) {
      onPress(this.props.time)
    }
  }

  render() {
    console.log(this.props)
    const { time, slotType } = this.props
    let backgroundColor = colors.gray50
    let textColor = colors.gray300
    let Wrapper = TouchableOpacity
    if (slotType === 'selected') {
      backgroundColor = colors.red
      textColor = colors.white
    } else if (slotType === 'disabled') {
      backgroundColor = colors.gray75
      textColor = colors.gray50
      Wrapper = View
    }
    return (
      <Wrapper
        style={[styles.pickerItem, { backgroundColor }]}
        onPress={this.onPress}
      >
        <Text style={[styles.pickerItemText, { color: textColor }]}>
          {time}
        </Text>
      </Wrapper>
    )
  }
}

PickerItem.propTypes = {
  slotType: PropTypes.string,
  time: PropTypes.string,
  onPress: PropTypes.func
}

const Arrow = ({ direction }) => {
  if (direction === 'left')
    return <Icon color={colors.red} name="ios-arrow-back" size={22} />
  return <Icon color={colors.red} name="ios-arrow-forward" size={22} />
}

Arrow.propTypes = {
  direction: PropTypes.string
}

class BookingCalendar extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <NavButton
          icon="cancel"
          imageStyle={{ height: 12, width: 12 }}
          onPress={() => navigation.goBack()}
        />
      )
    }
  }

  disableRestHours = false
  isHiddenPicker = true

  constructor(props) {
    super(props)
    let { params = {} } = this.props.navigation.state
    let {
      bookDateType = 'start',
      maxDate = null,
      minDate = moment()
        .tz('America/New_York')
        .format('YYYY-MM-DD')
    } = params

    this.bookDateType = bookDateType
    let hourList = []
    this.minDate = minDate

    this.state = {
      maxDate,
      bounceValue: new Animated.Value(pickerHeight),
      hourList,
      selectedDate: null,
      selectedTime: -1
    }
  }

  onConfirmPress = () => {
    let bookDateType = this.props.navigation.getParam('bookDateType', 'start')
    const { selectedDate, selectedTime: selectedTimeID, hourList } = this.state
    const selectedTime = hourList[selectedTimeID].time

    const dateString = `${selectedDate.dateString} ${selectedTime}`

    console.log(dateString)

    // let fullDate = { ...selectedDate }
    let date = moment(
      `${selectedDate.dateString} ${selectedTime}`,
      'YYYY-MM-DD hh:mm A'
    ).format()

    // fullDate.timestamp = date.toDate()
    // console.log('fullDate', fullDate)
    // console.log(moment(selectedDate.dateString, 'YYYY-MM-DD').set('hour', +hour).utcOffset('-04:00', true).hour())
    this.props.onSetBookingDate({ type: bookDateType, date })
    this.props.navigation.navigate(NewBookingDetails, {
      bookDateType,
      selectedDate,
      selectedTime
    })
  }

  _toggleTimePicker = () => {
    var toValue = pickerHeight

    if (this.isHiddenPicker) {
      toValue = 0
    }

    // This will animate the transalteY of the subview between 0 & 100 depending on its current state
    // 100 comes from the style below, which is the height of the subview.
    Animated.spring(this.state.bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8
    }).start()

    this.isHiddenPicker = !this.isHiddenPicker
  }

  onDateSelect = selectedDate => {
    const {
      selectedCar: { calendar }
    } = this.props

    console.log('selectedDate', selectedDate)

    const selectedDayHours = calendar[selectedDate.dateString]
    console.log(this.state.hourList, selectedDayHours)

    let availableHours = []

    const startHour = parseInt(moment(this.minDate).format('H'), 10)
    console.log(startHour)
    for (let i = 0, j = 0; i < 24; i++) {
      let newItem = {
        key: i,
        slotType: 'disabled',
        time: moment(i, 'H').format('hh:mm A')
      }

      if (j < selectedDayHours.length) {
        console.log('j < selectedDayHours.length', j, i)
        if (this.bookDateType === 'end') {
          if (selectedDayHours[j] === i) {
            console.log('selectedDayHours[j] === i', i, j)
            if (i > startHour) {
              console.log('i > startHour', j)
              console.log(
                'selectedDayHours[j] - selectedDate[j - 1] ',
                selectedDayHours[j] - (selectedDayHours[j - 1] || 25)
              )
              if (selectedDayHours[j] - (selectedDayHours[j - 1] || 25) === 1) {
                console.log('fffff')
                newItem.slotType = 'default'
                newItem.onPress = () => this.onTimeSelect(i)

                j++
              }
            } else j++
          }
        } else {
          if (selectedDayHours[j] === i) {
            newItem.slotType = 'default'
            newItem.onPress = () => this.onTimeSelect(i)

            j++
          }
        }
      }

      availableHours.push(newItem)
    }

    console.log('availableHours', availableHours)

    this.setState({ selectedDate, selectedTime: -1, hourList: availableHours })
    this.isHiddenPicker && this._toggleTimePicker()
  }

  onTimeSelect = index => {
    this.setState({ selectedTime: index })
  }

  render() {
    const {
      selectedCar: { calendar }
    } = this.props

    this.disableRestHours = false

    const { selectedDate, selectedTime, hourList } = this.state
    let isButtonActive = selectedDate && selectedTime > -1
    let markedDates = { ...Object.keys(calendar) }

    let startDate = _.first(Object.keys(calendar))
    let endDate = _.last(Object.keys(calendar))

    if (this.bookDateType === 'end') {
      startDate = moment(this.minDate).format('Y-M-D')
      const tomorrow = moment(this.minDate)
        .add({ days: 1 })
        .format('Y-M-D')

      if (
        _.last(calendar[selectedDate] || []) === 23 &&
        _.first(calendar[tomorrow] || []) === 0
      ) {
        endDate = tomorrow
      } else {
        endDate = moment(this.minDate).format('Y-M-D')
      }
    }

    if (selectedDate)
      markedDates[selectedDate.dateString] = {
        color: colors.red,
        selected: true,
        selectedColor: colors.red
      }

    console.log(this.state)

    return (
      <View style={styles.container}>
        <Calendar
          contentContainerStyle={styles.calendar}
          current={startDate}
          markedDates={markedDates}
          // markingType={'period'}
          maxDate={endDate}
          minDate={startDate}
          // pastScrollRange={0}
          // futureScrollRange={50}
          renderArrow={direction => <Arrow direction={direction} />}
          style={styles.calendar}
          theme={{
            textDayFontFamily: 'SFProText-Regular',
            textMonthFontFamily: 'SFProText-Regular',
            textDayHeaderFontFamily: 'SFProText-Regular',
            todayTextColor: colors.red
          }}
          onDayPress={this.onDateSelect}
        />
        <Animated.View
          style={[
            styles.timePickers,
            { transform: [{ translateY: this.state.bounceValue }] }
          ]}
        >
          <View style={styles.timePickerRow}>
            <View style={styles.timePickerContainer}>
              <Text style={styles.timePickerLabel}>
                {this.bookDateType === 'end' ? 'DROPOFF' : 'PICKUP'}
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.timePicker}
              >
                {(hourList || []).map((timeSlot, i) => {
                  return (
                    <PickerItem
                      {...timeSlot}
                      slotType={
                        i === selectedTime ? 'selected' : timeSlot.slotType
                      }
                    />
                  )
                })}
              </ScrollView>
            </View>
          </View>
          <Button
            containerStyle={styles.button}
            disabled={!isButtonActive}
            title="CONFIRM"
            onPress={this.onConfirmPress}
          />
        </Animated.View>
      </View>
    )
  }
}

BookingCalendar.propTypes = {
  navigation: PropTypes.object,
  selectedCar: PropTypes.object,
  onSetBookingDate: PropTypes.func
}

export default BookingCalendar
