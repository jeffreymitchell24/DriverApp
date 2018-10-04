import React, { Component } from 'react'
import { View, FlatList, TouchableOpacity, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Spinner from 'react-native-loading-spinner-overlay'
import forEach from 'lodash/forEach'
import PropTypes from 'prop-types'
import { Button } from 'components/ui'
import {ChangesReview} from 'navigation/routeNames'
import { TextInputView } from 'components/blocks'
import { colors } from 'theme'
import CONFIG from './config'
import styles from './styles'
class ProfileDetails extends Component {
  inputRefs = {}
  constructor (props) {
    super(props)
    const {user} = this.props
    const {full_name: fullname = '', address = '', phone = '', email = ''} = user
    this.originalData = {fullname, address, phone, email}
    this.state = {
      editableField: '',
      fullname: {value: fullname, changed: false},
      address: {value: address, changed: false},
      phone: {value: phone, changed: false},
      email: {value: email, changed: false}
    }
  }
  componentDidUpdate (prevProps) {
    const {isEmailValidating, emailError} = this.props.emailValidation
    if (!isEmailValidating && prevProps.emailValidation.isEmailValidating && !emailError) {
      this.reviewChanges()
    }
  }

  onSaveChanges = () => {
    Keyboard.dismiss()
    const {email} = this.state
    if (email.value.trim() !== this.originalData.email) this.props.onValidateEmail({email: email.value.trim()})
    else this.reviewChanges()
  }

  reviewChanges = () => {
    let profileChanges = []
    forEach(this.state, (field, fieldName) => {
      if (field.changed) {
        profileChanges.push({id: fieldName, previous: this.originalData[fieldName], current: field.value})
      }
    })

    this.props.navigation.navigate(ChangesReview, {profileChanges})
  }
  keyExtractor = (item, index) => index.toString()

  onPenPress = (fieldName) => {
    this.setState(prevState => {
      let isEditing = prevState.editableField === fieldName

      let value = !isEditing ? prevState[fieldName].value
        : prevState[fieldName].value === '' ? this.originalData[fieldName] : prevState[fieldName].value

      return {
        editableField: isEditing ? '' : fieldName,
        [fieldName]: {value, changed: value !== this.originalData[fieldName]}
      }
    }, () => {
      this.state.editableField === fieldName && this.inputRefs[fieldName].focus()
    })
  }

  onChangeText = (stateName, text) => {
    this.setState(prevState => {
      return {
        [stateName]: {
          value: text,
          changed: text !== this.originalData[stateName]
        }
      }
    })
  }

  isSubmitActive = () => {
    const {fullname, address, phone, email, editableField} = this.state
    return (fullname.changed || address.changed || phone.changed || email.changed) && !editableField
  }

  renderItem = ({index, item}) => {
    const {isEmailValidating, emailError} = this.props.emailValidation
    let {label, stateName} = item
    let editable = this.state.editableField === stateName
    let {value} = this.state[stateName]
    let showError = stateName === 'email' && !isEmailValidating && emailError

    let extraProps = {}
    if (stateName === 'phone') {
      extraProps.mask = '+1 [000]-[000]-[0000]'
      extraProps.refInput = (input) => { this.inputRefs[stateName] = input }
    } else extraProps.inputRef = (input) => { this.inputRefs[stateName] = input }

    return (
      <View style={styles.textInputContainer}>
        <TextInputView
          {...extraProps}
          containerStyle={{paddingRight: 40}}
          editable={editable}
          error={showError ? emailError : null}
          label={label}
          placeholder=''
          value={value}
          onChangeText={(text) => this.onChangeText(stateName, text)}
        />
        <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={styles.editIcon} onPress={() => this.onPenPress(stateName)}>
          <Icon color={editable ? colors.red : colors.gray200} name={editable ? 'check' : 'pen'} size={editable ? 25 : 20} />
        </TouchableOpacity>
      </View>
    )
  }
  render () {
    console.log(this.state)
    let isButtonActive = this.isSubmitActive()
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={CONFIG}
          extraData={{state: this.state, email: this.props.emailValidation}}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <Button
          containerStyle={styles.button}
          disabled={!isButtonActive}
          title='REVIEW CHANGES'
          onPress={this.onSaveChanges}
        />
        <Spinner color={colors.red} visible={this.props.emailValidation.isEmailValidating} />
      </View>
    )
  }
}

ProfileDetails.propTypes = {
  emailValidation: PropTypes.object,
  navigation: PropTypes.object,
  user: PropTypes.object,
  onValidateEmail: PropTypes.func
}

export default ProfileDetails
