import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native'
import { DatePicker as CustomDatePickerIOS } from 'react-native-wheel-datepicker'
import PropTypes from 'prop-types'

import moment from 'moment'

class DatePicker extends PureComponent {
  state = {
    isOpen: false,

    animation: new Animated.Value(0)
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

    const { value, type, formatter } = this.props

    return (
      <View>
        <TouchableWithoutFeedback onPress={this.handleOpen}>
          <View>
            <Text>{type}</Text>
            <Text>{moment(value).format(formatter)}</Text>
          </View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            height: animation,
            overflow: 'hidden',
            zIndex: 0
          }}
        >
          <CustomDatePickerIOS
            date={new Date(value)}
            style={{ width: '100%' }}
            textColor="black"
            onDateChange={this.handleChange}
          />
        </Animated.View>
      </View>
    )
  }
}

DatePicker.propTypes = {
  formatter: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export { DatePicker }
