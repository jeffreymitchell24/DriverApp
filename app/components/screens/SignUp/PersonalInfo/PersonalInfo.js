import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Image,
  Text
} from 'react-native'
import PropTypes from 'prop-types'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { TextInputView } from 'components/blocks'
import { Button } from 'components/ui'
import {Documentation} from 'navigation/routeNames'
import {GOOGLE_API_KEY} from 'config/apiKeys'
import {styles, googleStyles} from './styles'
const uuidv4 = require('uuid/v4')

class PersonalInfo extends Component {
  componentDidMount () {
    this.placesAutocompleteToken = uuidv4()
    console.log('token', this.placesAutocompleteToken)
  }

  onSubmit = () => {
    const {onSaveSignUpStepData} = this.props
    onSaveSignUpStepData({stepData: {}, step: 2})
    this.props.navigation.navigate(Documentation)
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
          // currentLocation // Will add a 'Current location' button at the top of the predefined places list
          // currentLocationLabel='Current location'
          debounce={500} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          fetchDetails
          // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          getDefaultValue={() => ''}
          listViewDisplayed='auto' // true/false/undefined
          minLength={2} // minimum length of text to search
          // nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          // predefinedPlaces={[homePlace, workPlace]}
          placeholder=''
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_API_KEY, // GOOGLE_API_KEY,
            language: 'en', // language of the results
            // types: '(regions)', // default: 'geocode',
            'session_token': this.placesAutocompleteToken,
            sesstionToken: this.placesAutocompleteToken,
            location: '40.730610, -73.935242',
            radius: '15000', // 15 km
            components: 'country:us',
            strictbounds: true
          }}
          renderDescription={row => row.description} // custom description render
          // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
          // renderRightButton={() => <Text>Custom text after the input</Text>}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          styles={googleStyles}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details)
          }}
        />
      </View>
    )
  }

  render () {
    // let { email, password, confirmPassword } = this.state
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
            />
            {/* {this.renderSearch()} */}
            <TextInputView
              label='STREET'
              name='street'
              placeholder=''
            />
            <TextInputView
              keyboardType='numeric'
              label='ZIP CODE'
              name='zipcode'
              placeholder=''
            />
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
            <TextInputView
              keyboardType='numeric'
              label='PHONE NUMBER'
              name='phone'
              placeholder=''
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Button
            containerStyle={styles.button}
            title='UPLOAD DOCUMENTS'
            onPress={this.onSubmit}
          />
        </View>
      </View>
    )
  }
}

PersonalInfo.propTypes = {
  navigation: PropTypes.object,
  onSaveSignUpStepData: PropTypes.func
}

export default PersonalInfo
