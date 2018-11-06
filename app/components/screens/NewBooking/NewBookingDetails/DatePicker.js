import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native'
import PropTypes from 'prop-types'

class DatePicker extends PureComponent {
  state = {
    isOpen: false,

    animation: new Animated.Value(0)
  }

  handleOpen = () => {
    const { isOpen, animation } = this.state

    const initialValue = isOpen ? 200 : 0
    const finalValue = isOpen ? 0 : 200

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

  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.handleOpen}>
          <Text>gf</Text>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            height: 200,
            overflow: 'hidden',
            zIndex: 0
          }}
        >
          <Text>ffff</Text>
        </Animated.View>
      </View>
    )
  }
}

DatePicker.propTypes = {
  type: PropTypes.string,
  formatter: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default DatePicker
