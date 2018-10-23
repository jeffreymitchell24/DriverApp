import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { requestMainPermissions } from 'helpers/permission'
import { TextInputView } from 'components/blocks'
import { ReceiptCamera } from 'navigation/routeNames'
import { Photo, Button, SectionHeader, Section, SectionContent } from 'components/ui'
import styles from './styles'

class RideEnd extends Component {
  isHiddenNotes = true
  constructor (props) {
    super(props)
    this.state = {
      showPlusButton: true
    }
  }

  toggleNotes = () => {
    this.setState((state) => ({showPlusButton: !state.showPlusButton}))
  }

  onConfirmPress = () => {
    this.props.onEndRide()
    // this.props.navigation.navigate()
  }

  onPhotoPress = async (type, index) => {
    let granted = await requestMainPermissions(true)
    if (granted) {
      const {onSelectPhoto, navigation} = this.props
      onSelectPhoto({type, index})

      navigation.navigate(ReceiptCamera)
    }
  }

  render () {
    const {gasTankPhotos, carPhotos} = this.props
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
                  imageUri={carPhotos[0]}
                  onPress={() => this.onPhotoPress('carPhotos', 0)}
                />
              </View>
              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>Back</Text>
                <Photo
                  imageUri={carPhotos[1]}
                  onPress={() => this.onPhotoPress('carPhotos', 1)}
                />
              </View>
              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>Right side</Text>
                <Photo
                  imageUri={carPhotos[2]}
                  onPress={() => this.onPhotoPress('carPhotos', 2)}
                />
              </View>
              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>Left side</Text>
                <Photo
                  imageUri={carPhotos[3]}
                  onPress={() => this.onPhotoPress('carPhotos', 3)}
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
                  imageUri={gasTankPhotos[0]}
                  onPress={() => this.onPhotoPress('gasTankPhotos', 0)}
                />
              </View>
            </SectionContent>
          </Section>
          <View style={{marginTop: 16}}>
            {
              this.state.showPlusButton
                ? (
                  <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={this.toggleNotes}>
                    <Text style={styles.additionalButtonText}>+ Additional</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={[styles.additionalInputContainer]}>
                    <TextInputView
                      containerStyle={{marginBottom: 0}}
                      keyboardType='default'
                      label='Notes'
                      name='notes'
                      placeholder='Add notes'
                      value={''}
                    />
                    <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={styles.closeButton} onPress={this.toggleNotes}>
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                )
            }
          </View>
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
  carPhotos: PropTypes.array,
  gasTankPhotos: PropTypes.array,
  navigation: PropTypes.object,
  onEndRide: PropTypes.func
}

export default RideEnd
