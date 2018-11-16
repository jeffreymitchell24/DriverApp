import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
// import { Button } from 'components/ui'
// import { NavigationEvents } from 'react-navigation'
// import CameraRollPicker from 'react-native-camera-roll-picker'
import CameraRollPicker from 'react-native-camera-roll-multi-picker'
// import ImagePicker from 'react-native-image-picker'
import {PicturePreview} from 'navigation/routeNames'
import { requestReadStoragePermission } from 'helpers/permission'
import styles from './styles'
// var options = {
//   title: 'Select Avatar',
//   // customButtons: [
//   //   {name: 'fb', title: 'Choose Photo from Facebook'}
//   // ],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images'
//   },
//   noData: true
// }
class PictureGallery extends Component {
  state = {
    selected: [],
    showGallery: false
  }
  pickerIsOpened= false

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
    // ImagePicker.launchImageLibrary(options, (response) => {
    //   console.log('Response = ', response)
    //   this.props.navigation.navigate(PicturePreview, {
    //     photoUri: response.uri
    //   })
    // })
  }

  // onOpenPickerPress = (payload) => {
  //   if (!this.pickerIsOpened) {
  //     this.pickerIsOpened = true
  //     ImagePicker.showImagePicker(options, (response) => {
  //       console.log('Response = ', response)
  //       this.pickerIsOpened = false
  //       if (response.didCancel || response.error) {
  //         this.props.navigation.goBack()
  //       } else {
  //         this.props.navigation.navigate(PicturePreview, {
  //           photoUri: response.uri
  //         })
  //       }
  //     })
  //   }
  // }
  render () {
    return (
      <View style={styles.container}>
        {/* <NavigationEvents
          onDidBlur={payload => console.log('did blur',payload)}
          onDidFocus={this.onOpenPickerPress}
          onWillBlur={payload => console.log('will blur',payload)}
          onWillFocus={this.onOpenPickerPress}
        /> */}
        {
          this.state.showGallery && (
            <CameraRollPicker
              assetType='Photos'
              batchSize={1}
              callback={this.onSelectImage}
              groupTypes='SavedPhotos'
              imageMargin={5}
              imagesPerRow={3}
              initialListSize={1}
              pageSize={3}
              removeClippedSubviews
              scrollRenderAheadDistance={500}
              selected={this.state.selected}
            />
          )
        }
        {/* <Button
          containerStyle={styles.button}
          title='OPEN GALLERY'
          onPress={this.onOpenPickerPress}
        /> */}
      </View>
    )
  }
}

PictureGallery.propTypes = {
  navigation: PropTypes.object
}

export default PictureGallery
