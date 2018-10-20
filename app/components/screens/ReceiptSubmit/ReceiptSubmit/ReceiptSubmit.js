import React, { Component } from 'react'
import { View, ScrollView, TouchableWithoutFeedback, Alert, Animated, TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { requestMainPermissions } from 'helpers/permission'
import { TextInputView } from 'components/blocks'
import {getCurrentDateAndTime, formatDate, formatTime} from 'helpers/date'
import {ReceiptCamera} from 'navigation/routeNames'
import { Button, Section, SectionHeader, SectionContent, Photo } from 'components/ui'
import styles from './styles'

const RECEIPT_TYPES = ['Gas bill', 'Parking ticket', 'Traffic ticket', 'Repair bill', 'Toll', 'Proof of damage']

class ReceiptSubmit extends Component {
  isHiddenPicker = true
  constructor (props) {
    super(props)
    const {time, date} = getCurrentDateAndTime()
    console.log(time, date)
    this.state = {
      showPicker: false,
      pickerMode: 'time',
      date,
      time,
      expanded: false,
      animation: new Animated.Value(0),
      receiptType: ''
    }
  }

  componentDidUpdate (prevProps) {
    const {error, requestPending, navigation} = this.props
    if (prevProps.requestPending && !requestPending) {
      if (error)Alert.alert('Error', error)
      else navigation.goBack()
    }
  }

  onReceiptTypeSelect = (type) => {
    this.setState({receiptType: type}, () => this.toggle())
  }

  toggle = () => {
    var toValue = 0

    if (this.isHiddenPicker) {
      toValue = 180
    }

    // This will animate the transalteY of the subview between 0 & 100 depending on its current state
    // 100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.animation,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8
      }
    ).start()

    this.isHiddenPicker = !this.isHiddenPicker
  }

  onPhotoPress = async () => {
    let granted = await requestMainPermissions()
    if (granted) this.props.navigation.navigate(ReceiptCamera)
  }
  onHideDateTimePicker = () => {
    this.setState({showPicker: false})
  }
  onDateTimePicked = (date) => {
    console.log('date', date)
    if (this.state.pickerMode === 'time') {
      this.setState({showPicker: false, time: formatTime(date)})
    } else {
      this.setState({showPicker: false, date: formatDate(date)})
    }
  }
  componentWillUnmount () {
    this.props.onClearReceiptPhoto()
  }
  onDatePress = () => {
    this.setState({showPicker: true, pickerMode: 'date'})
  }
  onTimePress = () => {
    this.setState({showPicker: true, pickerMode: 'time'})
  }

  renderDropDown = () => {
    return (
      <Animated.View style={[styles.dropdown, {height: this.state.animation}]}>
        {RECEIPT_TYPES.map((type, i) => {
          let extraStyle = {}
          if (i === RECEIPT_TYPES.length - 1) extraStyle = { borderBottomWidth: 2 }
          else if (i === 0)extraStyle = { borderTopWidth: 0 }
          return (
            <TouchableOpacity key={i} style={[styles.dropdownItem, extraStyle]} onPress={() => this.onReceiptTypeSelect(type)}>
              <Text style={styles.dropdownItemText}>{type}</Text>
            </TouchableOpacity>
          )
        })}
      </Animated.View>
    )
  }
  render () {
    console.log(this.state)
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='always'
      >
        <View style={styles.form}>
          <TouchableWithoutFeedback onPress={this.toggle}>
            <View pointerEvents='box-only'>
              <TextInputView
                containerStyle={{marginBottom: 0}}
                keyboardType='default'
                label='TITLE'
                name='title'
                placeholder=''
                value={this.state.receiptType}
              />
            </View>
          </TouchableWithoutFeedback>
          {this.renderDropDown()}
          <TextInputView
            keyboardType='default'
            label='LOCATION'
            name='location'
            placeholder=''
          />
          <TextInputView
            keyboardType='number-pad'
            label='PRICE'
            name='price'
            placeholder=''
          />
          <TouchableWithoutFeedback onPress={this.onDatePress}>
            <View pointerEvents='box-only'>
              <TextInputView
                keyboardType='default'
                label='DATE'
                name='date'
                placeholder=''
                value={this.state.date}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onTimePress}>
            <View pointerEvents='box-only'>
              <TextInputView
                keyboardType='default'
                label='TIME'
                name='time'
                placeholder=''
                value={this.state.time}
              />
            </View>
          </TouchableWithoutFeedback>
          <Section style={styles.photoUploadSection}>
            <SectionHeader title='RECEIPT PHOTO' />
            <SectionContent>
              <Photo
                imageUri={this.props.receiptPhoto}
                onPress={this.onPhotoPress}
              />
            </SectionContent>
          </Section>
        </View>
        <Button
          // containerStyle={styles.nextButton}
          // disabled={buttonDisabled}
          title='SUBMIT'
          // onPress={this.handl}
        />
        <DateTimePicker
          isVisible={this.state.showPicker}
          mode={this.state.pickerMode}
          onCancel={this.onHideDateTimePicker}
          onConfirm={this.onDateTimePicked}
        />
      </ScrollView>
    )
  }
}

ReceiptSubmit.propTypes = {
  error: PropTypes.string,
  navigation: PropTypes.object,
  receiptPhoto: PropTypes.string,
  requestPending: PropTypes.bool,
  ride: PropTypes.object,
  onClearReceiptPhoto: PropTypes.func
}

export default ReceiptSubmit
