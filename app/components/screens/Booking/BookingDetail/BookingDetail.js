import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { BookingDetail as Detail, CarImage } from 'components/blocks'
import {
  CarLocation,
  RideHelp,
  ReceiptSubmit,
  RideEnd,
  NewBookingDetails
} from 'navigation/routeNames'
import {
  Button,
  Section,
  SectionHeader,
  SectionContent,
  Photo
} from 'components/ui'
import MapView from 'react-native-maps'
import Spinner from 'react-native-loading-spinner-overlay'
import { convertMinsToHrsMins } from 'helpers/date'
import { colors } from 'theme'
import { styles, mapStyles } from './styles'

class Countdown extends Component {
  intervalHandle = null

  constructor(props) {
    super(props)
    const { type, endTime, startTime } = this.props
    this.intervalHandle = null
    this.minutesRemaining = 0
    let countdownMessage = ''
    this.now = moment()
      .tz('America/New_York')
      .unix()
    if (type === 'pending') {
      this.start = moment
        .tz(startTime.date, 'America/New_York')
        .add(1, 'm')
        .unix()
      this.minutesRemaining = Math.floor((this.start - this.now) / 60)
      let diffString = convertMinsToHrsMins(this.minutesRemaining)
      countdownMessage = `Starting in ${diffString}`
    } else if (type === 'driving') {
      this.end = moment
        .tz(endTime.date, 'America/New_York')
        .add(1, 'm')
        .unix()
      this.minutesRemaining = Math.floor((this.end - this.now) / 60)
      let diffString = convertMinsToHrsMins()
      countdownMessage = `Ending in ${diffString}`
    }
    this.state = {
      countdownMessage
    }
  }
  componentDidMount = () => {
    this.startCountdown()
  }
  componentWillUnmount = () => {
    clearInterval(this.intervalHandle)
  }
  startCountdown = () => {
    this.intervalHandle = setInterval(this.tick, 1000 * 60)
  }
  tick = () => {
    this.minutesRemaining--

    let diffString = convertMinsToHrsMins(this.minutesRemaining)
    if (this.props.type === 'pending') {
      let countdownMessage = `Starting in ${diffString}`
      this.setState({
        countdownMessage
      })
    } else if (this.props.type === 'driving') {
      let countdownMessage = `Ending in ${diffString}`
      this.setState({
        countdownMessage
      })
    }
    if (this.minutesRemaining === 0) {
      clearInterval(this.intervalHandle)
    }
  }
  render() {
    const { type } = this.props
    if (type === 'ended' || type === 'cancelled') return null
    const { countdownMessage } = this.state
    console.log('countdownMessage', countdownMessage)
    return <Text style={styles.timer}>{countdownMessage}</Text>
  }
}

Countdown.propTypes = {
  endTime: PropTypes.object,
  startTime: PropTypes.object,
  type: PropTypes.string
}

class BookingDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillUnmount() {
    this.props.onUnselectRide()
  }
  componentDidUpdate(prevProps) {
    const { error, requestPending } = this.props
    if (prevProps.requestPending && !requestPending) {
      if (error) Alert.alert('Error', error)
    }
  }
  onSubmitReceiptPress = () => {
    this.props.navigation.navigate(ReceiptSubmit)
  }

  onButtonPress = () => {
    const { ride = {} } = this.props
    if (ride.status === 'driving') {
      this.props.navigation.navigate(RideEnd, { isEnd: true })
    } else if (ride.status === 'ended') {
      this.props.onSelectCarForBooking(ride.car.id)
      this.props.navigation.navigate(NewBookingDetails)
    } else {
      this.props.navigation.navigate(RideEnd, { isEnd: false })
    }
  }

  onHelpPress = () => {
    this.props.navigation.navigate(RideHelp)
  }
  onMapPress = locationType => {
    let geo = {}
    const {
      pickup_location_lat: pickupLat,
      pickup_location_lon: pickupLon,
      return_location_lat: returnLat,
      return_location_lon: returnLon
    } = this.props.ride.car
    geo.lat = locationType === 'pickup' ? pickupLat : returnLat
    geo.lon = locationType === 'pickup' ? pickupLon : returnLon

    this.props.navigation.navigate(CarLocation, { geo })
  }

  isMoreThan30Minutes = () => {
    let { ride } = this.props
    const { booking_starting_at: bookindStartingAt } = ride
    let date = moment.tz(bookindStartingAt.object.date, 'America/New_York')
    let now = moment().tz('America/New_York')

    console.log(date.diff(now, 'minutes') > 30)
    console.log('date', date.format())
    console.log('now', now.format())
    return date.diff(now, 'minutes') > 30
  }

  renderEndedRideDetails = () => {
    const {
      ride: { ended_report: report }
    } = this.props
    return (
      <View style={styles.endedRideDetails}>
        <SectionHeader title="RETURN CHECK" />
        <Section>
          <SectionHeader
            style={styles.sectionHeader}
            title="Car is not damaged"
          />
          <SectionContent style={styles.photoList}>
            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>Front</Text>
              <Photo imageUri={report.photo_front_s3_link} touchable={false} />
            </View>
            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>Back</Text>
              <Photo imageUri={report.photo_back_s3_link} touchable={false} />
            </View>
            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>Right side</Text>
              <Photo imageUri={report.photo_right_s3_link} touchable={false} />
            </View>
            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>Left side</Text>
              <Photo imageUri={report.photo_left_s3_link} touchable={false} />
            </View>
          </SectionContent>
        </Section>
        <Section>
          <SectionHeader
            style={styles.sectionHeader}
            title="Gas tank is full"
          />
          <SectionContent>
            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>Gas tank indicator</Text>
              <Photo
                imageUri={report.photo_gas_tank_s3_link}
                touchable={false}
              />
            </View>
          </SectionContent>
        </Section>
      </View>
    )
  }

  render() {
    const { ride } = this.props
    console.log('ride', ride)
    let buttonDisabled = true
    let buttonText = 'UNLOCK CAR'
    if (ride.status === 'driving') {
      buttonText = 'END DRIVE'
      buttonDisabled = false
    } else if (ride.status === 'ended' || ride.status === 'canceled') {
      buttonText = 'BOOK AGAIN'
      buttonDisabled = false
    } else if (ride.status === 'pending' && !this.isMoreThan30Minutes()) {
      buttonDisabled = false
    }
    if (!ride) return null
    const {
      booking_starting_at: bookindStartingAt,
      booking_ending_at: bookindEndingAt,
      car
    } = ride
    const {
      image_s3_url: image,
      pickup_location_lat: pickupLat,
      pickup_location_lon: pickupLon,
      return_location_lat: returnLat,
      return_location_lon: returnLon,
      full_pickup_location: pickupAddress,
      full_return_location: returnAddress,
      manufacturer = '',
      model = '',
      color = '',
      year = '',
      plate = ''
    } = car

    let duration =
      moment(bookindEndingAt.object.date).diff(
        moment(bookindStartingAt.object.date),
        'hours'
      ) + 1
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View style={styles.carImageContainer}>
            <CarImage imageUri={image} />
          </View>
          <Section>
            <SectionHeader title="VEHICLE" />
            <SectionContent style={{ flexDirection: 'column' }}>
              <View>
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Detail label="Car Maker" text={manufacturer} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Detail label="Model" text={model} />
                  </View>
                </View>
                <View style={[styles.row, { marginVertical: 16 }]}>
                  <View style={{ flex: 1 }}>
                    <Detail label="Color" text={color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Detail label="Year" text={year.toString()} />
                  </View>
                </View>
                <Detail label="Plate" text={plate} />
              </View>
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title="SCHEDULE" />
            <SectionContent style={{ flexDirection: 'column' }}>
              <View>
                <View style={{ marginBottom: 16 }}>
                  <View style={[styles.row]}>
                    <View style={{ flex: 1 }}>
                      <Detail
                        label="Start"
                        text={bookindStartingAt.formatted}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Detail label="End" text={bookindEndingAt.formatted} />
                    </View>
                  </View>
                  <Countdown
                    endTime={bookindEndingAt.object}
                    startTime={bookindStartingAt.object}
                    type={ride.status}
                  />
                </View>
                <Detail label="Total" text={`${duration} hours`} />
              </View>
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title="PICKUP" />
            <SectionContent style={{ flexDirection: 'column' }}>
              <View style={styles.map}>
                <MapView
                  initialRegion={{
                    latitude: pickupLat,
                    longitude: pickupLon,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                  }}
                  liteMode
                  showsScale={false}
                  style={mapStyles.map}
                  zoomEnabled={false}
                >
                  <MapView.Marker
                    coordinate={{
                      latitude: pickupLat,
                      longitude: pickupLon
                    }}
                  />
                </MapView>
              </View>
              <Text style={styles.address}>{pickupAddress}</Text>
              <TouchableOpacity onPress={() => this.onMapPress('pickup')}>
                <Text style={styles.mapButtonText}>Open in Maps</Text>
              </TouchableOpacity>
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title="RETURN" />
            <SectionContent style={{ flexDirection: 'column' }}>
              <View style={styles.map}>
                <MapView
                  initialRegion={{
                    latitude: returnLat,
                    longitude: returnLon,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                  }}
                  liteMode
                  showsScale={false}
                  style={mapStyles.map}
                  zoomEnabled={false}
                >
                  <MapView.Marker
                    coordinate={{
                      latitude: returnLat,
                      longitude: returnLon
                    }}
                  />
                </MapView>
              </View>
              <Text style={styles.address}>{returnAddress}</Text>
              <TouchableOpacity onPress={() => this.onMapPress('return')}>
                <Text style={styles.mapButtonText}>Open in Maps</Text>
              </TouchableOpacity>
            </SectionContent>
          </Section>
          {(ride.status === 'pending' || ride.status === 'driving') && (
            <React.Fragment>
              <Section>
                <SectionHeader title="DO YOU NEED HELP?" />
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={this.onHelpPress}
                >
                  <Text style={styles.linkButtonText}>Open help center</Text>
                </TouchableOpacity>
              </Section>
              <Section style={{ borderBottomWidth: 0 }}>
                <SectionHeader title="RECEIPT" />
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={this.onSubmitReceiptPress}
                >
                  <Text style={styles.linkButtonText}>
                    Submit expense receipt
                  </Text>
                </TouchableOpacity>
              </Section>
            </React.Fragment>
          )}
          {ride.status === 'ended' && this.renderEndedRideDetails()}
        </View>
        <Button
          containerStyle={styles.button}
          disabled={buttonDisabled}
          title={buttonText}
          onPress={this.onButtonPress}
        />
        {ride.status === 'pending' && (
          <Text style={styles.lockedText}>
            Unlock is available 30 minutes before
            {'\n'} scheduled start of the ride
          </Text>
        )}
        <Spinner color={colors.red} visible={this.props.requestPending} />
      </ScrollView>
    )
  }
}

BookingDetail.propTypes = {
  error: PropTypes.string,
  navigation: PropTypes.object,
  requestPending: PropTypes.bool,
  ride: PropTypes.object,
  onSelectCarForBooking: PropTypes.func,
  // onUnlockRide: PropTypes.func,
  onUnselectRide: PropTypes.func
}

export default BookingDetail
