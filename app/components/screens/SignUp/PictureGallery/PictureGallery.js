import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import CameraRollPicker from 'react-native-camera-roll-picker'
import {PicturePreview} from 'navigation/routeNames'
import { requestReadStoragePermission } from 'helpers/permission'
import styles from './styles'

class PictureGallery extends Component {
  state = {
    selected: [],
    showGallery: false
  }
  onSelectImage = (data) => {
    console.log('data', data)
    this.props.navigation.navigate(PicturePreview, {
      photoUri: data[0].uri
    })
    this.setState({selected: []})
  }

  checkPermission = async () => {
    let granted = false
    while (!granted) {
      granted = await requestReadStoragePermission()
    }
    this.setState({showGallery: true})
  }

  componentDidMount = () => {
    this.checkPermission()
  }
  render () {
    return (
      <View style={styles.container}>
        {
          this.state.showGallery && (
            <CameraRollPicker
              assetType='Photos'
              batchSize={5}
              callback={this.onSelectImage}
              groupTypes='SavedPhotos'
              imageMargin={5}
              imagesPerRow={3}
              initialListSize={1}
              pageSize={3}
              removeClippedSubviews={false}
              scrollRenderAheadDistance={500}
              selected={this.state.selected}
            />
          )
        }
      </View>
    )
  }
}

PictureGallery.propTypes = {
  navigation: PropTypes.object
}

export default PictureGallery
