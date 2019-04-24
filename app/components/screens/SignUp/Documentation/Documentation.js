import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

import forEach from 'lodash/forEach'
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'
import { CheckBox } from 'react-native-elements'
import { RegisterReview } from 'navigation/routeNames'
import { requestMainPermissions } from 'helpers/permission'
import { colors } from 'theme'
import {
  Button,
  Section,
  SectionHeader,
  SectionContent,
  Photo,
  RadioButton,
  Spinner
} from 'components/ui'
import styles from './styles'
import { APP_CONFIG } from './config'

let androidOptions = {
  cancelButtonTitle: 'Cancel',
  title: 'License Photo',
  mediaType: 'photo',
  quality: 0.6,
  maxHeight: 800,
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
  storageOptions: {
    skipBackup: true,
    cameraRoll: true,
    waitUntilSaved: true
  }
}

class RideshareModal extends Component {
  constructor(props) {
    super(props)
    let other = this.props.other.join(',')
    let main = {}
    this.props.main.forEach(app => {
      main[app] = true
    })

    this.state = {
      main,
      otherSelected: other.length > 0,
      other,
      wasChanged: false
    }
  }

  checkApp = id => {
    if (id === 'other') {
      this.setState(state => ({
        otherSelected: !state.otherSelected,
        other: state.otherSelected ? '' : state.other,
        wasChanged: true
      }))
    } else {
      this.setState(state => ({
        main: { ...state.main, [id]: !state.main[id] },
        wasChanged: true
      }))
    }
  }

  onEditOtherApps = value => {
    this.setState({ other: value, wasChanged: true })
  }

  onConfirm = () => {
    let { main, other } = this.state
    let mainArray = []

    forEach(main, (value, key) => {
      if (value === true) mainArray.push(key)
    })

    let re = /\s*,\s*/

    this.props.onConfirm({
      main: mainArray,
      other: other.length > 0 ? other.split(re).filter(String) : []
    })
  }

  renderApps = () => {
    return APP_CONFIG.map(app => {
      let checked =
        app.id === 'other' ? this.state.otherSelected : this.state.main[app.id]

      return (
        <TouchableOpacity
          key={app.id}
          style={styles.checkboxContainer}
          onPress={() => this.checkApp(app.id)}
        >
          <CheckBox
            checked={checked}
            checkedColor={colors.red}
            checkedIcon={'ios-checkbox'}
            containerStyle={styles.checkbox}
            iconType={'ionicon'}
            textStyle={styles.checkboxTitle}
            uncheckedIcon={'md-square-outline'}
            onPress={() => this.checkApp(app.id)}
          />

          <Text style={styles.checkboxTitle}>{app.title}</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { isVisible, onCancel } = this.props
    const { otherSelected, wasChanged } = this.state // main, other

    let confirmActive = wasChanged // mainAppSelected || (!!other.replace(/[, ]+/g, ' ').trim() && otherSelected)

    return (
      <Modal
        backdropOpacity={0.5}
        isVisible={isVisible}
        style={styles.modal}
        onBackButtonPress={onCancel}
        onBackdropPress={onCancel}
      >
        <ScrollView contentContainerStyle={[styles.modalDialogContainer]}>
          <View>
            <Text style={styles.modalTitle}>{'Rideshare apps'}</Text>

            <Text style={styles.screenTitle}>
              {'Select apps you’re\n approved to work for:'}
            </Text>

            <View>{this.renderApps()}</View>

            {otherSelected ? (
              <View>
                <TextInput
                  editable={this.state.otherSelected}
                  style={styles.appsInput}
                  underlineColorAndroid={'transparent'}
                  value={this.state.other}
                  onChangeText={this.onEditOtherApps}
                />

                <Text style={[styles.screenTitle, { alignSelf: 'flex-start' }]}>
                  {'Separate apps by comma to add more'}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.footerButtons}>
            <Button
              containerStyle={styles.modalCancelButton}
              textStyle={styles.modalCancelButtonText}
              title={'CANCEL'}
              onPress={onCancel}
            />

            <Button
              containerStyle={styles.modalConfirmButton}
              disabled={!confirmActive}
              title={'CONFIRM'}
              onPress={this.onConfirm}
            />
          </View>
        </ScrollView>
      </Modal>
    )
  }
}

RideshareModal.propTypes = {
  isVisible: PropTypes.bool,
  main: PropTypes.array,
  other: PropTypes.array,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
}

class Documentation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ridesharingApproved: null,
      showAppsModal: false,
      apps: {
        main: [],
        other: []
      }
    }

    this.modalRenderKey = 0
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthed && !prevProps.isAuthed) {
      this.props.navigation.navigate(RegisterReview)
    }
  }

  onSubmit = () => {
    const { onSignUp, apps, licences, credentials, personalInfo } = this.props

    onSignUp({ licences, apps, credentials, personalInfo })
  }

  onApprove = () => {
    this.setState({ showAppsModal: true })
  }

  onDisapprove = () => {
    this.props.onUpdatedRideshareApps({ main: [], other: [] })

    this.modalRenderKey += 1

    this.setState({ ridesharingApproved: false })
  }

  onPhotoPress = async (licenseSide, licenseType) => {
    let granted = await requestMainPermissions(true)

    if (granted) {
      this.showImagePicker(licenseSide, licenseType)
      // onSelectLicense({type: licenseType, side: licenseSide.toLowerCase()})

      // navigation.navigate(DocumentsCamera, {
      //   title: licenseSide
      // })
    }
  }

  showImagePicker = (licenseSide, licenseType) => {
    ImagePicker.showImagePicker(
      Platform.OS === 'android' ? androidOptions : iosOptions,
      response => {
        this.pickerIsOpened = false
        if (response.didCancel) {
          // this.props.navigation.goBack()
        } else if (response.error) {
          console.warn('camera error', response.error)
        } else {
          this.props.onUpdateLicense({
            type: licenseType,
            side: licenseSide.toLowerCase(),
            imageUri: response.uri, // Platform.OS === 'android' ? response.uri : response.origURL
            data: response
          })
          // this.props.navigation.navigate(PicturePreview, {
          //   photoUri: response.uri
          // })
        }
      }
    )
  }

  onShowAppModal = () => {
    this.setState({ showAppsModal: true })
  }

  onHideAppModal = () => {
    this.modalRenderKey += 1

    this.setState({ showAppsModal: false })
  }

  onSaveApps = ({ main, other }) => {
    this.modalRenderKey += 1
    let ridesharingApproved = null

    if (main.length > 0 || other.length > 0) {
      ridesharingApproved = true
    }

    this.setState({ showAppsModal: false, ridesharingApproved })

    this.props.onUpdatedRideshareApps({ main, other })
  }

  onDisabledPress = () => {
    const { ridesharingApproved } = this.state

    if (ridesharingApproved === false) {
      setTimeout(
        () =>
          Alert.alert(
            '',
            'You have to be approved to work for Ridesharing apps.'
          ),
        200
      )
    }
  }

  renderAppsModal = () => {
    const { showAppsModal } = this.state
    const { apps } = this.props

    return (
      <RideshareModal
        {...apps}
        isVisible={showAppsModal}
        key={this.modalRenderKey}
        onCancel={this.onHideAppModal}
        onConfirm={this.onSaveApps}
      />
    )
  }

  render() {
    const { ridesharingApproved } = this.state
    const { apps } = this.props
    const { tlc, driving } = this.props.licences
    let appsCount = apps.main.length + apps.other.length

    let submitActive =
      tlc.front &&
      tlc.back &&
      driving.front &&
      driving.back &&
      appsCount > 0 &&
      ridesharingApproved

    return (
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        <Text style={styles.screenTitle}>
          {'Upload following documents to get your account approved'}
        </Text>

        <Section>
          <SectionHeader title={'DRIVING LICENSE'} />

          <SectionContent>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>{'Front'}</Text>

              <Photo
                imageUri={driving.front && driving.front.uri}
                onPress={() => this.onPhotoPress('Front', 'driving')}
              />
            </View>

            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>{'Back'}</Text>

              <Photo
                imageUri={driving.back && driving.back.uri}
                onPress={() => this.onPhotoPress('Back', 'driving')}
              />
            </View>
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader title={'TLC LICENSE'} />

          <SectionContent>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>{'Front'}</Text>

              <Photo
                imageUri={tlc.front && tlc.front.uri}
                onPress={() => this.onPhotoPress('Front', 'tlc')}
              />
            </View>

            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>{'Back'}</Text>

              <Photo
                imageUri={tlc.back && tlc.back.uri}
                onPress={() => this.onPhotoPress('Back', 'tlc')}
              />
            </View>
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader title={'RIDESHARE APPS'} />

          <SectionContent style={{ flexDirection: 'column' }}>
            <Text style={styles.bigQuestion}>
              {'Are you approved to work for any Ridesharing apps?'}
            </Text>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={this.onApprove}
            >
              <RadioButton
                checked={ridesharingApproved}
                onPress={this.onApprove}
              />

              <Text style={styles.checkboxTitle}>{'Yes, I’m approved'}</Text>
            </TouchableOpacity>

            {ridesharingApproved ? (
              <Text style={styles.checkboxSubText}>
                {`${appsCount} apps selected.`}
                <Text
                  style={styles.changeAppButton}
                  onPress={this.onShowAppModal}
                >
                  {' '}
                  {'Change'}
                </Text>
              </Text>
            ) : null}

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={this.onDisapprove}
            >
              <RadioButton
                checked={ridesharingApproved === false}
                onPress={this.onDisapprove}
              />

              <Text style={styles.checkboxTitle}>{'No, I’m not approved'}</Text>
            </TouchableOpacity>
          </SectionContent>
        </Section>

        <View style={styles.footer}>
          <Button
            containerStyle={styles.button}
            disabled={!submitActive}
            title={'SUBMIT DOCUMENTS'}
            onDisabledPress={this.onDisabledPress}
            onPress={this.onSubmit}
          />
        </View>

        {this.renderAppsModal()}

        <Spinner color={colors.red} visible={this.props.isSignupPending} />
      </ScrollView>
    )
  }
}

Documentation.propTypes = {
  apps: PropTypes.object,
  credentials: PropTypes.object,
  isAuthed: PropTypes.bool,
  isSignupPending: PropTypes.bool,
  licences: PropTypes.object,
  navigation: PropTypes.object,
  personalInfo: PropTypes.object,
  onSelectLicense: PropTypes.func,
  onSignUp: PropTypes.func,
  onUpdateLicense: PropTypes.func,
  onUpdatedRideshareApps: PropTypes.func
}

export default Documentation
