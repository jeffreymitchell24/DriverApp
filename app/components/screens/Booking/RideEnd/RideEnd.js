import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import { requestMainPermissions } from 'helpers/permission'
import { TextInputView } from 'components/blocks'
import { BookingDetail } from 'navigation/routeNames'
import ImagePicker from 'react-native-image-picker'
import _ from 'lodash'
import {
  Photo,
  Button,
  SectionHeader,
  Section,
  SectionContent,
  Spinner
} from 'components/ui'
import { colors } from 'theme'
import styles from './styles'

let androidOptions = {
  cancelButtonTitle: 'Cancel',
  title: 'License Photo',
  mediaType: 'photo',
  quality: 0.6,
  maxHeight: 800,
  maxWidth: 800,
  storageOptions: {
    skipBackup: true,
    cameraRoll: true
  },
  noData: true
}

let iosOptions = {
  cancelButtonTitle: 'Cancel',
  title: 'License Photo',
  mediaType: 'photo',
  noData: true,
  quality: 0.6,
  maxHeight: 800,
  maxWidth: 800,
  storageOptions: {
    skipBackup: true,
    cameraRoll: true,
    waitUntilSaved: true
  }
}

class RideEnd extends Component {
  isHiddenNotes = true

  static navigationOptions = ({ navigation }) => {
    const isEnd = navigation.getParam('isEnd', true)

    const title = isEnd ? 'End your ride' : 'Start your ride'

    return {
      title
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      showPlusButton: true,
      notes: ''
    }

    this._photoLoading = false
  }

  componentDidUpdate(prevProps) {
    const { error, requestPending, navigation } = this.props

    if (prevProps.requestPending && !requestPending) {
      if (error) {
        setTimeout(() => Alert.alert('Error', error), 200)
      } else {
        navigation.navigate(BookingDetail)
      }
    }
  }

  componentDidMount() {
    this.setState({
      isEndRide: this.props.navigation.getParam('isEnd', true)
    })
  }

  componentWillUnmount() {
    this.props.onClearReceiptPhoto()
  }

  onEditNotes = value => {
    this.setState({ notes: value })
  }

  toggleNotes = () => {
    this.setState(state => ({ showPlusButton: !state.showPlusButton }))
  }

  onConfirmPress = () => {
    const {
      gasTankPhotos,
      carPhotos,
      ride = {},
      mileagePhotos,
      onUnlockRide
    } = this.props
    const { notes, isEndRide } = this.state

    if (isEndRide) {
      this.props.onEndRide({
        carId: ride.id,
        data: { carPhotos, gasTankPhotos, notes, mileagePhotos }
      })
    } else {
      onUnlockRide({
        carId: ride.id,
        data: { carPhotos, gasTankPhotos, notes, mileagePhotos }
      })

      this.props.navigation.goBack()
    }
  }

  onPhotoPress = async (type, index) => {
    if (this._photoLoading) {
      return
    }

    let granted = await requestMainPermissions(true)

    if (granted) {
      const { onPhotoSave } = this.props

      const getResponseFunction = (indexCopy, typeCopy) => response => {
        this._photoLoading = false

        if (!response.didCancel || response.error) {
          onPhotoSave({
            type: typeCopy,
            index: indexCopy,
            photoUri: response.uri
          })
        }
      }

      this._photoLoading = true
      ImagePicker.launchCamera(
        Platform.OS === 'android' ? androidOptions : iosOptions,
        getResponseFunction(index, type)
      )
    }
  }

  isButtonActive = () => {
    const { gasTankPhotos, carPhotos, mileagePhotos } = this.props
    return _.every(
      [...carPhotos, gasTankPhotos[0], mileagePhotos[0]],
      item => !!item
    )
  }

  render() {
    const { gasTankPhotos, carPhotos, mileagePhotos } = this.props
    let buttonActive = this.isButtonActive()

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            marginBottom: 30
          }}
        >
          <Section>
            <SectionHeader
              style={styles.sectionHeader}
              title={'Car is not damaged'}
            />

            <SectionContent style={styles.photoList}>
              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>{'Front'}</Text>

                <Photo
                  imageUri={carPhotos[0]}
                  onPress={() => this.onPhotoPress('carPhotos', 0)}
                />
              </View>

              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>{'Back'}</Text>

                <Photo
                  imageUri={carPhotos[1]}
                  onPress={() => this.onPhotoPress('carPhotos', 1)}
                />
              </View>

              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>{'Right side'}</Text>

                <Photo
                  imageUri={carPhotos[2]}
                  onPress={() => this.onPhotoPress('carPhotos', 2)}
                />
              </View>

              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>{'Left side'}</Text>

                <Photo
                  imageUri={carPhotos[3]}
                  onPress={() => this.onPhotoPress('carPhotos', 3)}
                />
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
                  imageUri={gasTankPhotos[0]}
                  onPress={() => this.onPhotoPress('gasTankPhotos', 0)}
                />
              </View>
            </SectionContent>
          </Section>

          <Section>
            <SectionHeader style={styles.sectionHeader} title={'Mileage'} />

            <SectionContent>
              <View style={styles.photoBlock}>
                <Text style={styles.photoLabel}>{'Mileage indicator'}</Text>

                <Photo
                  imageUri={mileagePhotos[0]}
                  onPress={() => this.onPhotoPress('mileagePhotos', 0)}
                />
              </View>
            </SectionContent>
          </Section>

          <View style={{ marginTop: 16 }}>
            {this.state.showPlusButton ? (
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={this.toggleNotes}
              >
                <Text style={styles.additionalButtonText}>
                  {'+ Additional'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={[styles.additionalInputContainer]}>
                <TextInputView
                  containerStyle={{ marginBottom: 0 }}
                  keyboardType={'default'}
                  label={'Notes'}
                  name={'notes'}
                  placeholder={'Add notes'}
                  value={this.state.notes}
                  onChangeText={this.onEditNotes}
                />

                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  style={styles.closeButton}
                  onPress={this.toggleNotes}
                >
                  <Text style={styles.closeButtonText}>{'Close'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Button
          disabled={!buttonActive}
          title={'CONFIRM'}
          onPress={this.onConfirmPress}
        />

        <Spinner color={colors.red} visible={this.props.requestPending} />
      </ScrollView>
    )
  }
}

RideEnd.propTypes = {
  carPhotos: PropTypes.array,
  error: PropTypes.string,
  gasTankPhotos: PropTypes.array,
  mileagePhotos: PropTypes.array,
  navigation: PropTypes.object,
  requestPending: PropTypes.bool,
  ride: PropTypes.object,
  onClearReceiptPhoto: PropTypes.func,
  onEndRide: PropTypes.func,
  onUnlockRide: PropTypes.func,
  onPhotoSave: PropTypes.func
}

export default RideEnd
