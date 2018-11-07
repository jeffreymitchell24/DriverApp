import React, { PureComponent } from 'react'
import { Switch } from 'react-native-switch'

import PropTypes from 'prop-types'

import { View, Text, Image } from 'react-native'

import moment from 'moment'

import { icons } from 'images'
import { DatePicker } from 'components/blocks'

import styles from './styles'

class Filters extends PureComponent {
  handleDateChange = (nextDate, type) => {
    const { onFilterUpdate } = this.props
    const nextState = {}

    if (type === 'Start') {
      onFilterUpdate('startDate', nextDate)
      onFilterUpdate(
        'endDate',
        moment(nextDate)
          .add({ hours: 12 })
          .format()
      )
    } else {
      onFilterUpdate('endDate', nextDate)
    }

    this.setState(nextState)
  }

  handleToogleRecurringSwitch = () => {
    const { filters, onFilterUpdate } = this.props

    onFilterUpdate('isRecurring', !filters.isRecurring)
  }

  render() {
    const {
      filters: { startDate, endDate, isRecurring }
    } = this.props

    return (
      <View style={styles.container}>
        <DatePicker
          formatter="dddd, DD MMM hh:mmA"
          startDate={new Date()}
          style={{ marginTop: 20 }}
          type="Start"
          value={startDate}
          onChange={this.handleDateChange}
        />
        <DatePicker
          formatter="dddd, DD MMM hh:mmA"
          startDate={moment(startDate)
            .add({ hours: 1 })
            .format()}
          style={{ marginBottom: 20 }}
          type="End"
          value={endDate}
          onChange={this.handleDateChange}
        />
        <View style={styles.filterRow}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.recurring}
              style={styles.recurringImageContainer}
            />
            <Text
              numberOfLines={2}
              style={[styles.fieldName, { width: '70%', marginLeft: 10 }]}
            >
              Show only cars avaliable for recurring bookin
            </Text>
          </View>
          <View>
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
}

Filters.propTypes = {
  filters: PropTypes.object,
  onFilterUpdate: PropTypes.func
}

export default Filters
