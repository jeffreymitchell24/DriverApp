import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  DatePickerIOS
} from 'react-native'
import PropTypes from 'prop-types'

import moment from 'moment'

import styles from './styles'

class DatePicker extends PureComponent {
  state = {
    isOpen: false,

    animation: new Animated.Value(0)
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

    onChange(moment(nextDate).format(), type)
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
      disabled
    } = this.props

    return (
      <View style={[styles.container, style]}>
        <TouchableWithoutFeedback disabled={disabled} onPress={this.handleOpen}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{type}</Text>
            <Text
              style={disabled ? styles.headerDisabledText : styles.headerDate}
            >
              {headerValue || moment(value).format(formatter)}
            </Text>
          </View>
        </TouchableWithoutFeedback>

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
          <DatePickerIOS
            date={new Date(value)}
            minimumDate={startDate ? new Date(startDate) : new Date()}
            mode="datetime"
            style={{ width: '100%' }}
            onDateChange={this.handleChange}
          />
        </Animated.View>
      </View>
    )
  }
}

DatePicker.propTypes = {
  ExpandedHeader: PropTypes.element,
  disabled: PropTypes.bool,
  formatter: PropTypes.string,
  headerValue: PropTypes.oneOf([PropTypes.string, null]),
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
