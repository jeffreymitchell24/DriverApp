import React, { Component, PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  ScrollView,
  StyleSheet,
  Platform
} from 'react-native'
import isEmpty from 'lodash/isEmpty'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { Calendar } from 'react-native-calendars'
import { NewBookingDetails } from 'navigation/routeNames'
import { NavButton, Button } from 'components/ui'
import { colors, metrics } from 'theme'
import _ from 'lodash'

class PickerItem extends PureComponent {
  onPress = () => {
    const { onPress } = this.props

    if (onPress) {
      onPress(this.props.time)
    }
  }

  render() {
    const { time, slotType } = this.props
    let backgroundColor = colors.gray50
    let textColor = colors.gray300
    let Wrapper = TouchableOpacity

    switch (slotType) {
      case 'selected':
        backgroundColor = colors.red
        textColor = colors.white
        break
      case 'disabled':
        backgroundColor = colors.gray75
        textColor = colors.gray50
        Wrapper = View
        break
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
  let iconName = 'ios-arrow-forward'

  if (direction === 'left') {
    iconName = 'ios-arrow-back'
  }

  return <Icon color={colors.red} name={iconName} size={22} />
}

Arrow.propTypes = {
  direction: PropTypes.string
}

class BookingCalendar extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <NavButton
          icon={'cancel'}
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

    if (bookDateType === 'end') {
      this.state = {
        maxDate,
        bounceValue: new Animated.Value(pickerHeight),
        hourList,
        selectedDate: { dateString: moment(minDate).format('YYYY-MM-DD') },
        selectedTime: moment(minDate).hour()
      }
    }
  }

  onConfirmPress = () => {
    let bookDateType = this.props.navigation.getParam('bookDateType', 'start')
    const { selectedDate, selectedTime: selectedTimeID, hourList } = this.state
    const selectedTime = hourList[selectedTimeID].time

    let date = moment(
      `${selectedDate.dateString} ${selectedTime}`,
      'YYYY-MM-DD hh:mm A'
    ).format()

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

  filterHours = (hourList, startHour) => {
    const filteredList = []

    for (let i = 0; i < hourList.length; i++) {
      if (hourList[i] > startHour) {
        const isBreak =
          hourList[i] - (_.isNumber(hourList[i - 1]) ? hourList[i - 1] : 25) !==
          1

        if (i > 0 && isBreak) {
          break
        }

        filteredList.push(hourList[i])
      }
    }

    return filteredList
  }

  isTommorowAvailable = (selectedDate, startDateHourList, selectedHour) => {
    const {
      selectedCar: { calendar }
    } = this.props

    for (let i = selectedHour + 1; i < 24; i++) {
      if (startDateHourList[i].slotType === 'disabled') {
        return false
      }
    }

    const nextDayHours =
      calendar[
        moment(selectedDate.dateString)
          .add({ days: 1 })
          .format('YYYY-MM-DD')
      ]

    return nextDayHours[0] === 0
  }

  onDateSelect = selectedDate => {
    const {
      selectedCar: { calendar }
    } = this.props
    const selectedDayHours = calendar[selectedDate.dateString]

    let availableHours = []
    let filteredHours
    const startHour = parseInt(moment(this.minDate).format('H'), 10)

    if (selectedDate.dateString === moment(this.minDate).format('YYYY-MM-DD')) {
      filteredHours = this.filterHours(selectedDayHours, startHour)
    } else {
      filteredHours = selectedDayHours
    }

    const endHour = filteredHours.length > 0 ? _.last(filteredHours) : startHour

    for (let i = 0, j = 0; i < 24; i++) {
      let newItem = {
        key: i,
        slotType: 'disabled',
        time: moment(i, 'H').format('hh:mm A')
      }

      if (this.bookDateType === 'end') {
        if (j < filteredHours.length + 1) {
          if (endHour + 1 === i) {
            newItem.slotType = 'default'
            newItem.onPress = () => this.onTimeSelect(i)
          }

          if (filteredHours[j] === i) {
            newItem.slotType = 'default'
            newItem.onPress = () => this.onTimeSelect(i)

            j++
          }
        }
      } else {
        if (j < selectedDayHours.length + 1 && selectedDayHours[j] === i) {
          newItem.slotType = 'default'
          newItem.onPress = () => this.onTimeSelect(i)

          j++
        }
      }

      availableHours.push(newItem)
    }

    if (!isEmpty(calendar[selectedDate.dateString])) {
      this.setState({
        selectedDate,
        selectedTime: -1,
        hourList: availableHours
      })

      if (this.isHiddenPicker) {
        this._toggleTimePicker()
      }
    }
  }

  prevDateHourList = selectedDate => {
    const {
      selectedCar: { calendar }
    } = this.props

    const selectedDayHours = calendar[selectedDate.dateString]
    let availableHours = []
    const startHour = parseInt(moment(this.minDate).format('H'), 10)

    const filteredHours = this.filterHours(selectedDayHours, startHour)

    const endHour = filteredHours.length > 0 ? _.last(filteredHours) : startHour

    for (let i = 0, j = 0; i < 24; i++) {
      let newItem = {
        key: i,
        slotType: 'disabled',
        time: moment(i, 'H').format('hh:mm A')
      }

      if (this.bookDateType === 'end') {
        if (j < filteredHours.length + 1) {
          if (endHour + 1 === i) {
            newItem.slotType = 'default'
            newItem.onPress = () => this.onTimeSelect(i)
          }

          if (filteredHours[j] === i) {
            newItem.slotType = 'default'
            newItem.onPress = () => this.onTimeSelect(i)

            j++
          }
        }
      } else {
        if (j < selectedDayHours.length + 1 && selectedDayHours[j] === i) {
          newItem.slotType = 'default'
          newItem.onPress = () => this.onTimeSelect(i)

          j++
        }
      }

      availableHours.push(newItem)
    }

    if (!isEmpty(calendar[selectedDate.dateString])) {
      return availableHours
    }
  }

  onTimeSelect = index => {
    this.setState({ selectedTime: index })
  }

  render() {
    const {
      selectedCar: { calendar },
      filters
    } = this.props

    this.disableRestHours = false

    const { selectedDate, selectedTime, hourList } = this.state

    let isButtonActive = selectedDate && selectedTime > -1
    let markedDates = {}

    for (var key in calendar) {
      if (calendar.hasOwnProperty(key) && isEmpty(calendar[key])) {
        markedDates[key] = {
          disabled: true
        }
      }
    }

    let startDate = _.first(Object.keys(calendar))
    let endDate = _.last(Object.keys(calendar))

    if (this.bookDateType === 'end') {
      startDate = moment(this.minDate).format('YYYY-MM-DD')
      const tomorrow = moment(this.minDate).add({ days: 1 })
      const alailableHoursPrevDay = this.prevDateHourList(selectedDate)

      if (
        this.isTommorowAvailable(
          selectedDate,
          alailableHoursPrevDay,
          selectedTime
        )
      ) {
        endDate = tomorrow.format('YYYY-MM-DD')
      } else {
        endDate = moment(this.minDate).format('YYYY-MM-DD')
      }
    }

    if (selectedDate) {
      markedDates[selectedDate.dateString] = {
        color: colors.red,
        selected: true,
        selectedColor: colors.red
      }
    }

    const currentDate = moment(filters.startDate).format('YYYY-MM-DD')

    return (
      <View style={styles.container}>
        <Calendar
          contentContainerStyle={styles.calendar}
          current={selectedDate || currentDate}
          markedDates={markedDates}
          maxDate={endDate}
          minDate={startDate}
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

        <View
          style={{
            flex: 1
          }}
        >
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
              title={'CONFIRM'}
              onPress={this.onConfirmPress}
            />
          </Animated.View>
        </View>
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

const extraPadding = Platform.OS === 'ios' ? 70 : 0
export const pickerHeight = (metrics.screenHeight - extraPadding) / 2.1

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: metrics.contentMarginSmall,
    paddingTop: 5
  },

  calendar: {},

  timePickers: {
    borderTopColor: colors.gray50,
    borderTopWidth: 2,
    paddingBottom: metrics.contentMarginSmall,
    height: '100%',
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 0,
    left: metrics.contentMarginSmall,
    right: metrics.contentMarginSmall
  },
  timePickerRow: {
    flex: 1,
    flexDirection: 'row'
  },
  timePickerContainer: {
    flex: 1
  },
  timePickerLabel: {
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: metrics.fontSizeBig,
    color: colors.gray200,
    fontFamily: 'SFProText-Regular'
  },

  timePicker: {
    flex: 1
  },

  pickerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 5,
    marginBottom: 4,
    paddingVertical: 5
  },

  pickerItemText: {
    fontSize: metrics.fontSizeBig,
    fontFamily: 'SFProText-Regular'
  },

  button: {
    marginTop: 13
  }
})
