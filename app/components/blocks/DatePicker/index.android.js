import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native'
// import { DatePicker as CustomDatePicker } from 'react-native-wheel-picker-android'
import CustomDatePicker from 'react-native-date-picker'
import PropTypes from 'prop-types'

import moment from 'moment'

import styles from './styles'

class DatePicker extends PureComponent {
  state = {
    isOpen: false,

    animation: new Animated.Value(0),
    selectedDate: new Date()
  }

  constructor(props) {
    super(props)

    const { value } = props

    this.state.selectedDate = value
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.disabled && this.state.isOpen) {
      this.handleOpen()
    }
  }

  handleOpen = () => {
    const { isOpen, animation } = this.state

    const initialValue = isOpen ? 216 : 0
    const finalValue = isOpen ? 0 : 216

    this.setState({
      isOpen: !isOpen
    })

    animation.setValue(initialValue)
    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      easing: Easing.linear
    }).start()
  }

  handleChange = nextDate => {
    const { onChange, type } = this.props

    onChange(
      moment(nextDate)
        .tz('America/New_York')
        .format(),
      type
    )
  }

  render() {
    const { animation } = this.state

    const {
      value,
      type,
      formatter,
      style,
      startDate,
      ExpandedHeader,
      headerValue,
      disabled,
      isDatePickerShow
    } = this.props

    console.log('datepicker props', this.props)

    const initDate = moment(value)
      .tz('America/New_York')
      .toDate()

    const minDate = startDate
      ? moment(startDate)
          .tz('America/New_York')
          .toDate()
      : moment()
          .tz('America/New_York')
          .toDate()

    return (
      <View style={[styles.container, style]}>
        <TouchableWithoutFeedback onPress={this.handleOpen}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{type}</Text>
            <Text
              style={disabled ? styles.headerDisabledText : styles.headerDate}
            >
              {headerValue ||
                moment(value)
                  .tz('America/New_York')
                  .format(formatter)}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        {isDatePickerShow && (
          <Animated.View
            style={{
              height: animation,
              overflow: 'hidden',
              zIndex: 0
            }}
          >
            {!!ExpandedHeader && (
              <TouchableWithoutFeedback onPress={this.handleOpen}>
                <ExpandedHeader />
              </TouchableWithoutFeedback>
            )}
            <CustomDatePicker
              date={initDate}
              minimumDate={minDate}
              style={{
                width: '100%',
                height: 216
              }}
              timeZoneOffsetInMinutes={-5 * 60}
              onDateChange={this.handleChange}
            />
          </Animated.View>
        )}
      </View>
    )
  }
}

DatePicker.propTypes = {
  ExpandedHeader: PropTypes.element,
  disabled: PropTypes.bool,
  formatter: PropTypes.string,
  headerValue: PropTypes.oneOf([PropTypes.string, null]),
  isDatePickerShow: PropTypes.bool,
  startDate: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

DatePicker.defaultProps = {
  disabled: false
}

export default DatePicker
