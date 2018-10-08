import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Spinner from 'react-native-loading-spinner-overlay'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import { GoogleAutoComplete } from 'react-native-google-autocomplete'
import { Formik } from 'formik'
import { Button } from 'components/ui'
import {GOOGLE_API_KEY} from 'config/apiKeys'
import {ChangesReview} from 'navigation/routeNames'
import { TextInputView, LocationItem } from 'components/blocks'
import { colors } from 'theme'
import {styles, googleStyles} from './styles'

// eslint-disable-next-line
let rEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
const uuidv4 = require('uuid/v4')
const customValidate = (values) => {
  const {fullname, address, phone, email} = values
  let errors = {}
  if (!fullname) errors.fullname = 'This field is required.'
  if (!address) errors.address = 'This field is required.'
  if (!phone) errors.phone = 'This field is required.'
  if (!email) errors.email = 'This field is required.'
  if (!rEmail.test(email)) errors.email = 'Email format is not correct.'
  else if (phone.length < 15) errors.phone = 'Phone number is not correct.'
  return errors
}
class ProfileDetails extends Component {
  inputRefs = {}
  showAddressResults = true
  constructor (props) {
    super(props)
    const {user} = this.props
    const {full_name: fullname = '', address = '', phone = '', email = ''} = user
    this.originalData = {fullname, address, phone, email}
    this.data = {
      fullname: {value: fullname, changed: false},
      address: {value: address, changed: false},
      phone: {value: phone, changed: false},
      email: {value: email, changed: false}
    }
    this.submitVales = {}
    this.addressSelected = true
    this.state = {
      editableField: ''
    }
  }
  componentDidMount () {
    this.placesAutocompleteToken = uuidv4()
  }

  componentDidUpdate (prevProps) {
    const {isEmailValidating, emailError} = this.props.emailValidation
    if (!isEmailValidating && prevProps.emailValidation.isEmailValidating) {
      if (!emailError) this.reviewChanges(this.submitVales)
      else this.formik.setErrors({email: emailError})
    }
  }

  onLocationPress = (address) => {
    console.log('address', address)
    this.addressSelected = true
    this.showAddressResults = false
    this.data.address = {
      value: address.formatted_address,
      changed: address.formatted_address !== this.originalData['address']
    }
    this.formik.setFieldValue('address', address.formatted_address)
  }

  onSaveChanges = (values) => {
    Keyboard.dismiss()
    const {email} = values
    if (email.trim() !== this.originalData.email) {
      this.props.onValidateEmail({email: email.trim()})
      this.submitVales = values
    } else this.reviewChanges(values)
  }

  reviewChanges = (values) => {
    console.log('reviewChanges', values)
    let profileChanges = []
    forEach(this.data, (field, fieldName) => {
      if (field.changed) {
        profileChanges.push({id: fieldName, previous: this.originalData[fieldName], current: field.value})
      }
    })

    this.props.navigation.navigate(ChangesReview, {profileChanges})
  }
  keyExtractor = (item, index) => index.toString()

  onPenPress = (fieldName) => {
    this.setState(prevState => {
      let isEditing = prevState.editableField === fieldName

      // let value = !isEditing ? prevState[fieldName].value
      //   : prevState[fieldName].value === '' ? this.originalData[fieldName] : prevState[fieldName].value

      return {
        editableField: isEditing ? '' : fieldName
        // [fieldName]: {value, changed: value !== this.originalData[fieldName]}
      }
    }, () => {
      console.log(this.state.editableField === fieldName)
      this.state.editableField === fieldName && this.inputRefs[fieldName].focus()
    })
  }

  onChangeText = (stateName, text) => {
    this.setState(prevState => {
      return {
        [stateName]: {
          value: text,
          changed: text !== this.originalData[stateName]
        }
      }
    })
  }

  isSubmitActive = () => {
    const {fullname, address, phone, email} = this.data
    return (fullname.changed || address.changed || phone.changed || email.changed) && !this.state.editableField
  }

  renderEditIcon = ({editable}) => {
    return <Icon color={editable ? colors.red : colors.gray200} name={editable ? 'check' : 'pen'} size={editable ? 25 : 20} />
  }

  validateForm = (values, props) => {
    let errors = {}
    // console.log('addressSelected', this.addressSelected)
    if (!this.addressSelected) {
      errors.address = 'Select address from location list'
    }
    let fieldErrors = customValidate(values)
    errors = {...errors, ...fieldErrors}

    return errors
  }

  renderSearchResults = (locationResults, fetchDetails) => {
    return (
      <View contentContainerStyle={googleStyles.contentContainerStyle} style={googleStyles.container}>
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

  renderForm = ({ setFieldTouched, setFieldValue, setValues, handleChange, handleSubmit, errors, values, touched }) => {
    const {phone, address, email, fullname} = values
    let buttonActive = this.isSubmitActive() && isEmpty(errors) && this.addressSelected
    return (
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps='handled'
        style={{}}
      >
        <View>
          <View style={styles.textInputContainer}>
            <TextInputView
              autoCapitalize='words'
              containerStyle={{paddingRight: 40}}
              editable={this.state.editableField === 'fullname'}
              error={touched.fullname && errors.fullname}
              inputRef={(input) => { this.inputRefs['fullname'] = input }}
              label='FULL NAME'
              placeholder=''
              value={fullname}
              onBlur={() => setFieldTouched('fullname')}
              onChangeText={(value => {
                this.data.fullname = {
                  value,
                  changed: value !== this.originalData['fullname']
                }
                setFieldValue('fullname', value)
              })}
            />
            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={styles.editIcon}
              onPress={() => this.onPenPress('fullname')}
            >
              {this.renderEditIcon({editable: this.state.editableField === 'fullname'})}
            </TouchableOpacity>
          </View>
          <GoogleAutoComplete
            apiKey={GOOGLE_API_KEY}
            components='country:us'
            debounce={500}
            queryTypes='address'
          >
            {({ inputValue, handleTextChange, locationResults, fetchDetails }) => {
              // console.log('locationResults', locationResults)
              return (
                <View style={styles.textInputContainer}>
                  <View>
                    <TextInputView
                      containerStyle={{paddingRight: 40}}
                      editable={this.state.editableField === 'address'}
                      error={touched.address && errors.address}
                      inputRef={(input) => { this.inputRefs['address'] = input }}
                      label='CURRENT ADDRESS'
                      placeholder=''
                      value={address}
                      onBlur={() => setFieldTouched('address')}
                      onChangeText={(value => {
                        this.data.address = {
                          value,
                          changed: value !== this.originalData['address']
                        }
                        this.addressSelected = false
                        this.showAddressResults = true
                        handleTextChange(value)
                        setFieldValue('address', value)
                      })}
                    />
                    {
                      this.showAddressResults &&
                      locationResults.length > 0 &&
                      this.renderSearchResults(locationResults, fetchDetails)
                    }
                  </View>
                  <TouchableOpacity
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    style={styles.editIcon}
                    onPress={() => this.onPenPress('address')}
                  >
                    {this.renderEditIcon({editable: this.state.editableField === 'address'})}
                  </TouchableOpacity>
                </View>
              )
            }}
          </GoogleAutoComplete>
          <View style={styles.textInputContainer}>
            <TextInputView
              containerStyle={{paddingRight: 40}}
              editable={this.state.editableField === 'phone'}
              error={touched.phone && errors.phone}
              keyboardType='phone-pad'
              label='PHONE NUMBER'
              mask={'+1 [000]-[000]-[0000]'}
              placeholder=''
              refInput={(input) => { this.inputRefs['phone'] = input }}
              value={phone}
              onBlur={() => setFieldTouched('phone')}
              onChangeText={(value => {
                this.data.phone = {
                  value,
                  changed: value !== this.originalData['phone']
                }
                setFieldValue('phone', value)
              })}
            />
            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={styles.editIcon}
              onPress={() => this.onPenPress('phone')}
            >
              {this.renderEditIcon({editable: this.state.editableField === 'phone'})}
            </TouchableOpacity>
          </View>
          <View style={styles.textInputContainer}>
            <TextInputView
              containerStyle={{paddingRight: 40}}
              editable={this.state.editableField === 'email'}
              error={touched.email && errors.email}
              inputRef={(input) => { this.inputRefs['email'] = input }}
              keyboardType='email-address'
              label='EMAIL'
              placeholder=''
              value={email}
              onBlur={() => setFieldTouched('email')}
              onChangeText={(value => {
                this.data.email = {
                  value,
                  changed: value !== this.originalData['email']
                }
                setFieldValue('email', value)
              })}
            />
            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={styles.editIcon}
              onPress={() => this.onPenPress('email')}
            >
              {this.renderEditIcon({editable: this.state.editableField === 'email'})}
            </TouchableOpacity>
          </View>
        </View>
        <Button
          containerStyle={styles.button}
          disabled={!buttonActive}
          title='REVIEW CHANGES'
          onPress={handleSubmit}
        />
      </ScrollView>
    )
  }
  render () {
    // let isButtonActive = this.isSubmitActive()
    return (
      <View style={styles.container}>
        {/* <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={CONFIG}
          extraData={{state: this.state, email: this.props.emailValidation}}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        /> */}
        <Formik
          initialValues={{
            fullname: this.originalData.fullname,
            address: this.originalData.address,
            phone: this.originalData.phone,
            email: this.originalData.email
          }}
          ref={node => (this.formik = node)}
          render={this.renderForm}
          validate={this.validateForm}
          validateOnBlur
          // validateOnChange
          // validationSchema={validationSchema}
          onSubmit={this.onSaveChanges}
        />
        <Spinner color={colors.red} visible={this.props.emailValidation.isEmailValidating} />
      </View>
    )
  }
}

ProfileDetails.propTypes = {
  emailValidation: PropTypes.object,
  navigation: PropTypes.object,
  user: PropTypes.object,
  onValidateEmail: PropTypes.func
}

export default ProfileDetails
