import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Keyboard,
  Alert
} from 'react-native'
import find from 'lodash/find'
import PropTypes from 'prop-types'
import { GoogleAutoComplete } from 'react-native-google-autocomplete'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { TextInputView } from 'components/blocks'
import { Button } from 'components/ui'
import {Documentation} from 'navigation/routeNames'
import {GOOGLE_API_KEY} from 'config/apiKeys'
import {styles, googleStyles} from './styles'
import { colors } from 'theme'
const uuidv4 = require('uuid/v4')

class PersonalInfo extends Component {
  state = {
    fullname: '', // 'Kot M',
    address: '', // '19011',
    phone: '' // '12345676789'
  }
  inputRefs = {}
  componentDidMount () {
    this.placesAutocompleteToken = uuidv4()
    console.log('token', this.placesAutocompleteToken)
  }

  onSubmit = () => {
    Keyboard.dismiss()
    const {onSaveProfileInfo} = this.props
    let profile = {
      fullname: 'John Doe',
      street: 'Park Avenue',
      zipcode: '',
      city: 'New York',
      state: 'New York',
      phone: '411 555 1234'
    }
    onSaveProfileInfo(profile)
    this.props.navigation.navigate(Documentation)
  }

  onAddressChange = (address) => {
    console.log(address)
    this.setState({address})
  }

  onCityPress = () => {
    Alert.alert('', 'Car Flow is currently available only in New York City.')
  }

  onEditField = (value, type) => {
    this.setState({[type]: value})
  }

  componentWillMount () {
    console.log('inputRefs', this.inputRefs)
  }

  renderSearch = () => {
    // return (
    //   <GoogleAutoComplete
    //     apiKey={GOOGLE_API_KEY}
    //     components='country:us'
    //     debounce={700}
    //     queryTypes='(regions)'
    //   >
    //     {({ inputValue, handleTextChange, locationResults, fetchDetails }) => {
    //       console.log('locationResults', locationResults)
    //       return (
    //         <TextInputView
    //           // editable={false}
    //           label='STATE'
    //           name='state'
    //           placeholder=''
    //           value={this.state.state}
    //           onChangeText={(value) => {
    //             this.onEditField(value, 'state')
    //             handleTextChange(value)
    //           }}
    //         />
    //       )
    //     }}
    //   </GoogleAutoComplete>
    // )
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CURRENT ADDRESS</Text>
        <GooglePlacesAutocomplete
          // GooglePlacesSearchQuery={{
          //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          //   rankby: 'distance',
          //   types: 'food'
          // }}
          // GoogleReverseGeocodingQuery={{
          //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          // }}
          autoFocus={false}
          debounce={600} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          enablePoweredByContainer={false}
          fetchDetails
          getDefaultValue={() => ''}
          listViewDisplayed='auto' // true/false/undefined
          minLength={2} // minimum length of text to search
          placeholder='e.g. 816 Alabama St, San Francisco, CA, USA'
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_API_KEY,
            language: 'en', // language of the results
            types: 'address', // default: 'geocode',
            'session_token': this.placesAutocompleteToken,
            sesstionToken: this.placesAutocompleteToken,
            // location: '40.730610, -73.935242',
            // radius: '30000', // 30 km
            components: 'country:us'
            // strictbounds: true
          }}
          renderDescription={row => row.description} // custom description render
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          styles={googleStyles}
          text={this.state.address}
          textInputProps={{
            placeholderTextColor: colors.grey50,
            onChangeText: this.onAddressChange,
            ref: (input) => { this.inputRefs['address'] = input }
          }}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details)
          }}
        />
      </View>
    )
  }

  render () {
    let { fullname, phone, address } = this.state
    let buttonActive = fullname.length > 0 && address.length > 0 && phone.length > 0
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps='always'
          style={{}}
        >
          <View style={styles.form}>
            <TextInputView
              blurOnSubmit={false}
              inputRef={(input) => { this.inputRefs['fullname'] = input }}
              label='FULL NAME'
              name='fullname'
              placeholder=''
              returnKeyType={'next'}
              value={fullname}
              onChangeText={(value) => this.onEditField(value, 'fullname')}
              onSubmitEditing={() => this.inputRefs['address'].focus()}
            />
            {/* {this.renderSearch()} */}
            <TextInputView
              blurOnSubmit={false}
              inputRef={(input) => { this.inputRefs['address'] = input }}
              label='CURRENT ADDRESS'
              name='address'
              placeholder=''
              returnKeyType={'next'}
              value={address}
              onChangeText={(value) => this.onEditField(value, 'address')}
              onSubmitEditing={() => this.inputRefs['phone'].focus()}
            />
            {/* <TextInputView
              blurOnSubmit={false}
              inputRef={(input) => { this.inputRefs['zipcode'] = input }}
              keyboardType='numeric'
              label='ZIP CODE'
              name='zipcode'
              placeholder=''
              returnKeyType={'next'}
              value={zipcode}
              onChangeText={(value) => this.onEditField(value, 'zipcode')}
              onSubmitEditing={() => this.inputRefs['city'].focus()}
            /> */}
            {/* <TouchableWithoutFeedback onPress={this.onCityPress}> */}
            {/* <View pointerEvents='box-only'> */}
            {/* <TextInputView
              blurOnSubmit={false}
              editable// ={false}
              inputRef={(input) => { this.inputRefs['city'] = input }}
              label='CITY'
              name='city'
              placeholder=''
              returnKeyType={'next'}
              value='New York'
              onSubmitEditing={() => this.inputRefs['state'].focus()}
            />
            <TextInputView
              blurOnSubmit={false}
              editable// ={false}
              inputRef={(input) => { this.inputRefs['state'] = input }}
              label='STATE'
              name='state'
              placeholder=''
              returnKeyType={'next'}
              value='New York'
              onSubmitEditing={() => this.inputRefs['phone'].focus()}
            /> */}
            {/* </View> */}
            {/* </TouchableWithoutFeedback> */}
            <TextInputView
              inputRef={(input) => { this.inputRefs['phone'] = input }}
              keyboardType='phone-pad'
              label='PHONE NUMBER'
              name='phone'
              placeholder='e.g. +1 212 1234-567'
              value={phone}
              onChangeText={(value) => this.onEditField(value, 'phone')}
            />
          </View>
          <View style={styles.footer}>
            <Button
              containerStyle={styles.button}
              disabled={!buttonActive}
              title='NEXT'
              onPress={this.onSubmit}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

PersonalInfo.propTypes = {
  navigation: PropTypes.object,
  onSaveProfileInfo: PropTypes.func
}

export default PersonalInfo
