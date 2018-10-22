import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInputView } from 'components/blocks'
import { HelpCamera, HelpCenter } from 'navigation/routeNames'
import { requestMainPermissions } from 'helpers/permission'
import { Photo, Button, SectionHeader, HelpCenterSection, RadioButton } from 'components/ui'
import Spinner from 'react-native-loading-spinner-overlay'
import { colors } from 'theme'
import styles from './styles'

const validationSchema = Yup.object().shape({
  'reason': Yup.string().trim().required('This field is required.')
})

class RideLateDescription extends PureComponent {
  state = {
    delay: null
  }
  componentDidUpdate (prevProps) {
    const {error, requestPending, navigation} = this.props
    if (prevProps.requestPending && !requestPending) {
      if (error)Alert.alert('Error', error)
      else navigation.navigate(HelpCenter)
    }
  }
  componentWillUnmount () {
    this.props.onResetPhotos('rideLatePhotos')
  }
  onPhotoPress = async () => {
    let granted = await requestMainPermissions(true)
    if (granted) {
      const {onSelectPhoto, navigation} = this.props
      onSelectPhoto({type: 'rideLatePhotos', index: 0})

      navigation.navigate(HelpCamera)
    }
  }
  onSubmit = (values) => {
    const {reason} = values
    const {onSubmitReport, ride = {}, photos} = this.props
    onSubmitReport({data: {photos, reason, delay: this.state.delay}, carId: ride.id})
  }
  renderForm = ({ setFieldTouched, handleChange, handleSubmit, errors, values, touched }) => {
    const {reason} = values
    let buttonActive = isEmpty(errors) && touched.reason && this.state.delay
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='always'
      >
        <View style={styles.form}>
          <View style={styles.delayContainer}>
            <SectionHeader
              title='Delaying'
            />
            <View>
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => this.setState({'delay': 15})}>
                <RadioButton
                  checked={this.state.delay === 15}
                  checkedIcon='md-radio-button-on'
                  onPress={() => this.setState({'delay': 15})}
                />
                <Text style={styles.checkboxTitle}>15 minutes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => this.setState({'delay': 30})}>
                <RadioButton
                  checked={this.state.delay === 30}
                  checkedIcon='md-radio-button-on'
                  onPress={() => this.setState({'delay': 30})}
                />
                <Text style={styles.checkboxTitle}>30 minutes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => this.setState({'delay': 45})}>
                <RadioButton
                  checked={this.state.delay === 45}
                  checkedIcon='md-radio-button-on'
                  onPress={() => this.setState({'delay': 45})}
                />
                <Text style={styles.checkboxTitle}>45 minutes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => this.setState({'delay': 60})}>
                <RadioButton
                  checked={this.state.delay === 60}
                  checkedIcon='md-radio-button-on'
                  onPress={() => this.setState({'delay': 60})}
                />
                <Text style={styles.checkboxTitle}>1 hour</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.photoUploadContainer}>
            <SectionHeader
              title='Upload photo'
            />
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
            keyboardType='default'
            label='Reason'
            maxLength={1000}
            multiline
            name='reason'
            placeholder='Why are you late?'
            showLimit
            value={reason}
            onBlur={() => setFieldTouched('reason')}
            onChangeText={handleChange('reason')}
          />
        </View>
        <Button
          disabled={!buttonActive}
          title='SUBMIT REPORT'
          onPress={handleSubmit}
        />
      </ScrollView>
    )
  }

  render () {
    return (
      <HelpCenterSection>
        <Formik
          initialValues={{reason: ''}}
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
  photos: PropTypes.array,
  requestPending: PropTypes.bool,
  ride: PropTypes.object,
  onResetPhotos: PropTypes.func,
  onSelectPhoto: PropTypes.func,
  onSubmitReport: PropTypes.func
}

export default RideLateDescription
