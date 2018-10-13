import React, { Component, PureComponent } from 'react'
import { View, TouchableOpacity, Text, Animated, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import {Calendar} from 'react-native-calendars'
import {get24hours, getCurrentDayHours, getDisabledDays} from 'helpers/date'
import {NewBookingDetails} from 'navigation/routeNames'
import { NavButton, Button } from 'components/ui'
import { colors } from 'theme'
import styles, {pickerHeight} from './styles'
// var PickerItem = Picker.Item

const moment = extendMoment(Moment)

class PickerItem extends PureComponent {
  onPress = () => {
    this.props.onPress(this.props.time)
  }
  render () {
    const {time, slotType} = this.props
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
      <Wrapper style={[styles.pickerItem, {backgroundColor}]} onPress={this.onPress}>
        <Text style={[styles.pickerItemText, {color: textColor}]}>{time}</Text>
      </Wrapper>
    )
  }
}

PickerItem.propTypes = {
  slotType: PropTypes.string,
  time: PropTypes.string,
  onPress: PropTypes.func
}

const Arrow = ({direction}) => {
  if (direction === 'left') return <Icon color={colors.red} name='ios-arrow-back' size={22} />
  return <Icon color={colors.red} name='ios-arrow-forward' size={22} />
}

Arrow.propTypes = {
  direction: PropTypes.string
}

class BookingCalendar extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavButton icon='cancel' imageStyle={{height: 12, width: 12}} onPress={() => navigation.goBack()} />
    }
  }
  isHiddenPicker = true
  constructor (props) {
    super(props)
    this.bookedHours = this.props.navigation.getParam('bookedHours', {})
    let disabledDays = getDisabledDays(this.bookedHours)
    let currentDate = moment()
    let pickupHours = getCurrentDayHours()
    let hourList = get24hours(currentDate.add(1, 'd'))
    console.log('pickupHours', pickupHours)
    this.minDate = currentDate.format('YYYY-MM-DD')
    this.state = {
      maxDate: null,
      startDate: null,
      endDate: null,
      startTimeIndex: null,
      endTimeIndex: null,
      bounceValue: new Animated.Value(pickerHeight),
      pickupHours,
      disabledDays,
      hourList,
      selectedDate: null,
      selectedHour: null
    }
  }

  onConfirmPress = () => {
    let bookDateType = this.props.navigation.getParam('bookDateType', 'start')
    this.props.navigation.navigate(NewBookingDetails, { bookDateType })
  }
  _toggleTimePicker = () => {
    var toValue = pickerHeight

    if (this.isHiddenPicker) {
      toValue = 0
    }

    // This will animate the transalteY of the subview between 0 & 100 depending on its current state
    // 100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8
      }
    ).start()

    this.isHiddenPicker = !this.isHiddenPicker
  }

  onDateSelect = (selectedDate) => {
    console.log('selectedDate', selectedDate)
    const {startDate, endDate} = this.state
    // if ((startDate && endDate) || !startDate) {
    //   let maxDate = moment(selectedDate.dateString).add(1, 'days').format('YYYY-MM-DD')
    //   this.setState({startDate: selectedDate.dateString, endDate: null, maxDate})
    //   !this.isHiddenPicker && this._toggleTimePicker()
    // } else if (startDate && !endDate) {
    //   if (moment(selectedDate.dateString).isSameOrAfter(startDate, 'day')) {
    //     this.setState({endDate: selectedDate.dateString, maxDate: null})
    //     this.isHiddenPicker && this._toggleTimePicker()
    //   } else {
    //     let maxDate = moment(selectedDate.dateString).add(1, 'days').format('YYYY-MM-DD')
    //     this.setState({startDate: selectedDate.dateString, endDate: null, maxDate})
    //     !this.isHiddenPicker && this._toggleTimePicker()
    //   }
    // }
    this.setState({selectedDate: selectedDate.dateString})
    this.isHiddenPicker && this._toggleTimePicker()
  }
  onPickupTimeSelect = (index) => {
    this.setState(state => ({startTimeIndex: index}))
  }
  onReturnTimeSelect = (index) => {
    this.setState(state => ({endTimeIndex: index}))
  }

  onTimeSelect = (index) => {
    this.setState({selectedHour: index})
  }

  renderPickupPicker = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.timePicker} >
        {this.state.pickupHours.map((value, i) => (
          <PickerItem key={i} time={value} />
        ))}
      </ScrollView>
    )
  }

  renderReturnPicker = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.timePicker} >
        {this.state.returnHours.map((value, i) => (
          <PickerItem key={i} time={value} />
        ))}
      </ScrollView>
    )
  }
  render () {
    const {disabledDays, selectedDate, selectedHour} = this.state
    let isButtonActive = selectedDate && selectedHour
    let markedDates = {...disabledDays}
    // if (startDate) markedDates[startDate] = {startingDay: true, color: colors.red, selected: true}
    // if (endDate) markedDates[endDate] = {endingDay: true, color: colors.red, selected: true}

    if (selectedDate) markedDates[selectedDate] = {color: colors.red, selected: true, selectedColor: colors.red}
    return (
      <View style={styles.container}>
        <Calendar
          contentContainerStyle={styles.calendar}
          markedDates={markedDates}
          // markingType={'period'}
          maxDate={this.state.maxDate}
          minDate={this.minDate}
          // pastScrollRange={0}
          // futureScrollRange={50}
          renderArrow={(direction) => (<Arrow direction={direction} />)}
          style={styles.calendar}
          theme={{
            textDayFontFamily: 'SFProText-Regular',
            textMonthFontFamily: 'SFProText-Regular',
            textDayHeaderFontFamily: 'SFProText-Regular',
            todayTextColor: colors.red
          }}
          onDayPress={this.onDateSelect}
        />
        <Animated.View style={[styles.timePickers, {transform: [{translateY: this.state.bounceValue}]}]}>
          <View style={styles.timePickerRow}>
            <View style={styles.timePickerContainer}>
              <Text style={styles.timePickerLabel}>PICKUP</Text>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.timePicker} >
                {this.state.hourList.map((value, i) => {
                  let type = 'default'
                  let dayForCheck = this.bookedHours[selectedDate]
                  if (this.state.selectedHour === i) type = 'selected'
                  else if (dayForCheck && dayForCheck !== false) {
                    if (dayForCheck.includes(value)) type = 'disabled'
                  }
                  return <PickerItem key={i}slotType={type} time={value} onPress={() => this.onTimeSelect(i)} />
                })}
              </ScrollView>
              {/* <Picker
                itemStyle={styles.pickerItem}
                selectedValue={this.state.startTimeIndex}
                style={styles.timePicker}
                onValueChange={this.onPickupTimeSelect}
              >
                {this.state.pickupHours.map((value, i) => (
                  <PickerItem key={'money' + value} label={value} style={{backgroundColor: 'green'}} value={i} />
                ))}
              </Picker> */}
            </View>
          </View>
          <Button
            containerStyle={styles.button}
            disabled={!isButtonActive}
            title='CONFIRM'
            onPress={this.onConfirmPress}
          />
        </Animated.View>
      </View>
    )
  }
}

BookingCalendar.propTypes = {
  navigation: PropTypes.object
}

export default BookingCalendar
