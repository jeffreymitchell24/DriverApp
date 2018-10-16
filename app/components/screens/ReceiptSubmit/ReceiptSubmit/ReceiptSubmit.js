import React, { Component } from 'react'
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { requestMainPermissions } from 'helpers/permission'
import { TextInputView } from 'components/blocks'
import {getCurrentDateAndTime, formatDate, formatTime} from 'helpers/date'
import {ReceiptCamera} from 'navigation/routeNames'
import { Button, Section, SectionHeader, SectionContent, Photo } from 'components/ui'
import styles from './styles'

class ReceiptSubmit extends Component {
  constructor (props) {
    super(props)
    const {time, date} = getCurrentDateAndTime()
    console.log(time, date)
    this.state = {
      showPicker: false,
      pickerMode: 'time',
      date,
      time
    }
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
    this.setState({showPicker: true, pickerMode: 'datetime'})
  }
  onTimePress = () => {
    this.setState({showPicker: true, pickerMode: 'datetime'})
  }
  render () {
    console.log(this.state)
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='always'
      >
        <View style={styles.form}>
          <TextInputView
            keyboardType='default'
            label='TITLE'
            name='title'
            placeholder=''
          />
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
  navigation: PropTypes.object,
  receiptPhoto: PropTypes.string,
  onClearReceiptPhoto: PropTypes.func
}

export default ReceiptSubmit
