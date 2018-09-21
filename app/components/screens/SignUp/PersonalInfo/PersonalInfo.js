import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import find from 'lodash/find'
import PropTypes from 'prop-types'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { TextInputView } from 'components/blocks'
import { Button } from 'components/ui'
import {Documentation} from 'navigation/routeNames'
import {GOOGLE_API_KEY} from 'config/apiKeys'
import {styles, googleStyles} from './styles'
const uuidv4 = require('uuid/v4')

class PersonalInfo extends Component {
  state = {
    fullname: '', // 'Kot M',
    zipcode: '', // '19011',
    city: 'New York',
    state: 'New York',
    street: '', // 'wgkrewgwg',
    phone: '' // '12345676789'
  }
  componentDidMount () {
    this.placesAutocompleteToken = uuidv4()
    console.log('token', this.placesAutocompleteToken)
  }

  onSubmit = () => {
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

  onStreetChange = (street) => {
    console.log(street)
    this.setState({street})
  }

  onCityPress = () => {
    Alert.alert('', 'Car Flow is currently available only in New York City.')
  }

  onEditField = (value, type) => {
    this.setState({[type]: value})
  }

  renderSearch = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>STREET</Text>
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
          debounce={500} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          enablePoweredByContainer={false}
          fetchDetails
          
          getDefaultValue={() => ''}
          listViewDisplayed='auto' // true/false/undefined
          minLength={2} // minimum length of text to search
          placeholder=''
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_API_KEY,
            language: 'en', // language of the results
            types: 'address', // default: 'geocode',
            'session_token': this.placesAutocompleteToken,
            sesstionToken: this.placesAutocompleteToken,
            location: '40.730610, -73.935242',
            radius: '30000', // 30 km
            components: 'country:us',
            // strictbounds: true
          }}
          renderDescription={row => row.description} // custom description render
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          styles={googleStyles}
          text={this.state.street}
          textInputProps={{
            onChangeText: this.onStreetChange
          }}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details)
          }}
        />
      </View>
    )
  }

  render () {
    let { fullname, zipcode, phone, street } = this.state
    let buttonActive = fullname.length > 0 && zipcode.length > 0 && phone.length > 0 && street.length > 0
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps='always'
          style={{}}
        >
          <View style={styles.form}>
            <TextInputView
              label='FULL NAME'
              name='fullname'
              placeholder=''
              value={fullname}
              onChangeText={(value) => this.onEditField(value, 'fullname')}
            />
            {/* {this.renderSearch()} */}
            <TextInputView
              label='STREET'
              name='street'
              placeholder=''
              value={street}
              onChangeText={(value) => this.onEditField(value, 'street')}
            />
            <TextInputView
              keyboardType='numeric'
              label='ZIP CODE'
              name='zipcode'
              placeholder=''
              value={zipcode}
              onChangeText={(value) => this.onEditField(value, 'zipcode')}
            />
            <TouchableWithoutFeedback onPress={this.onCityPress}>
              <View pointerEvents='box-only'>
                <TextInputView
                  editable={false}
                  label='CITY'
                  name='city'
                  placeholder=''
                  value='New York'
                />
                <TextInputView
                  editable={false}
                  label='STATE'
                  name='state'
                  placeholder=''
                  value='New York'
                />
              </View>
            </TouchableWithoutFeedback>
            <TextInputView
              keyboardType='phone-pad'
              label='PHONE NUMBER'
              name='phone'
              placeholder=''
              value={phone}
              onChangeText={(value) => this.onEditField(value, 'phone')}
            />
          </View>
          <View style={styles.footer}>
            <Button
              containerStyle={styles.button}
              disabled={!buttonActive}
              title='UPLOAD DOCUMENTS'
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
