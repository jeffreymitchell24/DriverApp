import React, { Component } from 'react'
import { View, ScrollView, Alert, Platform, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { TextInputView } from 'components/blocks'
import * as Yup from 'yup'
import { requestMainPermissions } from 'helpers/permission'
import {
  Photo,
  Button,
  SectionHeader,
  HelpCenterSection,
  Spinner
} from 'components/ui'
import { HelpCenter } from 'navigation/routeNames'
import { Formik } from 'formik'
import ImagePicker from 'react-native-image-picker'
import { colors, metrics } from 'theme'

const validationSchema = Yup.object().shape({
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

class RideDamaged extends Component {
  inputRefs = {}

  componentDidUpdate(prevProps) {
    const { error, requestPending, navigation } = this.props

    if (prevProps.requestPending && !requestPending) {
      if (error) {
        setTimeout(() => Alert.alert('Error', error), 200)
      } else {
        navigation.navigate(HelpCenter)
      }
    }
  }

  componentWillUnmount() {
    this.props.onResetPhotos('rideDamagedPhotos')
  }

  onSubmit = values => {
    const { description } = values
    const { onSubmitReport, ride = {}, photos } = this.props

    onSubmitReport({ data: { photos, description }, carId: ride.id })
  }

  onPhotoPress = async index => {
    let granted = await requestMainPermissions(true)

    if (granted) {
      const { onSavePhoto } = this.props

      ImagePicker.showImagePicker(
        Platform.OS === 'android' ? androidOptions : iosOptions,
        response => {
          if (!response.didCancel && !response.error) {
            onSavePhoto({
              type: 'rideDamagedPhotos',
              index,
              photoUri: response.uri
            })
          }
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
    let buttonActive =
      isEmpty(errors) &&
      values.description &&
      this.props.photos.length === 4 &&
      !this.props.photos.includes(undefined)

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <View style={styles.photoListContainer}>
            <SectionHeader title={'Upload photo (mandatory)'} />

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
            keyboardType={'default'}
            label={'Description'}
            maxLength={1000}
            multiline
            name={'description'}
            placeholder={'What’s wrong with the car?'}
            showLimit
            value={values.description}
            onBlur={() => setFieldTouched('description')}
            onChangeText={handleChange('description')}
          />
        </View>

        <Button
          disabled={!buttonActive}
          title={'SUBMIT REPORT'}
          onPress={handleSubmit}
        />
      </ScrollView>
    )
  }

  render() {
    return (
      <HelpCenterSection>
        <Formik
          initialValues={{ description: '' }}
          ref={node => (this.formik = node)}
          render={this.renderForm}
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        />

        <Spinner color={colors.red} visible={this.props.requestPending} />
      </HelpCenterSection>
    )
  }
}

RideDamaged.propTypes = {
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

export default RideDamaged

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between'
  },

  form: {},

  textInput: {
    marginBottom: 0
  },

  photoListContainer: {
    paddingTop: metrics.contentMargin,
    paddingBottom: metrics.contentMarginSmall
  },

  photoList: {
    paddingTop: metrics.contentMarginSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  photoContainer: {
    marginBottom: 8
  }
})
