import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native'

import find from 'lodash/find'
import forEach from 'lodash/forEach'
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'
import { CheckBox } from 'react-native-elements'
import {DocumentsCamera} from 'navigation/routeNames'
import { requestWriteStoragePermission } from 'helpers/permission'
import { icons } from 'images'
import { colors } from 'theme'
import { Button, Section, SectionHeader, SectionContent } from 'components/ui'
import styles from './styles'
import {APP_CONFIG} from './config'
// import ImagePicker from 'react-native-image-picker'

// var options = {
//   cancelButtonTitle: 'Cancel',
//   title: 'License Photo',
//   // customButtons: [
//   //   {name: 'fb', title: 'Choose Photo from Facebook'}
//   // ],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images'
//   },
//   noData: true
// }
class RideshareModal extends Component {
  constructor (props) {
    super(props)
    let other = this.props.other.join(',')
    let main = {}
    this.props.main.forEach(app => { main[app] = true })
    console.log(main, other)
    this.state = {
      main,
      otherSelected: other.length > 0,
      other,
      wasChanged: false
    }
  }

  checkApp = (id) => {
    if (id === 'other') {
      this.setState((state) => ({
        otherSelected: !state.otherSelected,
        other: state.otherSelected ? '' : state.other,
        wasChanged: true
      }))
    } else {
      this.setState((state) => ({
        main: {...state.main, [id]: !state.main[id]},
        wasChanged: true
      }))
    }
  }

  onEditOtherApps = (value) => {
    this.setState({other: value, wasChanged: true})
  }
  onConfirm = () => {
    let {main, other} = this.state
    let mainArray = []
    forEach(main, (value, key) => {
      if (value === true) mainArray.push(key)
    })
    let re = /\s*,\s*/
    this.props.onConfirm({main: mainArray, other: other.length > 0 ? other.split(re).filter(String) : []})
  }

  renderApps = () => {
    return APP_CONFIG.map(app => {
      let checked = app.id === 'other' ? this.state.otherSelected : this.state.main[app.id]
      return (
        <TouchableOpacity key={app.id} style={styles.checkboxContainer} onPress={() => this.checkApp(app.id)}>
          <CheckBox
            checked={checked}
            checkedColor={colors.red}
            checkedIcon='ios-checkbox'
            containerStyle={styles.checkbox}
            iconType='ionicon'
            textStyle={styles.checkboxTitle}
            uncheckedIcon='md-square-outline'
            onPress={() => this.checkApp(app.id)}
          />
          <Text style={styles.checkboxTitle}>{app.title}</Text>
        </TouchableOpacity>
      )
    })
  }

  render () {
    const {isVisible, onCancel} = this.props
    const { main, other, otherSelected, wasChanged } = this.state
    let mainAppSelected = find(main, (value, key) => value === true)
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
            <Text style={styles.modalTitle}>Rideshare apps</Text>
            <Text style={styles.screenTitle}>Select apps you’re{'\n'} approved to work for:</Text>
            <View>
              {this.renderApps()}
            </View>
            {
              otherSelected && <View>
                <TextInput
                  editable={this.state.otherSelected}
                  style={styles.appsInput}
                  underlineColorAndroid='transparent'
                  value={this.state.other}
                  onChangeText={this.onEditOtherApps}
                />
                <Text style={[styles.screenTitle, {alignSelf: 'flex-start'}]}>Separate apps by comma to add more</Text>
              </View>

            }
          </View>
          <View style={styles.footerButtons}>
            <Button
              containerStyle={styles.modalCancelButton}
              textStyle={styles.modalCancelButtonText}
              title='CANCEL'
              onPress={onCancel} />
            <Button
              containerStyle={styles.modalConfirmButton}
              disabled={!confirmActive}
              title='CONFIRM'
              onPress={this.onConfirm} />
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

const LicenseImage = ({onPress, licenseImageUri}) => {
  let image = ''
  if (licenseImageUri) image = {uri: licenseImageUri}
  return (
    <TouchableOpacity style={styles.photoContainer} onPress={onPress}>
      {
        licenseImageUri
          ? (
            <Image source={image} style={styles.licenseImage} />
          ) : (
            <Image source={icons['camera']} style={styles.iconCamera} />
          )
      }
    </TouchableOpacity>
  )
}

LicenseImage.propTypes = {
  licenseImageUri: PropTypes.string,
  onPress: PropTypes.func
}

class Documentation extends Component {
  constructor (props) {
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

  onSubmit = () => {
    // const {onSignUp, apps, licences, credentials, personalInfo} = this.props
    // onSignUp({licences, apps, credentials, personalInfo})
  }

  onApprove = () => {
    this.setState({showAppsModal: true})
  }
  onDisapprove = () => {
    this.setState({ridesharingApproved: false})
  }

  onPhotoPress = async (licenseSide, licenseType) => {
    let granted = await requestWriteStoragePermission()
    if (granted) {
      const {onSelectLicense, navigation} = this.props
      onSelectLicense({type: licenseType, side: licenseSide.toLowerCase()})
      // ImagePicker.showImagePicker(options, (response) => {
      //   console.log('Response = ', response)
      //   this.pickerIsOpened = false
      //   if (response.didCancel) {
      //     // this.props.navigation.goBack()
      //   } else {
      //     this.props.onUpdateLicense({
      //       type: licenseType,
      //       side: licenseSide.toLowerCase(),
      //       imageUri: response.uri
      //     })
      //     // this.props.navigation.navigate(PicturePreview, {
      //     //   photoUri: response.uri
      //     // })
      //   }
      // })
      navigation.navigate(DocumentsCamera, {
        title: licenseSide
      })
    }
  }
  onShowAppModal = () => {
    this.setState({showAppsModal: true})
  }

  onHideAppModal = () => {
    this.modalRenderKey += 1
    this.setState({showAppsModal: false})
  }

  onSaveApps = ({main, other}) => {
    this.modalRenderKey += 1
    let ridesharingApproved = null
    if (main.length > 0 || other.length > 0) ridesharingApproved = true
    this.setState({showAppsModal: false, ridesharingApproved})
    this.props.onUpdatedRideshareApps({main, other})
  }

  onDisabledPress = () => {
    const {ridesharingApproved} = this.state
    if (ridesharingApproved === false) {
      Alert.alert('', 'You have to be approved to work for Ridesharing apps.')
    }
  }

  renderAppsModal = () => {
    const {showAppsModal} = this.state
    const {apps} = this.props
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

  render () {
    const {ridesharingApproved} = this.state
    const {apps} = this.props
    const {tlc, driving} = this.props.licences
    let appsCount = apps.main.length + apps.other.length

    let submitActive = tlc.front && tlc.back && driving.front && driving.back && appsCount > 0 && ridesharingApproved
    return (
      <ScrollView contentContainerStyle={styles.container} style={{flex: 1}}>
        <Text style={styles.screenTitle}>Upload following documents to get your account approved</Text>
        <Section>
          <SectionHeader title='DRIVING LICENSE' />
          <SectionContent>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Front</Text>
              <LicenseImage
                licenseImageUri={driving.front}
                onPress={() => this.onPhotoPress('Front', 'driving')}
              />
            </View>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Back</Text>
              <LicenseImage
                licenseImageUri={driving.back}
                onPress={() => this.onPhotoPress('Back', 'driving')}
              />
            </View>
          </SectionContent>
        </Section>
        <Section>
          <SectionHeader title='TLC LICENSE' />
          <SectionContent>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Front</Text>
              <LicenseImage
                licenseImageUri={tlc.front}
                onPress={() => this.onPhotoPress('Front', 'tlc')}
              />
            </View>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Back</Text>
              <LicenseImage
                licenseImageUri={tlc.back}
                onPress={() => this.onPhotoPress('Back', 'tlc')}
              />
            </View>
          </SectionContent>
        </Section>
        <Section>
          <SectionHeader title='RIDESHARE APPS' />
          <SectionContent style={{flexDirection: 'column'}}>
            <Text style={styles.bigQuestion}>Are you approved to work for any Ridesharing apps?</Text>
            <TouchableOpacity style={styles.checkboxContainer} onPress={this.onApprove}>
              <CheckBox
                checked={ridesharingApproved}
                checkedColor={colors.red}
                checkedIcon='check-circle'
                containerStyle={styles.checkbox}
                style={{backgroundColor: 'yellow'}}
                textStyle={styles.checkboxTitle}
                title=''
                uncheckedIcon='circle-o'
                onPress={this.onApprove}
              />
              <Text style={styles.checkboxTitle}>Yes, I’m approved</Text>
            </TouchableOpacity>
            {
              ridesharingApproved && (
                <Text style={styles.checkboxSubText}>
                  {appsCount} apps selected.
                  <Text
                    style={styles.changeAppButton}
                    onPress={this.onShowAppModal}
                  > Change
                  </Text>
                </Text>
              )
            }
            <TouchableOpacity style={styles.checkboxContainer} onPress={this.onDisapprove}>
              <CheckBox
                checked={ridesharingApproved === false}
                checkedColor={colors.red}
                checkedIcon='check-circle'
                containerStyle={styles.checkbox}
                textStyle={styles.checkboxTitle}
                title=''
                uncheckedIcon='circle-o'
                onPress={this.onDisapprove}
              />
              <Text style={styles.checkboxTitle}>No, I’m not approved</Text>
            </TouchableOpacity>
          </SectionContent>
        </Section>
        <View style={styles.footer}>
          <Button
            containerStyle={styles.button}
            disabled={!submitActive}
            title='SUBMIT DOCUMENTS'
            onDisabledPress={this.onDisabledPress}
            onPress={this.onSubmit}
          />
        </View>
        {this.renderAppsModal()}
      </ScrollView>
    )
  }
}

Documentation.propTypes = {
  apps: PropTypes.object,
  credentials: PropTypes.object,
  licences: PropTypes.object,
  navigation: PropTypes.object,
  personalInfo: PropTypes.object,
  onSelectLicense: PropTypes.func,
  onSignUp: PropTypes.func,
  onUpdateLicense: PropTypes.func,
  onUpdatedRideshareApps: PropTypes.func
}

export default Documentation
