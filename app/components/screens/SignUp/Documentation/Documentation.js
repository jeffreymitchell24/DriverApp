import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { CheckBox } from 'react-native-elements'
import {DocumentsCamera} from 'navigation/routeNames'
import { icons } from 'images'
import { colors } from 'theme'
import styles from './styles'
import { Button } from 'components/ui'

class Documentation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ridesharingApproved: null
    }
  }

  onSubmit = () => {
    const {onSaveSignUpStepData} = this.props
    onSaveSignUpStepData({stepData: {}, step: 2})
  }

  onApprove = () => {
    this.setState({ridesharingApproved: true})
  }
  onDisapprove = () => {
    this.setState({ridesharingApproved: false})
  }

  onChangeAppsPress = () => {

  }

  onPhotoPress = (licenseSide, licenseType) => {
    this.props.navigation.navigate(DocumentsCamera, {
      title: licenseSide,
      licenseType
    })
  }

  render () {
    const {ridesharingApproved} = this.state
    const {tlc, driving} = this.props.licences
    return (
      <ScrollView contentContainerStyle={styles.container} style={{flex: 1}}>
        <Text style={styles.screenTitle}>Upload following documents to get your account approved</Text>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>DRIVING LICENSE</Text>
          <View style={styles.sectionContent}>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Front</Text>
              <TouchableOpacity style={styles.photoContainer} onPress={() => this.onPhotoPress('Front', 'driving')}>
                <Image source={icons['camera']} style={styles.iconCamera} />
              </TouchableOpacity>
            </View>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Back</Text>
              <TouchableOpacity style={styles.photoContainer} onPress={() => this.onPhotoPress('Back', 'driving')}>
                <Image source={icons['camera']} style={styles.iconCamera} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>TLC LICENSE</Text>
          <View style={styles.sectionContent}>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Front</Text>
              <TouchableOpacity style={styles.photoContainer} onPress={() => this.onPhotoPress('Front', 'tlc')}>
                <Image source={icons['camera']} style={styles.iconCamera} />
              </TouchableOpacity>
            </View>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Back</Text>
              <TouchableOpacity style={styles.photoContainer} onPress={() => this.onPhotoPress('Back', 'tlc')}>
                <Image source={icons['camera']} style={styles.iconCamera} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Rideshare apps</Text>
          <View style={[styles.sectionContent, {flexDirection: 'column'}]}>
            <Text style={styles.bigQuestion}>Are you approved to work for any Ridesharing apps?</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={ridesharingApproved}
                checkedColor={colors.red}
                checkedIcon='check-circle'
                containerStyle={styles.checkbox}
                style={{backgroundColor: 'yellow'}}
                textStyle={styles.checkboxTitle}
                title=''
                uncheckedIcon='circle-o'
                onPress={this.onApprove}
              />
              <Text style={styles.checkboxTitle}>Yes, I’m approved</Text>
            </View>
            {
              ridesharingApproved && (
                <Text style={styles.checkboxSubText}>
                  7 apps selected.
                  <Text
                    style={styles.changeAppButton}
                    onPress={this.onChangeAppsPress}
                  > Change
                  </Text>
                </Text>
              )
            }
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={ridesharingApproved === false}
                checkedColor={colors.red}
                checkedIcon='check-circle'
                containerStyle={styles.checkbox}
                textStyle={styles.checkboxTitle}
                title=''
                uncheckedIcon='circle-o'
                onPress={this.onDisapprove}
              />
              <Text style={styles.checkboxTitle}>No, I’m not approved</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            containerStyle={styles.button}
            title='SUBMIT DOCUMENTS'
            onPress={this.onSubmit}
          />
        </View>
      </ScrollView>
    )
  }
}

Documentation.propTypes = {
  licences: PropTypes.object,
  navigation: PropTypes.object,
  onSaveSignUpStepData: PropTypes.func
}

export default Documentation
