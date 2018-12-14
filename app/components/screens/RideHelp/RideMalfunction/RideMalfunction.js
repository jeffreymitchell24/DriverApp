import React, { Component } from 'react'
import { View, ScrollView, Alert, Platform } from 'react-native'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import isEmpty from 'lodash/isEmpty'
import { requestMainPermissions } from 'helpers/permission'
import { TextInputView } from 'components/blocks'
import { HelpCamera, HelpCenter } from 'navigation/routeNames'
import { Photo, Button, SectionHeader, HelpCenterSection } from 'components/ui'
import { Formik } from 'formik'
import { Spinner } from 'components/ui'
import { colors } from 'theme'
import ImagePicker from 'react-native-image-picker'
import styles from './styles'

const validationSchema = Yup.object().shape({
  plate: Yup.string()
    .trim()
    .required('This field is required.'),
  description: Yup.string()
    .trim()
    .required('This field is required.')
})

let androidOptions = {
  cancelButtonTitle: 'Cancel',
  title: 'License Photo',
  mediaType: 'photo',
  quality: 0.6,
  maxHeight: 800,
  storageOptions: {
    skipBackup: true,
    cameraRoll: true
    // path: 'images'
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
    // path: 'images'
  }
}

class RideMalfunction extends Component {
  inputRefs = {}

  componentDidUpdate(prevProps) {
    const { error, requestPending, navigation } = this.props
    if (prevProps.requestPending && !requestPending) {
      if (error) setTimeout(() => Alert.alert('Error', error), 200)
      else navigation.navigate(HelpCenter)
    }
  }
  componentWillUnmount() {
    this.props.onResetPhotos('rideMalfunctionPhotos')
  }
  onSubmit = values => {
    const { plate, description } = values
    const { onSubmitReport, ride = {}, photos } = this.props
    onSubmitReport({ data: { photos, plate, description }, carId: ride.id })
  }

  onPhotoPress = async index => {
    let granted = await requestMainPermissions(true)
    if (granted) {
      const { onSavePhoto } = this.props
      // onSelectPhoto({ type: 'rideMalfunctionPhotos', index })

      // navigation.navigate(HelpCamera)
      ImagePicker.showImagePicker(
        Platform.OS === 'android' ? androidOptions : iosOptions,
        response => {
          onSavePhoto({
            type: 'rideMalfunctionPhotos',
            index,
            photoUri: response.uri
          })
        }
      )
    }
  }

  renderForm = ({
    setFieldTouched,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched
  }) => {
    let buttonActive = isEmpty(errors) && touched.plate && touched.description && this.props.photos.length === 4 && !this.props.photos.includes(undefined)
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        // keyboardShouldPersistTaps='always'
      >
        <View style={styles.form}>
          <TextInputView
            // blurOnSubmit={false}
            containerStyle={styles.textInput}
            error={touched.plate && errors.plate}
            keyboardType="default"
            label="License plate"
            name="plate"
            placeholder="e.g. FYT 1274"
            returnKeyType={'next'}
            value={values.plate}
            onBlur={() => setFieldTouched('plate')}
            onChangeText={handleChange('plate')}
            onSubmitEditing={() => this.inputRefs['description'].focus()}
            // returnKeyType={'next'}
            // value={values.email.trim()}
            // onBlur={() => setFieldTouched('email')}
            // onChangeText={handleChange('email')}
          />
          <View style={styles.photoListContainer}>
            <SectionHeader title="Upload photo (mandatory)" />
            <View style={styles.photoList}>
              <View style={styles.photoContainer}>
                <Photo
                  imageUri={this.props.photos[0]}
                  onPress={() => this.onPhotoPress(0)}
                />
              </View>
              <View style={styles.photoContainer}>
                <Photo
                  imageUri={this.props.photos[1]}
                  onPress={() => this.onPhotoPress(1)}
                />
              </View>
              <View style={styles.photoContainer}>
                <Photo
                  imageUri={this.props.photos[2]}
                  onPress={() => this.onPhotoPress(2)}
                />
              </View>
              <View style={styles.photoContainer}>
                <Photo
                  imageUri={this.props.photos[3]}
                  onPress={() => this.onPhotoPress(3)}
                />
              </View>
            </View>
          </View>
          <TextInputView
            blurOnSubmit
            error={touched.description && errors.description}
            inputRef={input => {
              this.inputRefs['description'] = input
            }}
            keyboardType="default"
            label="Description"
            maxLength={1000}
            multiline
            name="description"
            placeholder="What’s wrong with the car?"
            showLimit
            value={values.description}
            onBlur={() => setFieldTouched('description')}
            onChangeText={handleChange('description')}
          />
        </View>
        <Button
          // containerStyle={styles.nextButton}
          disabled={!buttonActive}
          title="SUBMIT REPORT"
          onPress={handleSubmit}
        />
      </ScrollView>
    )
  }

  render() {
    console.log(this.props.photos)
    return (
      <HelpCenterSection>
        <Formik
          initialValues={{ plate: '', description: '' }}
          ref={node => (this.formik = node)}
          render={this.renderForm}
          validateOnBlur
          // validateOnChange
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        />
        <Spinner color={colors.red} visible={this.props.requestPending} />
      </HelpCenterSection>
    )
  }
}

RideMalfunction.propTypes = {
  error: PropTypes.string,
  navigation: PropTypes.object,
  photos: PropTypes.array,
  requestPending: PropTypes.bool,
  ride: PropTypes.object,
  onResetPhotos: PropTypes.func,
  onSavePhoto: PropTypes.func,
  onSelectPhoto: PropTypes.func,
  onSubmitReport: PropTypes.func
}

export default RideMalfunction
