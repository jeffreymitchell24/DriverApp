import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavFilterImg } from 'components/ui'
import { GOOGLE_API_KEY } from 'config/apiKeys'

import { GoogleAutoComplete } from 'react-native-google-autocomplete'

import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'

import { icons } from 'images'

import { styles } from './styles'

class PickupLocation extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <NavFilterImg text={'Cancel'} onPress={() => navigation.goBack()} />
      )
    }
  }

  state = {
    address: ''
  }

  onLocationPress = (fetchDetails, loc) => {
    fetchDetails(loc.place_id).then(address => {
      console.log('address', address)
      const { onFilterUpdate, onChooseAddress, navigation } = this.props

      const {
        formatted_address: addressText,
        geometry: { location }
      } = address

      onFilterUpdate('location', {
        address: addressText,
        lat: location.lat,
        lon: location.lon
      })
      onChooseAddress(addressText)

      navigation.goBack()
    })
  }

  renderSearchResults = (locationResults, fetchDetails) => {
    return (
      <View style={styles.resultsContainer}>
        <View style={styles.resultsListContainer}>
          {locationResults.map((el, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => this.onLocationPress(fetchDetails, el)}
            >
              <View style={[styles.resultRow, styles.bottomBorder]}>
                <Image
                  source={icons.mapMarker}
                  style={{ width: 15, height: 21 }}
                />
                <Text style={styles.resultRowText}>{el.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  renderRecentsList = (history, fetchDetails) => {
    return (
      <View>
        <View>
          <Text style={styles.listHeader}>Recents</Text>
        </View>
        <View style={styles.resultsContainer}>
          <View style={styles.resultsListContainer}>
            {history.map((el, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.onLocationPress(fetchDetails, el)}
              >
                <View style={[styles.resultRow, styles.bottomBorder]}>
                  <Image
                    source={icons.mapMarker}
                    style={{ width: 15, height: 20 }}
                  />
                  <Text style={styles.resultRowText}>{el}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    )
  }

  renderHistory = fetchDetails => {
    const { history } = this.props

    return (
      <View>
        <View style={styles.resultsContainer}>
          <View style={[styles.resultRow]}>
            <Image
              source={icons.geolocation}
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.resultRowText}>Current Location</Text>
          </View>
        </View>
        {!!history.length && this.renderRecentsList(history, fetchDetails)}
      </View>
    )
  }

  render() {
    const { address } = this.state

    return (
      <GoogleAutoComplete
        apiKey={GOOGLE_API_KEY}
        components="country:us"
        debounce={500}
        queryTypes="address"
      >
        {({ inputValue, handleTextChange, locationResults, fetchDetails }) => {
          console.log('locationResults', locationResults, fetchDetails)

          const handleAddressChanged = text => {
            this.setState({
              address: text,
              addressSelected: false
            })

            handleTextChange(text)
          }

          return (
            <View style={styles.container}>
              <SearchBar
                blurOnSubmit={false}
                clearIcon={{
                  color: '#86939e',
                  name: 'clear'
                }}
                containerStyle={{
                  backgroundColor: '#fff',
                  borderBottomWidth: 0,
                  borderTopWidth: 0
                }}
                inputRef={input => {
                  this.inputRefs['address'] = input
                }}
                inputStyle={{
                  backgroundColor: '#F1F1F2'
                }}
                lightTheme
                name="address"
                placeholder="Pickup location"
                returnKeyType={'next'}
                round
                value={address}
                onChangeText={handleAddressChanged}
                onClearText={() => handleAddressChanged('')}
              />
              {address.length
                ? locationResults.length > 0 &&
                  this.renderSearchResults(locationResults, fetchDetails)
                : this.renderHistory(fetchDetails)}
            </View>
          )
        }}
      </GoogleAutoComplete>
    )
  }
}

PickupLocation.propTypes = {
  history: PropTypes.array,
  navigation: PropTypes.object,
  onChooseAddress: PropTypes.func,
  onFilterUpdate: PropTypes.func
}

export default PickupLocation
