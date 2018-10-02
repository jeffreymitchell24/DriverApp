import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { BookingDetail as Detail, CarImage } from 'components/blocks'
import { CarLocation, RideHelp, ReceiptSubmit } from 'navigation/routeNames'
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

  }

  onHelpPress = () => {
    this.props.navigation.navigate(RideHelp)
  }
  onMapPress = () => {
    this.props.navigation.navigate(CarLocation)
  }

  render () {
    let unlockDisabled = true
    return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View>
          <View style={styles.carImageContainer}>
            <CarImage />
          </View>
          <Section>
            <SectionHeader title='VEHICLE' />
            <SectionContent style={{flexDirection: 'column'}}>
              <View>
                <View style={styles.row}>
                  <View style={{flex: 1}}>
                    <Detail
                      label='Car Make'
                      text='Toyota'
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Detail
                      label='Model'
                      text='Prius'
                    />
                  </View>
                </View>
                <View style={[styles.row, {marginVertical: 16}]}>
                  <View style={{flex: 1}}>
                    <Detail
                      label='Color'
                      text='White'
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Detail
                      label='Year'
                      text='2016'
                    />
                  </View>
                </View>
                <Detail
                  label='Plate'
                  text='FRY 2178'
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
                    latitude: 37.782189,
                    longitude: -122.451182,
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
                      latitude: 37.782189,
                      longitude: -122.451182
                    }}
                  />
                </MapView>
              </View>
              <Text style={styles.address}>Bronx Car Flow Parking Zone</Text>
              <Text style={styles.address}>34th Street 25</Text>
              <TouchableOpacity onPress={this.onMapPress}>
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
                    latitude: 37.782189,
                    longitude: -122.451182,
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
                      latitude: 37.782189,
                      longitude: -122.451182
                    }}
                  />
                </MapView>
              </View>
              <Text style={styles.address}>Bronx Car Flow Parking Zone</Text>
              <Text style={styles.address}>34th Street 25</Text>
              <TouchableOpacity onPress={this.onMapPress}>
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
  navigation: PropTypes.object
}

export default BookingDetail
