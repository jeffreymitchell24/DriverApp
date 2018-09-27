import React, { Component } from 'react'
import { View, Text } from 'react-native'
// import MapView from 'react-native-maps'
import styles from './styles'
class CarLocation extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {/* <MapView
          initialRegion={{
            latitude: 37.782189,
            longitude: -122.451182,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}
          showsScale={false}
          style={styles.map}
        >
          <MapView.Marker
            coordinate={{
              latitude: 37.782189,
              longitude: -122.451182
            }}
          />
        </MapView> */}
      </View>
    )
  }
}
export default CarLocation
