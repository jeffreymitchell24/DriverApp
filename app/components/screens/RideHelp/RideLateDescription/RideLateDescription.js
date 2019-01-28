import React, { PureComponent } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInputView } from 'components/blocks'
import { HelpCamera, HelpCenter } from 'navigation/routeNames'
import { requestMainPermissions } from 'helpers/permission'
import {
  Photo,
  Button,
  SectionHeader,
  HelpCenterSection,
  RadioButton
} from 'components/ui'
import { Spinner } from 'components/ui'
import ImagePicker from 'react-native-image-picker'
import { colors, metrics } from 'theme'

const validationSchema = Yup.object().shape({
  reason: Yup.string()
    .trim()
    .required('This field is required.')
})

let androidOptions = {
  cancelButtonTitle: 'Cancel',
  title: 'License Photo',
  mediaType: 'photo',
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
  quality: 0.5,
  storageOptions: {
    skipBackup: true,
    cameraRoll: true,
    waitUntilSaved: true
    // path: 'images'
  }
}

class RideLateDescription extends PureComponent {
  state = {
    delay: null
  }

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
    this.props.onResetPhotos('rideLatePhotos')
  }

  onPhotoPress = async () => {
    let granted = await requestMainPermissions(true)

    if (granted) {
      const { onSavePhoto } = this.props
      // onSelectPhoto({ type: 'rideLatePhotos', index: 0 })

      // navigation.navigate(HelpCamera)

      ImagePicker.showImagePicker(
        Platform.OS === 'android' ? androidOptions : iosOptions,
        response => {
          if (!response.didCancel || response.error) {
            onSavePhoto({
              type: 'rideLatePhotos',
              index: 0,
              photoUri: response.uri
            })
          }
        }
      )
    }
  }

  onSubmit = values => {
    const { reason } = values
    const { onSubmitReport, ride = {}, photos, notification } = this.props

    onSubmitReport({
      data: { photos, reason, delay: this.state.delay },
      carId: ride.id,
      notificationId: notification.id
    })
  }

  renderForm = ({
    setFieldTouched,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched
  }) => {
    const { reason } = values
    let buttonActive = !!(isEmpty(errors) && reason && this.state.delay)

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'always'}
      >
        <View style={styles.form}>
          <View style={styles.delayContainer}>
            <SectionHeader title={'Delaying'} />

            <View>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => this.setState({ delay: 15 })}
              >
                <RadioButton
                  checked={this.state.delay === 15}
                  checkedIcon={'md-radio-button-on'}
                  onPress={() => this.setState({ delay: 15 })}
                />

                <Text style={styles.checkboxTitle}>{'15 minutes'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => this.setState({ delay: 30 })}
              >
                <RadioButton
                  checked={this.state.delay === 30}
                  checkedIcon={'md-radio-button-on'}
                  onPress={() => this.setState({ delay: 30 })}
                />

                <Text style={styles.checkboxTitle}>{'30 minutes'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => this.setState({ delay: 45 })}
              >
                <RadioButton
                  checked={this.state.delay === 45}
                  checkedIcon={'md-radio-button-on'}
                  onPress={() => this.setState({ delay: 45 })}
                />

                <Text style={styles.checkboxTitle}>{'45 minutes'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => this.setState({ delay: 60 })}
              >
                <RadioButton
                  checked={this.state.delay === 60}
                  checkedIcon={'md-radio-button-on'}
                  onPress={() => this.setState({ delay: 60 })}
                />

                <Text style={styles.checkboxTitle}>{'1 hour'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.photoUploadContainer}>
            <SectionHeader title={'Upload photo'} />

            <View style={styles.photoContainer}>
              <Photo
                imageUri={this.props.photos[0]}
                onPress={this.onPhotoPress}
              />
            </View>
          </View>

          <TextInputView
            blurOnSubmit
            error={touched.reason && errors.reason}
            keyboardType={'default'}
            label={'Reason'}
            maxLength={1000}
            multiline
            name={'reason'}
            placeholder={'Why are you late?'}
            showLimit
            value={reason}
            onBlur={() => setFieldTouched('reason')}
            onChangeText={handleChange('reason')}
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
          initialValues={{ reason: '' }}
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

RideLateDescription.propTypes = {
  error: PropTypes.string,
  navigation: PropTypes.object,
  notification: PropTypes.object,
  photos: PropTypes.array,
  requestPending: PropTypes.bool,
  ride: PropTypes.object,
  onResetPhotos: PropTypes.func,
  onSavePhoto: PropTypes.func,
  onSelectPhoto: PropTypes.func,
  onSubmitReport: PropTypes.func
}

export default RideLateDescription

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between'
  },

  form: {
    paddingTop: metrics.contentMarginSmall
  },

  textInput: {
    marginBottom: 0
  },

  photoUploadContainer: {
    paddingTop: metrics.contentMargin,
    paddingBottom: metrics.contentMargin
  },
  photoContainer: {
    marginTop: metrics.contentMarginSmall
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16
  },
  checkboxTitle: {
    fontSize: metrics.fontSizeBig,
    fontFamily: 'SFProText-Regular',
    color: colors.black
  }
})
