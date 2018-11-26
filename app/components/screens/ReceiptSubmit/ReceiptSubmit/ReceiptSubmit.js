import React, { Component } from 'react'
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  Animated,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import DateTimePicker from 'react-native-modal-datetime-picker'
import * as Yup from 'yup'
import { Spinner } from 'components/ui'
import { Formik } from 'formik'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import { requestMainPermissions } from 'helpers/permission'
import { TextInputView } from 'components/blocks'
import { getCurrentDateAndTime, formatDate, formatTime } from 'helpers/date'
import { ReceiptCamera } from 'navigation/routeNames'
import ImagePicker from 'react-native-image-picker'
import { colors } from 'theme'
import {
  Button,
  Section,
  SectionHeader,
  SectionContent,
  Photo
} from 'components/ui'
import styles from './styles'

const RECEIPT_TYPES = [
  'Gas bill',
  'Parking ticket',
  'Traffic ticket',
  'Repair bill',
  'Toll',
  'Proof of damage'
]

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

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('This field is required.'),
  price: Yup.string()
    .trim()
    .required('This field is required.'),
  location: Yup.string()
    .trim()
    .required('This field is required.')
})

class ReceiptSubmit extends Component {
  inputRefs = {}
  isHiddenPicker = true
  constructor(props) {
    super(props)
    const { time, date } = getCurrentDateAndTime()
    console.log(time, date)
    this.state = {
      showPicker: false,
      pickerMode: 'time',
      date,
      time,
      expanded: false,
      animation: new Animated.Value(0),
      receiptType: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { error, requestPending, navigation } = this.props
    if (prevProps.requestPending && !requestPending) {
      if (error) setTimeout(() => Alert.alert('Error', error), 200)
      else navigation.goBack()
    }
  }

  onReceiptTypeSelect = type => {
    this.setState({ receiptType: type }, () => this.toggle())
  }

  toggle = () => {
    var toValue = 0

    if (this.isHiddenPicker) {
      toValue = 180
    }

    // This will animate the transalteY of the subview between 0 & 100 depending on its current state
    // 100 comes from the style below, which is the height of the subview.
    Animated.spring(this.state.animation, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8
    }).start()

    this.isHiddenPicker = !this.isHiddenPicker
  }

  onPhotoPress = async () => {
    let granted = await requestMainPermissions(true)
    if (granted) {
      // const { onSelectPhoto } = this.props
      // onSelectPhoto({ type: 'receiptPhoto', index: 0 })

      // navigation.navigate(ReceiptCamera)
      let granted = await requestMainPermissions(true)
      if (granted) {
        const { onSavePhoto } = this.props

        ImagePicker.launchCamera(
          Platform.OS === 'android' ? androidOptions : iosOptions,
          response => {
            if (response.didCancel) {
            } else if (response.error) {
              console.warn(response.error)
              setTimeout(() => Alert.alert('', "Can't pick a photo"), 200)
            }
            onSavePhoto({
              type: 'receiptPhoto',
              index: 0,
              photoUri: response.uri
            })
          }
        )
      }
    }
  }
  onHideDateTimePicker = () => {
    this.setState({ showPicker: false })
  }
  onDateTimePicked = date => {
    console.log('date', date)
    if (this.state.pickerMode === 'time') {
      this.setState({ showPicker: false, time: formatTime(date) })
    } else {
      this.setState({ showPicker: false, date: formatDate(date) })
    }
  }
  componentWillUnmount() {
    this.props.onClearReceiptPhoto()
  }
  onDatePress = () => {
    this.setState({ showPicker: true, pickerMode: 'date' })
  }
  onTimePress = () => {
    this.setState({ showPicker: true, pickerMode: 'time' })
  }

  onSubmit = values => {
    const { title, location, price } = values
    const { date, time } = this.state
    const { onSubmitReceipt, ride = {}, receiptPhoto } = this.props
    let dateObject = moment(date, 'MM/DD/YYYY')
    onSubmitReceipt({
      data: {
        location,
        title,
        price,
        date: dateObject.format('YYYY-MM-DD'),
        time,
        photo: receiptPhoto
      },
      carId: ride.id
    })
  }

  renderDropDown = setFieldValue => {
    return (
      <Animated.View
        style={[styles.dropdown, { height: this.state.animation }]}
      >
        {RECEIPT_TYPES.map((type, i) => {
          let extraStyle = {}
          if (i === RECEIPT_TYPES.length - 1)
            extraStyle = { borderBottomWidth: 2 }
          else if (i === 0) extraStyle = { borderTopWidth: 0 }
          return (
            <TouchableOpacity
              key={i}
              style={[styles.dropdownItem, extraStyle]}
              onPress={() => {
                setFieldValue('title', type)
                this.toggle()
              }}
            >
              <Text style={styles.dropdownItemText}>{type}</Text>
            </TouchableOpacity>
          )
        })}
      </Animated.View>
    )
  }
  renderForm = ({
    setFieldTouched,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    setFieldValue
  }) => {
    const { price, location, title } = values
    let isButtonActive =
      isEmpty(errors) &&
      touched.location &&
      touched.price &&
      values.title &&
      this.props.receiptPhoto
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.form}>
          <TouchableWithoutFeedback onPress={this.toggle}>
            <View pointerEvents="box-only">
              <TextInputView
                containerStyle={{ marginBottom: 0 }}
                keyboardType="default"
                label="TITLE"
                name="title"
                placeholder=""
                value={title}
              />
            </View>
          </TouchableWithoutFeedback>
          {this.renderDropDown(setFieldValue)}
          <TextInputView
            blurOnSubmit={false}
            error={touched.location && errors.location}
            keyboardType="default"
            label="LOCATION"
            name="location"
            placeholder=""
            returnKeyType={'next'}
            value={location}
            onBlur={() => setFieldTouched('location')}
            onChangeText={handleChange('location')}
            onSubmitEditing={() => this.inputRefs['price'].focus()}
          />
          <TextInputView
            error={touched.price && errors.price}
            keyboardType="number-pad"
            label="PRICE"
            mask={'[999990].[99]'}
            name="price"
            placeholder=""
            refInput={input => {
              this.inputRefs['price'] = input
            }}
            value={price}
            onBlur={() => setFieldTouched('price')}
            onChangeText={handleChange('price')}
          />
          <TouchableWithoutFeedback onPress={this.onDatePress}>
            <View pointerEvents="box-only">
              <TextInputView
                keyboardType="default"
                label="DATE"
                name="date"
                placeholder=""
                value={this.state.date}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onTimePress}>
            <View pointerEvents="box-only">
              <TextInputView
                keyboardType="default"
                label="TIME"
                name="time"
                placeholder=""
                value={this.state.time}
              />
            </View>
          </TouchableWithoutFeedback>
          <Section style={styles.photoUploadSection}>
            <SectionHeader title="RECEIPT PHOTO" />
            <SectionContent>
              <Photo
                imageUri={this.props.receiptPhoto}
                onPress={this.onPhotoPress}
              />
            </SectionContent>
          </Section>
        </View>
        <Button
          // containerStyle={styles.nextButton}
          disabled={!isButtonActive}
          title="SUBMIT"
          onPress={handleSubmit}
        />
        <DateTimePicker
          isVisible={this.state.showPicker}
          mode={this.state.pickerMode}
          onCancel={this.onHideDateTimePicker}
          onConfirm={this.onDateTimePicked}
        />
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={{ title: '', price: '', location: '' }}
          ref={node => (this.formik = node)}
          render={this.renderForm}
          validateOnBlur
          // validateOnChange
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        />
        <Spinner color={colors.red} visible={this.props.requestPending} />
      </View>
    )
  }
}

ReceiptSubmit.propTypes = {
  error: PropTypes.string,
  navigation: PropTypes.object,
  receiptPhoto: PropTypes.string,
  requestPending: PropTypes.bool,
  ride: PropTypes.object,
  onClearReceiptPhoto: PropTypes.func,
  onSubmitReceipt: PropTypes.func
}

export default ReceiptSubmit
