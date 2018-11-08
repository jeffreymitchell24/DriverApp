import React, { Component } from 'react'
import { View, ScrollView, Keyboard, Alert } from 'react-native'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { Formik } from 'formik'
import { GoogleAutoComplete } from 'react-native-google-autocomplete'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { TextInputView, LocationItem } from 'components/blocks'
import { Button } from 'components/ui'
import { Documentation } from 'navigation/routeNames'
import { GOOGLE_API_KEY } from 'config/apiKeys'
import { capitalize } from 'helpers/name'
import { formatPhoneNumber } from 'helpers/phone'
import { styles, googleStyles } from './styles'
// import * as Yup from 'yup'

const uuidv4 = require('uuid/v4')
const customValidate = values => {
  const { fullname, address, phone } = values
  let errors = {}
  if (!fullname) errors.fullname = 'This field is required.'
  if (!address) errors.address = 'This field is required.'
  if (!phone) errors.phone = 'This field is required.'
  else if (phone.length < 15) errors.phone = 'Phone number is not correct.'
  return errors
}

// const validationSchema = Yup.object().shape({
//   fullname: Yup.string().trim().required('This field is required.'),
//   address: Yup.string().required('This field is required.'),
//   phone: Yup.string().min(15, 'Incorrect phone number, e.g. +1 212 1234-567').required('This field is required.')
// })

class PersonalInfo extends Component {
  state = {
    fullname: '', // 'Kot M',
    address: '', // '19011',
    phone: '' // '12345676789'
  }
  addressSelected = false
  showAddressResults = true
  inputRefs = {}
  componentDidMount() {
    this.placesAutocompleteToken = uuidv4()
    console.log('token', this.placesAutocompleteToken)
  }

  componentWillUnmount() {
    const signoutOnBack = this.props.navigation.getParam('signoutOnBack', false)
    if (signoutOnBack) this.props.onSignOut()
  }

  onSubmit = values => {
    const { fullname, address, phone } = values
    Keyboard.dismiss()
    const { onSaveProfileInfo } = this.props
    let profile = {
      fullname,
      address,
      phone
    }
    onSaveProfileInfo(profile)
    this.props.navigation.navigate(Documentation)
  }

  onEditPhone = phone => {
    let formattedPhone = formatPhoneNumber(phone)
    console.log('formattedPhone', formattedPhone)
    this.setState({ phone: formattedPhone })
  }

  onLocationPress = address => {
    console.log('address', address)
    this.addressSelected = true
    this.showAddressResults = false
    this.formik.setFieldValue('address', address.formatted_address)
    // this.setState({address: address.formatted_address, showAddressResults: false})
  }

  onCityPress = () => {
    Alert.alert('', 'Car Flow is currently available only in New York City.')
  }

  onEditField = (value, type) => {
    this.setState({ [type]: type === 'fullname' ? capitalize(value) : value })
  }

  onFocusPhone = () => {
    if (this.state.phone.length === 0) this.setState({ phone: '+1 ' })
  }

  validateForm = (values, props) => {
    let errors = {}
    // console.log('addressSelected', this.addressSelected)
    if (!this.addressSelected) {
      errors.address = 'Select address from location list'
    }
    let fieldErrors = customValidate(values)
    errors = { ...errors, ...fieldErrors }

    return errors
  }

  renderSearchResults = (locationResults, fetchDetails) => {
    return (
      <View
        contentContainerStyle={googleStyles.contentContainerStyle}
        style={googleStyles.container}
      >
        {locationResults.map((el, i) => (
          <LocationItem
            {...el}
            fetchDetails={fetchDetails}
            key={String(i)}
            onPress={this.onLocationPress}
          />
        ))}
      </View>
    )
  }

  renderSearch = ({
    values,
    errors,
    touched,
    setFieldTouched,
    setValues,
    setFieldValue
  }) => {
    let { address } = values
    return (
      <GoogleAutoComplete
        apiKey={GOOGLE_API_KEY}
        components="country:us"
        debounce={500}
        queryTypes="address"
      >
        {({ inputValue, handleTextChange, locationResults, fetchDetails }) => {
          // console.log('locationResults', locationResults)
          return (
            <View style={{ marginBottom: 16 }}>
              <TextInputView
                blurOnSubmit={false}
                containerStyle={{ marginBottom: 0 }}
                error={touched.address && errors.address}
                inputRef={input => {
                  this.inputRefs['address'] = input
                }}
                label="CURRENT ADDRESS"
                name="address"
                placeholder=""
                returnKeyType={'next'}
                value={address}
                onBlur={() => setFieldTouched('address')}
                onChangeText={value => {
                  this.addressSelected = false
                  this.showAddressResults = true
                  setFieldValue('address', value)
                  handleTextChange(value)
                }}
                onSubmitEditing={() => this.inputRefs['phone'].focus()}
              />
              {this.showAddressResults &&
                locationResults.length > 0 &&
                this.renderSearchResults(locationResults, fetchDetails)}
            </View>
          )
        }}
      </GoogleAutoComplete>
    )
  }

  renderForm = ({
    setFieldTouched,
    setFieldValue,
    setValues,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched
  }) => {
    let { fullname, phone } = values
    console.log('phone', phone)
    let buttonActive = isEmpty(errors) && this.addressSelected
    return (
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="always"
        style={{}}
      >
        <View style={styles.form}>
          <TextInputView
            autoCapitalize="words"
            blurOnSubmit={false}
            error={touched.fullname && errors.fullname}
            inputRef={input => {
              this.inputRefs['fullname'] = input
            }}
            label="FULL NAME"
            name="fullname"
            placeholder=""
            returnKeyType={'next'}
            value={fullname}
            onBlur={() => setFieldTouched('fullname')}
            onChangeText={value => {
              setFieldValue('fullname', value)
            }}
            onSubmitEditing={() => this.inputRefs['address'].focus()}
          />
          {this.renderSearch({
            values,
            errors,
            touched,
            setFieldTouched,
            setFieldValue,
            setValues
          })}
          <TextInputView
            error={touched.phone && errors.phone}
            keyboardType="phone-pad"
            label="PHONE NUMBER"
            mask={'+1 [000]-[000]-[0000]'}
            maxLength={15}
            name="phone"
            placeholder="e.g. +1 212 1234-567"
            refInput={input => {
              this.inputRefs['phone'] = input
            }}
            returnKeyType="done"
            value={phone}
            onBlur={() => setFieldTouched('phone')}
            onChangeText={value => setFieldValue('phone', value)}
          />
        </View>
        <View style={styles.footer}>
          <Button
            containerStyle={styles.button}
            disabled={!buttonActive}
            title="NEXT"
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    )
  }

  render() {
    // let { fullname, phone, address } = this.state
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            fullname: '',
            address: '',
            phone: '',
            addressSelected: false
          }}
          ref={node => (this.formik = node)}
          render={this.renderForm}
          validate={this.validateForm}
          validateOnBlur
          // validateOnChange
          // validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        />
      </View>
    )
  }
}

PersonalInfo.propTypes = {
  navigation: PropTypes.object,
  onSaveProfileInfo: PropTypes.func,
  onSignOut: PropTypes.func
}

export default PersonalInfo
