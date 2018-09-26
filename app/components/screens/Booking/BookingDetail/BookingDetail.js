import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { BookingDetail as Detail, CarImage } from 'components/blocks'
import { Button, Section, SectionHeader, SectionContent } from 'components/ui'
import styles from './styles'

export default class BookingDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onUnlockPress = () => {

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
              <View style={styles.map} />
              <Text style={styles.address}>Bronx Car Flow Parking Zone</Text>
              <Text style={styles.address}>34th Street 25</Text>
              <TouchableOpacity>
                <Text style={styles.mapButtonText}>Open in Maps</Text>
              </TouchableOpacity>
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title='RETURN' />
            <SectionContent style={{flexDirection: 'column'}}>
              <View style={styles.map} />
              <Text style={styles.address}>Bronx Car Flow Parking Zone</Text>
              <Text style={styles.address}>34th Street 25</Text>
              <TouchableOpacity>
                <Text style={styles.mapButtonText}>Open in Maps</Text>
              </TouchableOpacity>
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title='DO YOU NEED HELP?' />
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkButtonText}>Open help center</Text>
            </TouchableOpacity>
          </Section>
          <Section style={{borderBottomWidth: 0}}>
            <SectionHeader title='RECEIPT' />
            <TouchableOpacity style={styles.linkButton}>
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
