import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import CameraRollPicker from 'react-native-camera-roll-multi-picker'

import { requestReadStoragePermission } from 'helpers/permission'
import styles from './styles'

class GalleryView extends PureComponent {
  state = {
    selected: [],
    showGallery: false
  }

  onSelectImage = data => {
    this.props.onSelectImage({ photoUri: data[0].uri })

    this.setState({ selected: [] })
  }

  checkPermission = async () => {
    let granted = false

    while (!granted) {
      granted = await requestReadStoragePermission()
    }

    this.setState({ showGallery: true })
  }

  componentDidMount = () => {
    this.checkPermission()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showGallery ? (
          <CameraRollPicker
            assetType={'Photos'}
            batchSize={1}
            callback={this.onSelectImage}
            groupTypes={'SavedPhotos'}
            imageMargin={5}
            imagesPerRow={3}
            initialListSize={1}
            pageSize={3}
            removeClippedSubviews
            scrollRenderAheadDistance={500}
            selected={this.state.selected}
          />
        ) : null}
      </View>
    )
  }
}

GalleryView.propTypes = {
  onSelectImage: PropTypes.func
}

export { GalleryView }
