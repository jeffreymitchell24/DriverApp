import React, { PureComponent } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
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

export default TimeSlot
