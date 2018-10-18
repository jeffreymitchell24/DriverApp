import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { BookingDetail as Detail, CarImage } from 'components/blocks'
import { CarLocation, RideHelp, ReceiptSubmit, RideEnd, RideLicenseCamera } from 'navigation/routeNames'
import { Button, Section, SectionHeader, SectionContent } from 'components/ui'
import MapView from 'react-native-maps'
import {styles, mapStyles} from './styles'

class BookingDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onSubmitReceiptPress = () => {
    this.props.navigation.navigate(ReceiptSubmit)
  }

  onUnlockPress = () => {
    this.props.navigation.navigate(RideLicenseCamera)
  }

  onHelpPress = () => {
    this.props.navigation.navigate(RideHelp)
  }
  onMapPress = (locationType) => {
    let geo = {}
    const {
      pickup_location_lat: pickupLat,
      pickup_location_lon: pickupLon,
      return_location_lat: returnLat,
      return_location_lon: returnLon
    } = this.props.ride.car

    if (locationType === 'pickup') {
      geo.lat = locationType === 'pickup' ? pickupLat : returnLat
      geo.lon = locationType === 'pickup' ? pickupLon : returnLon
    }

    this.props.navigation.navigate(CarLocation, {geo})
  }

  isMoreThan30Minutes = () => {
    let {ride} = this.props
    const {booking_starting_at: bookindStartingAt} = ride
    let date = moment.tz(bookindStartingAt.object.date, 'America/New_York')
    let now = moment().tz('America/New_York')

    console.log(date.diff(now, 'minutes') > 30)
    console.log('date', date.format())
    console.log('now', now.format())
    return date.diff(now, 'minutes') > 30
  }

  render () {
    const {ride} = this.props
    let unlockDisabled = true
    if (ride.status === 'pending' && !this.isMoreThan30Minutes()) unlockDisabled = false
    if (!ride) return null
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
    } = ride.car
    return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View>
          <View style={styles.carImageContainer}>
            <CarImage imageUri={image} />
          </View>
          <Section>
            <SectionHeader title='VEHICLE' />
            <SectionContent style={{flexDirection: 'column'}}>
              <View>
                <View style={styles.row}>
                  <View style={{flex: 1}}>
                    <Detail
                      label='Car Maker'
                      text={manufacturer}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Detail
                      label='Model'
                      text={model}
                    />
                  </View>
                </View>
                <View style={[styles.row, {marginVertical: 16}]}>
                  <View style={{flex: 1}}>
                    <Detail
                      label='Color'
                      text={color}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Detail
                      label='Year'
                      text={year.toString()}
                    />
                  </View>
                </View>
                <Detail
                  label='Plate'
                  text={plate}
                />
              </View>
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title='SCHEDULE' />
            <SectionContent style={{flexDirection: 'column'}}>
              <View>
                <View style={[styles.row, {marginBottom: 16}]}>
                  <View style={{flex: 1}}>
                    <Detail
                      label='Start'
                      text='Aug 20, 11:00AM'
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Detail
                      label='End'
                      text='Aug 20, 11:00PM'
                    />
                  </View>
                </View>
                <Detail
                  label='Total'
                  text='12 hours'
                />
              </View>
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title='PICKUP' />
            <SectionContent style={{flexDirection: 'column'}}>
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
            <SectionHeader title='RETURN' />
            <SectionContent style={{flexDirection: 'column'}}>
              <View style={styles.map}>
                <MapView
                  initialRegion={{
                    latitude: returnLat,
                    longitude: returnLon,
                    latitudeDelta: 0.0010,
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
          <Section>
            <SectionHeader title='DO YOU NEED HELP?' />
            <TouchableOpacity style={styles.linkButton} onPress={this.onHelpPress}>
              <Text style={styles.linkButtonText}>Open help center</Text>
            </TouchableOpacity>
          </Section>
          <Section style={{borderBottomWidth: 0}}>
            <SectionHeader title='RECEIPT' />
            <TouchableOpacity style={styles.linkButton} onPress={this.onSubmitReceiptPress}>
              <Text style={styles.linkButtonText}>Submit expense receipt</Text>
            </TouchableOpacity>
          </Section>
        </View>
        <Button
          containerStyle={styles.button}
          disabled={unlockDisabled}
          title='UNLOCK CARD'
          onPress={this.onUnlockPress}
        />
        <Text style={styles.lockedText}>Unlock is available 30 minutes before{'\n'} scheduled start of the ride</Text>
      </ScrollView>
    )
  }
}

BookingDetail.propTypes = {
  navigation: PropTypes.object,
  ride: PropTypes.object
}

export default BookingDetail
