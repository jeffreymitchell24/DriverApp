import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SectionList
} from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { BookingCard } from 'components/blocks'
import { Button } from 'components/ui'
import { colors } from 'theme'
import styles from './styles'

class HomeView extends PureComponent {
  keyExtractor = (item, index) => `${item.id}${index}`

  renderEmptyList = () => {
    const { onNewPress } = this.props
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>
          You don't have any upcoming bookings.
        </Text>
        <TouchableOpacity onPress={onNewPress}>
          <Text style={[styles.emptyListText, { color: colors.red }]}>
            Create booking now
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  renderItem = ({ item, index }) => {
    const { onBookingPress } = this.props
    return (
      <BookingCard
        booking={item.car}
        bookingEnd={item['booking_ending_at'].formatted}
        bookingStart={item['booking_starting_at'].formatted}
        extraDetail={`Starting ${item['booking_starting_at'].formatted}`}
        isRecurring={item['is_recurring']}
        onPress={onBookingPress}
      />
    )
  }

  renderSectionTitle = ({ section: { title } }) => (
    <Text style={styles.sectionTitle}>{_.upperCase(title)}</Text>
  )

  render() {
    const { bookings, onNewPress, isFetching, withoutNewBtn } = this.props
    if (isFetching) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={colors.red} size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {bookings.length > 0 ? (
          <SectionList
            extraData={bookings}
            keyExtractor={this.keyExtractor}
            renderItem={this.props.renderItem || this.renderItem}
            renderSectionFooter={() => <View style={{ height: 12 }} />}
            renderSectionHeader={this.renderSectionTitle}
            sections={bookings}
          />
        ) : (
          this.renderEmptyList()
        )}
        {!withoutNewBtn && (
          <Button
            containerStyle={styles.button}
            title="NEW BOOKING"
            onPress={onNewPress}
          />
        )}
      </View>
    )
  }
}

HomeView.propTypes = {
  bookings: PropTypes.array,
  isFetching: PropTypes.bool,
  renderItem: PropTypes.func,
  withoutNewBtn: PropTypes.bool,
  onBookingPress: PropTypes.func,
  onNewPress: PropTypes.func
}

HomeView.defaultProps = {
  isFetching: false,
  bookings: []
}

export { HomeView }
