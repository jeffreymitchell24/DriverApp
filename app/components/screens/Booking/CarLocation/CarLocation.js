import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import MapView from 'react-native-maps'
import styles from './styles'
class CarLocation extends PureComponent {
  render () {
    const geo = this.props.navigation.getParam('geo', {})
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: geo.lat,
            longitude: geo.lon,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}
          showsScale={false}
          style={styles.map}
        >
          <MapView.Marker
            coordinate={{
              latitude: geo.lat,
              longitude: geo.lon
            }}
          />
        </MapView>
      </View>
    )
  }
}

CarLocation.propTypes = {
  navigation: PropTypes.object
}

export default CarLocation
