import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Photo, Button, SectionHeader, Section, SectionContent } from 'components/ui'
import styles from './styles'

class RideEnd extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onConfirmPress = () => {
    // this.props.navigation.navigate()
  }

  onCarPhotoPress = () => {

  }

  render () {
    let buttonActive = false
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        // keyboardShouldPersistTaps='always'
      >
        <View>
          <Section>
            <SectionHeader style={styles.sectionHeader} title='Car is not damaged' />
            <SectionContent style={styles.photoList}>
              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>Front</Text>
                <Photo
                  // imageUri={driving.front}
                  onPress={() => this.onPhotoPress('Front', 'driving')}
                />
              </View>
              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>Back</Text>
                <Photo
                  // imageUri={driving.back}
                  onPress={() => this.onPhotoPress('Back', 'driving')}
                />
              </View>
              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>Right side</Text>
                <Photo
                  // imageUri={driving.front}
                  onPress={() => this.onPhotoPress('Front', 'driving')}
                />
              </View>
              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>Left side</Text>
                <Photo
                  // mageUri={driving.back}
                  onPress={() => this.onPhotoPress('Back', 'driving')}
                />
              </View>
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader style={styles.sectionHeader} title='Gas tank is full' />
            <SectionContent>
              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>Gas tank indicator</Text>
                <Photo
                  // imageUri={driving.front}
                  onPress={() => this.onPhotoPress('Front', 'driving')}
                />
              </View>
            </SectionContent>
          </Section>

        </View>
        <Button
          disabled={!buttonActive}
          title='CONFIRM'
          onPress={this.onConfirmPress}
        />
      </ScrollView>
    )
  }
}

RideEnd.propTypes = {
  navigation: PropTypes.object,
  photos: PropTypes.array
}

export default RideEnd
