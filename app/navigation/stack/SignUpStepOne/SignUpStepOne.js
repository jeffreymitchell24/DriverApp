import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ScrollView,
  Keyboard
} from 'react-native'
import isEmpty from 'lodash/isEmpty'
import { Formik } from 'formik'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInputView } from 'components/blocks'
import { Button } from 'components/ui'
import { StackActions, NavigationActions } from 'react-navigation'
import styles from './styles'
import * as Yup from 'yup'
import { CheckBox } from 'react-native-elements'

const formIputs = {
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword'
}
const validationSchema = Yup.object().shape({
  [formIputs.email]: Yup.string().trim().email('Email format is not correct').required('This field is required.'),
  [formIputs.password]: Yup.string().min(8, 'Password must be at least 8 characters.').required('This field is required.'),
  [formIputs.confirmPassword]: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('This field is required.')
})
class SignUpStepOne extends Component {
  _navigateTo = (routeName) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName })]
    })
    this.props.navigation.dispatch(resetAction)
  }
  onSubmit = (values) => {
    // console.log('onSubmit', values)
    const {email, password, confirmPassword} = values
    let stepData = {
      password,
      confirmPassword,
      email: email.trim()
    }
    this.props.onSaveSignUpStepData({stepData, step: 1})
    Keyboard.dismiss()
    this.props.navigation.navigate('SignUpStepTwo')
  }
  handleTermsPress = () => {
  }

  handleCheckboxPress = (val) => {
    this.setState((state) => ({termsChecked: !state.termsChecked}))
  }
  handleSignInPress = () => {
    this.props.navigation.navigate('SignIn')
  }

  renderForm = ({ setFieldTouched, setFieldValue, handleChange, handleSubmit, errors, values, touched }) => {
    let buttonDisabled = true
    if (isEmpty(errors) && values.termsChecked) buttonDisabled = false
    // console.log('values', values)
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='always'
        ref={this.setListRef}
        style={{flex: 1}}>
        <View style={styles.form}>
          <TextInputView
            error={touched.email && errors.email}
            keyboardType='email-address'
            label='EMAIL'
            name='email'
            placeholder=''
            value={values.email.trim()}
            onBlur={() => setFieldTouched('email')}
            onChangeText={handleChange('email')}
          />
          <TextInputView
            error={touched.password && errors.password}
            label='PASSWORD'
            name='password'
            placeholder=''
            secureTextEntry
            value={values.password}
            onBlur={() => setFieldTouched('password')}
            onChangeText={handleChange('password')}
          />
          <TextInputView
            error={touched.confirmPassword && errors.confirmPassword}
            label='CONFIRM PASSWORD'
            name='confirmPassword'
            placeholder=''
            secureTextEntry
            value={values.confirmPassword}
            onBlur={() => setFieldTouched('confirmPassword')}
            onChangeText={handleChange('confirmPassword')}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={values.termsChecked}
              checkedColor='rgb(240,62,62)'
              checkedIcon='ios-checkbox'
              containerStyle={styles.checkBox}
              iconType='ionicon'
              name='termsChecked'
              size={30}
              uncheckedIcon='md-square-outline'
              onPress={() => setFieldValue('termsChecked', !values.termsChecked)}
            />
            <Text style={styles.checkboxTitle}>
              Accept
              <Text
                style={styles.termsButton}
                onPress={this.handleTermsPress}
              > Terms and Conditions
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            containerStyle={styles.nextButton}
            disabled={buttonDisabled}
            title='Next'
            onPress={handleSubmit}
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
    )
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Formik
          initialValues={{email: '', password: '', confirmPassword: '', termsChecked: false}}
          render={this.renderForm}
          // validate={(values) => {
          //   console.log('validate', values)
          // }}
          validateOnBlur
          // validateOnChange
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        />
      </View>
    )
  }
}

SignUpStepOne.propTypes = {
  navigation: PropTypes.object,
  onSaveSignUpStepData: PropTypes.func
}

export default SignUpStepOne
