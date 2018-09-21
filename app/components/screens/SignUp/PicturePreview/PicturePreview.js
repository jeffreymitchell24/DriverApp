import React, { Component } from 'react'
import { ImageBackground, TouchableOpacity, Alert } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import {Documentation} from 'navigation/routeNames'
import { colors } from 'theme'
import styles from './styles'

class PicturePreview extends Component {
  state = {
    key: 0
  }
  onCancelPress = () => {
    this.props.navigation.goBack()
  }

  onConfirmPress = () => {
    const {onUpdateLicense, selectedLicense, navigation} = this.props
    const {type, side} = selectedLicense
    const imageUri = navigation.getParam('photoUri', null)
    // Alert.alert('photoUri', imageUri)
    onUpdateLicense({
      type,
      side,
      imageUri
    })
    navigation.navigate(Documentation)
  }
  onError = () => {
    console.log('onError')
    const {key} = this.state
    if (key === 0) {
      this.setState({key: 1})
      Alert.alert('onError', 'onError')
    }
  }
  onLoadEnd = (e) => {
    console.log('onLoadEnd', e)
    const {key} = this.state
    if (key === 0) {
      this.setState({key: 1})
      Alert.alert('onLoadEnd', 'onLoadEnd')
    }
  }

  render () {
    const photoUri = this.props.navigation.getParam('photoUri', null)
    console.log(this.state.key)
    return (
      <ImageBackground
        imageStyle={[styles.preview, !photoUri && {backgroundColor: 'yellow'}]}
        key={this.state.key}
        source={{uri: photoUri}} style={{width: '100%', height: '100%'}}
        // onError={this.onError}
        // onLoad={() => console.log('loaded!')}
        // onLoadEnd={this.onLoadEnd}
      >
        <TouchableOpacity style={styles.cancel} onPress={this.onCancelPress}>
          <Icon color={colors.white} name='x' size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirm} onPress={this.onConfirmPress} >
          <Icon color={colors.white} name='check' size={30} />
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}
PicturePreview.propTypes = {
  navigation: PropTypes.object,
  selectedLicense: PropTypes.object,
  onUpdateLicense: PropTypes.func
}

export default PicturePreview
