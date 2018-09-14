import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

import { TextInputView } from 'components/blocks'
import { Button } from 'components/ui'

class SignUpStepTwo extends Component {
  onSubmit = () => {
    const {onSaveSignUpStepData} = this.props
    onSaveSignUpStepData({stepData: {}, step: 2})
    this.props.navigation.navigate('SignUpStepThree')
  }

  render () {
    // let { email, password, confirmPassword } = this.state
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <ScrollView
          contentContainerStyle={styles.container}
          style={{flex: 1}}
        >
          <View style={styles.form}>
            <TextInputView
              label='FULL NAME'
              name='fullname'
              placeholder=''
            />
            <TextInputView
              label='STREET'
              name='street'
              placeholder=''
            />
            <TextInputView
              label='CITY'
              name='city'
              placeholder=''
            />
            <TextInputView
              keyboardType='numeric'
              label='ZIP CODE'
              name='zipcode'
              placeholder=''
            />
            <TextInputView
              label='STATE'
              name='state'
              placeholder=''
            />
            <TextInputView
              label='PHONE NUMBER'
              name='phone'
              placeholder=''
            />
          </View>
          <View style={styles.footer}>
            <Button
              containerStyle={styles.button}
              title='UPLOAD DOCUMENT'
              onPress={this.onSubmit}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

SignUpStepTwo.propTypes = {
  navigation: PropTypes.object,
  onSaveSignUpStepData: PropTypes.func
}

export default SignUpStepTwo
