import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'
import { icons } from 'images'
import { CheckBox } from 'react-native-elements'
import { colors } from 'theme'
import { Button } from 'components/ui'
import { StackActions, NavigationActions } from 'react-navigation'

class StepUpStepThree extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ridesharingApproved: null
    }
  }

  _navigateTo = (routeName) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onSubmit = () => {
    const {onSaveSignUpStepData} = this.props
    onSaveSignUpStepData({stepData: {}, step: 2})
  }

  onApprove = () => {
    this.setState({ridesharingApproved: true})
  }
  onUnapprove = () => {
    this.setState({ridesharingApproved: false})
  }

  onChangeAppsPress = () => {

  }

  render () {
    const {ridesharingApproved} = this.state
    return (
      <ScrollView contentContainerStyle={styles.container} style={{flex: 1}}>
        <Text style={styles.screenTitle}>Upload following documents to get your account approved</Text>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>DRIVING LICENSE</Text>
          <View style={styles.sectionContent}>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Front</Text>
              <View style={styles.photoContainer}>
                <Image source={icons['camera']} style={styles.iconCamera} />
              </View>
            </View>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Back</Text>
              <View style={styles.photoContainer}>
                <Image source={icons['camera']} style={styles.iconCamera} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>TLC LICENSE</Text>
          <View style={styles.sectionContent}>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Front</Text>
              <View style={styles.photoContainer}>
                <Image source={icons['camera']} style={styles.iconCamera} />
              </View>
            </View>
            <View style={styles.licensePhotoBlock}>
              <Text style={styles.photoLabel}>Back</Text>
              <View style={styles.photoContainer}>
                <Image source={icons['camera']} style={styles.iconCamera} />
              </View>
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
                onPress={this.onUnapprove}
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

StepUpStepThree.propTypes = {
  navigation: PropTypes.object,
  onSaveSignUpStepData: PropTypes.func
}

export default StepUpStepThree
