import React, { PureComponent } from 'react'
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
  Photo,
  Spinner
} from 'components/ui'
import MapView from 'react-native-maps'
import { colors } from 'theme'
import { STATUS as RIDE_STATUS } from 'constants/ride'
import { styles, mapStyles } from './styles'

class Countdown extends PureComponent {
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
    this.start = moment.tz(startTime.date, 'America/New_York').add(1, 'm')
    this.end = moment.tz(endTime.date, 'America/New_York').add(1, 'm')

    if (moment().isAfter(this.end)) {
      this.minutesRemaining = Math.floor((this.now - this.end.unix()) / 60)
      let diffString = this.getDiffString(this.end)

      countdownMessage = `Late by ${diffString}`
    } else {
      if (type === RIDE_STATUS.PENDING) {
        this.minutesRemaining = Math.floor((this.start.unix() - this.now) / 60)
        let diffString = this.getDiffString(this.start)

        countdownMessage = `Starting in ${diffString}`
      } else if (type === RIDE_STATUS.DRIVING) {
        this.minutesRemaining = Math.floor((this.end.unix() - this.now) / 60)
        let diffString = this.getDiffString(this.end)

        countdownMessage = `Ending in ${diffString}`
      }
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

  getDiffString(date) {
    const now = moment().tz('America/New_York')
    const diffString = now.to(moment(date), true)

    return diffString
  }

  tick = () => {
    this.minutesRemaining--

    const now = moment().tz('America/New_York')
    let diffString = now.to(this.start, true)

    let countdownMessage = ''
    const isLate = moment().isAfter(this.end)

    if (isLate) {
      this.minutesRemaining = Math.floor((this.now - this.end.unix()) / 60)
      let diffString = this.getDiffString(this.end)

      countdownMessage = `Late by ${diffString}`
    } else {
      if (this.props.type === RIDE_STATUS.PENDING) {
        countdownMessage = `Starting in ${diffString}`

        this.setState({
          countdownMessage
        })
      } else if (this.props.type === RIDE_STATUS.DRIVING) {
        diffString = this.getDiffString(this.end)
        let countdownMessage = `Ending in ${diffString}`

        this.setState({
          countdownMessage
        })
      }
    }

    if (this.minutesRemaining === 0 && !isLate) {
      clearInterval(this.intervalHandle)
    }
  }

  render() {
    const { type } = this.props

    if (type === RIDE_STATUS.ENDED || type === RIDE_STATUS.CANCELED) {
      return null
    }

    const { countdownMessage } = this.state

    return <Text style={styles.timer}>{countdownMessage}</Text>
  }
}

Countdown.propTypes = {
  endTime: PropTypes.object,
  startTime: PropTypes.object,
  type: PropTypes.string
}

class BookingDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate(prevProps) {
    const { error, requestPending } = this.props

    if (prevProps.requestPending && !requestPending && error) {
      setTimeout(() => Alert.alert('Error', error), 200)
    }
  }

  onSubmitReceiptPress = () => {
    this.props.navigation.navigate(ReceiptSubmit)
  }

  onButtonPress = () => {
    const { ride = {} } = this.props

    switch (ride.status) {
      case RIDE_STATUS.DRIVING:
        this.props.navigation.navigate(RideEnd, { isEnd: true })
        break

      case RIDE_STATUS.ENDED:
      case RIDE_STATUS.CANCELED:
        this.props.onSelectCarForBooking(ride.car.id)
        this.props.navigation.navigate(NewBookingDetails)
        break

      case RIDE_STATUS.PENDING:
      default:
        this.props.navigation.navigate(RideEnd, { isEnd: false })
        break
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
    const {
      ride: { booking_starting_at: bookindStartingAt }
    } = this.props

    let date = moment.tz(bookindStartingAt.object.date, 'America/New_York')
    let now = moment().tz('America/New_York')

    return date.diff(now, 'minutes') > 30
  }

  renderEndedRideDetails = () => {
    const {
      ride: { ended_report: report }
    } = this.props

    return (
      <View style={styles.endedRideDetails}>
        <SectionHeader title={'RETURN CHECK'} />
        <Section>
          <SectionHeader
            style={styles.sectionHeader}
            title={'Car is not damaged'}
          />

          <SectionContent style={styles.photoList}>
            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>{'Front'}</Text>

              <Photo imageUri={report.photo_front_s3_link} touchable={false} />
            </View>

            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>{'Back'}</Text>

              <Photo imageUri={report.photo_back_s3_link} touchable={false} />
            </View>

            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>{'Right side'}</Text>

              <Photo imageUri={report.photo_right_s3_link} touchable={false} />
            </View>
            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>{'Left side'}</Text>

              <Photo imageUri={report.photo_left_s3_link} touchable={false} />
            </View>
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader
            style={styles.sectionHeader}
            title={'Gas tank is full'}
          />

          <SectionContent>
            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>{'Gas tank indicator'}</Text>

              <Photo
                imageUri={report.photo_gas_tank_s3_link}
                touchable={false}
              />
            </View>
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader style={styles.sectionHeader} title={'Mileage'} />

          <SectionContent>
            <View style={styles.photoBlock}>
              <Text style={styles.photoLabel}>{'Mileage'}</Text>

              <Photo
                imageUri={report.photo_mileage_s3_link}
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

    if (!ride) {
      return null
    }

    let buttonDisabled = true
    let buttonText = 'UNLOCK CAR'

    switch (ride.status) {
      case RIDE_STATUS.DRIVING:
        buttonText = 'END DRIVE'
        buttonDisabled = false
        break

      case RIDE_STATUS.ENDED:
      case RIDE_STATUS.CANCELED:
        buttonText = 'BOOK AGAIN'
        buttonDisabled = false
        break

      case RIDE_STATUS.PENDING:
        if (!this.isMoreThan30Minutes()) {
          buttonDisabled = false
        }
        break
    }

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
      manufacturer = {},
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
            <SectionHeader title={'VEHICLE'} />

            <SectionContent style={{ flexDirection: 'column' }}>
              <View>
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Detail label={'Car Make'} text={manufacturer.name} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Detail label={'Model'} text={model} />
                  </View>
                </View>

                <View style={[styles.row, { marginVertical: 16 }]}>
                  <View style={{ flex: 1 }}>
                    <Detail label={'Color'} text={color} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Detail label={'Year'} text={year.toString()} />
                  </View>
                </View>

                <Detail label={'Plate'} text={plate} />
              </View>
            </SectionContent>
          </Section>

          <Section>
            <SectionHeader title={'SCHEDULE'} />

            <SectionContent style={{ flexDirection: 'column' }}>
              <View>
                <View style={{ marginBottom: 16 }}>
                  <View style={[styles.row]}>
                    <View style={{ flex: 1 }}>
                      <Detail
                        label={'Start'}
                        text={bookindStartingAt.formatted}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Detail label={'End'} text={bookindEndingAt.formatted} />
                    </View>
                  </View>

                  <Countdown
                    endTime={bookindEndingAt.object}
                    startTime={bookindStartingAt.object}
                    type={ride.status}
                  />
                </View>

                <Detail label={'Total'} text={`${duration} hours`} />
              </View>
            </SectionContent>
          </Section>

          <Section>
            <SectionHeader title={'PICKUP'} />

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
                <Text style={styles.mapButtonText}>{'Open in Maps'}</Text>
              </TouchableOpacity>
            </SectionContent>
          </Section>

          <Section>
            <SectionHeader title={'RETURN'} />

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
                <Text style={styles.mapButtonText}>{'Open in Maps'}</Text>
              </TouchableOpacity>
            </SectionContent>
          </Section>

          {ride.status === RIDE_STATUS.PENDING ||
          ride.status === RIDE_STATUS.DRIVING ? (
            <React.Fragment>
              <Section>
                <SectionHeader title={'DO YOU NEED HELP?'} />

                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={this.onHelpPress}
                >
                  <Text style={styles.linkButtonText}>
                    {'Open help center'}
                  </Text>
                </TouchableOpacity>
              </Section>

              {/* <Section style={{ borderBottomWidth: 0 }}>
                <SectionHeader title="RECEIPT" />
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={this.onSubmitReceiptPress}
                >
                  <Text style={styles.linkButtonText}>
                    Submit expense receipt
                  </Text>
                </TouchableOpacity>
              </Section> */}
            </React.Fragment>
          ) : null}

          {ride.status === RIDE_STATUS.ENDED
            ? this.renderEndedRideDetails()
            : null}
        </View>

        <Button
          containerStyle={styles.button}
          disabled={buttonDisabled}
          title={buttonText}
          onPress={this.onButtonPress}
        />

        {ride.status === RIDE_STATUS.PENDING ? (
          <Text style={styles.lockedText}>
            {
              'Unlock is available 30 minutes before \n scheduled start of the ride'
            }
          </Text>
        ) : null}

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
  onUnselectRide: PropTypes.func
}

export default BookingDetail
