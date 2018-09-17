import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Image,
  Text
} from 'react-native'
import PropTypes from 'prop-types'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { TextInputView } from 'components/blocks'
import { Button } from 'components/ui'
import {Documentation} from 'navigation/routeNames'
import {GOOGLE_API_KEY} from 'config/apiKeys'
import styles from './styles'
const uuidv4 = require('uuid/v4')

class PersonalInfo extends Component {
  componentDidMount () {
    this.placesAutocompleteToken = uuidv4()
    console.log('toek', this.placesAutocompleteToken)
  }

  onSubmit = () => {
    const {onSaveSignUpStepData} = this.props
    onSaveSignUpStepData({stepData: {}, step: 2})
    this.props.navigation.navigate(Documentation)
  }

  // renderSearch = () => {
  //   return (
  //     <GooglePlacesAutocomplete
  //       // GooglePlacesSearchQuery={{
  //       //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
  //       //   rankby: 'distance',
  //       //   types: 'food'
  //       // }}
  //       // GoogleReverseGeocodingQuery={{
  //       //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
  //       // }}
  //       autoFocus={false}
  //       currentLocation // Will add a 'Current location' button at the top of the predefined places list
  //       currentLocationLabel='Current location'
  //       debounce={500} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
  //       fetchDetails
  //       filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
  //       getDefaultValue={() => ''}
  //       listViewDisplayed='auto' // true/false/undefined
  //       minLength={2} // minimum length of text to search
  //       // nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
  //       // predefinedPlaces={[homePlace, workPlace]}
  //       placeholder='Search'
  //       query={{
  //         // available options: https://developers.google.com/places/web-service/autocomplete
  //         key: GOOGLE_API_KEY,
  //         language: 'en', // language of the results
  //         types: '(cities)', // default: 'geocode',
  //         sessiontoken: this.placesAutocompleteToken
  //       }}
  //       renderDescription={row => row.description} // custom description render
  //       // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
  //       // renderRightButton={() => <Text>Custom text after the input</Text>}
  //       returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
  //       styles={{
  //         container: {
  //           zIndex: 10,
  //           overflow: 'visible'
  //         },
  //         textInputContainer: {
  //           borderTopWidth: 0,
  //           borderBottomWidth: 0,
  //           height: 50,
  //           overflow: 'visible',
  //           backgroundColor: '#fff',
  //           borderColor: '#fff',
  //           borderRadius: 100
  //         },
  //         textInput: {
  //           backgroundColor: 'transparent',
  //           fontSize: 15,
  //           lineHeight: 22.5,
  //           paddingBottom: 0,
  //           flex: 1
  //         },
  //         listView: {
  //           position: 'absolute',
  //           top: 60,
  //           left: 10,
  //           right: 10,
  //           backgroundColor: 'white',
  //           borderRadius: 5,
  //           flex: 1,
  //           elevation: 3,
  //           zIndex: 10
  //         },
  //         description: {
  //           color: '#1faadb'
  //         },
  //         predefinedPlacesDescription: {
  //           color: '#1faadb'
  //         }
  //       }}
  //       onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
  //         console.log(data, details)
  //       }}
  //     />
  //   )
  // }

  render () {
    // let { email, password, confirmPassword } = this.state
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        {/* {this.renderSearch()} */}
        <ScrollView
          contentContainerStyle={styles.container}
          style={{flex: 1}}
        >
          <View style={styles.form}>
            <TextInputView
              label='FULL NAME'
              name='fullname'
              placeholder=''
            />
            <TextInputView
              label='STREET'
              name='street'
              placeholder=''
            />
            <TextInputView
              label='CITY'
              name='city'
              placeholder=''
            />
            <TextInputView
              keyboardType='numeric'
              label='ZIP CODE'
              name='zipcode'
              placeholder=''
            />
            <TextInputView
              label='STATE'
              name='state'
              placeholder=''
            />
            <TextInputView
              label='PHONE NUMBER'
              name='phone'
              placeholder=''
            />
          </View>
          <View style={styles.footer}>
            <Button
              containerStyle={styles.button}
              title='UPLOAD DOCUMENT'
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
  onSaveSignUpStepData: PropTypes.func
}

export default PersonalInfo
