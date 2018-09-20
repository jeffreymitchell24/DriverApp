import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ScrollView,
  Keyboard
} from 'react-native'
import isEmpty from 'lodash/isEmpty'
import { Formik } from 'formik'
import {PersonalInfo, SignIn, TermsConditions} from 'navigation/routeNames'
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
class Account extends PureComponent {
  inputRefs = {}

  _navigateTo = (routeName) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onSubmit = (values, {setErrors}) => {
    // console.log('onSubmit', values)
    const {email, password, confirmPassword} = values
    let stepData = {
      password,
      confirmPassword,
      email: email.trim()
    }
    // this.props.onSignUp({email, password, 'password_confirmation': confirmPassword})
    this.props.onSaveCredentials(stepData)
    Keyboard.dismiss()
    this.props.navigation.navigate(PersonalInfo)
  }
  handleTermsPress = () => {
    this.props.navigation.navigate(TermsConditions)
  }

  handleCheckboxPress = (val) => {
    this.setState((state) => ({termsChecked: !state.termsChecked}))
  }
  handleSignInPress = () => {
    this.props.navigation.navigate(SignIn)
  }

  renderForm = ({ setFieldTouched, setFieldValue, handleChange, handleSubmit, errors, values, touched }) => {
    let buttonDisabled = true
    if (isEmpty(errors) && values.termsChecked) buttonDisabled = false
    // console.log('values', values)
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps='always'
          ref={this.setListRef}
          style={{}}>
          <View style={styles.form}>
            <TextInputView
              blurOnSubmit={false}
              error={touched.email && errors.email}
              keyboardType='email-address'
              label='EMAIL'
              name='email'
              placeholder=''
              returnKeyType={'next'}
              value={values.email.trim()}
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange('email')}
              onSubmitEditing={() => this.inputRefs['password'].focus()}
            />
            <TextInputView
              blurOnSubmit={false}
              error={touched.password && errors.password}
              inputRef={(input) => { this.inputRefs['password'] = input }}
              label='PASSWORD'
              name='password'
              placeholder=''
              returnKeyType={'next'}
              secureTextEntry
              value={values.password}
              onBlur={() => setFieldTouched('password')}
              onChangeText={handleChange('password')}
              onSubmitEditing={() => this.inputRefs['confirmPassword'].focus()}
            />
            <TextInputView
              error={touched.confirmPassword && errors.confirmPassword}
              inputRef={(input) => { this.inputRefs['confirmPassword'] = input }}
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
      </View>
    )
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Formik
          initialValues={{email: '', password: '', confirmPassword: '', termsChecked: false}}
          render={this.renderForm}
          validateOnBlur
          // validateOnChange
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        />
      </View>
    )
  }
}

Account.propTypes = {
  navigation: PropTypes.object,
  onSaveCredentials: PropTypes.func
  // onSignUp: PropTypes.func
}

export default Account
