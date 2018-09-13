import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInputView } from 'components/blocks'
import { Button } from 'components/ui'
import { StackActions, NavigationActions } from 'react-navigation'
import styles from './styles'

import { CheckBox } from 'react-native-elements'
let width
class SignUpStepOne extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      termsChecked: false
    }
  }

  _navigateTo = (routeName) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName })],
    })
    this.props.navigation.dispatch(resetAction)
  }

  handleNextPress = () => {
    // this._navigateTo('PersonalInfo')
    console.log('NEXT')
  }

  handleCheckboxPress = () => {
    this.setState((state) => ({termsChecked: !state.termsChecked}))
  }

  render () {
    let { email, password, confirmPassword } = this.state
    return (
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='always'
          ref={this.setListRef}
          style={{flex: 1}}>
          <View style={styles.form}>
            <TextInputView
              ref='email'
              text="EMAIL"
              placeholder=''
            />
            <TextInputView
              ref='password'
              text="PASSWORD"
              placeholder=''
              secureTextEntry
            />
            <TextInputView
              ref='email'
              text="CONFIRM PASSWORD"
              placeholder=''
              secureTextEntry
            />
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={this.state.termsChecked}
                checkedColor='rgb(240,62,62)'
                checkedIcon='check-square'
                // containerStyle={{ height: '100%', borderWidth: 0, marginLeft: 0, marginBottom: 0, marginTop: 0, marginRight: -5, paddingLeft: 0, paddingBottom: 0, paddingTop: 0, paddingRight: 0, backgroundColor: '#fff' }}
                size={30}
                style={styles.checkBox}
                uncheckedIcon='square-o'
                onPress={this.handleCheckboxPress}
              />
              <Text style={{ alignSelf: 'stretch', fontSize: width * 0.045, color: 'rgb(240,62,62)' }}><Text style={{ color: '#000' }}>Accept</Text> Terms and Conditions</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Button
              containerStyle={styles.nextButton}
              disabled
              title='Next'
              onPress={this.handleNextPress}
            />
            <Text style={styles.mainText}>
              Already have an account?
              <Text
                style={styles.signInButtonText}
                onPress={this.handleSignInPress}
              > Sign in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default SignUpStepOne
