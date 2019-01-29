import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ScrollView, Keyboard } from 'react-native'
import isEmpty from 'lodash/isEmpty'
import { Formik } from 'formik'
import {
  PersonalInfo,
  SignIn,
  TermsConditions,
  Intro,
  DriverTerms
} from 'navigation/routeNames'
import { TextInputView } from 'components/blocks'
import { Button, NavButton, Spinner } from 'components/ui'
import styles from './styles'
import * as Yup from 'yup'
import { colors } from 'theme'
import { CheckBox } from 'react-native-elements'

const formIputs = {
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword'
}

const validationSchema = Yup.object().shape({
  [formIputs.email]: Yup.string()
    .trim()
    .email('Email format is not correct')
    .required('This field is required.'),
  [formIputs.password]: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .required('This field is required.'),
  [formIputs.confirmPassword]: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('This field is required.')
})

class Account extends PureComponent {
  inputRefs = {}
  values = {}
  state = {
    termsAgree: false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <NavButton
          icon={'arrowLeft'}
          imageStyle={{ height: 14, width: 16 }}
          onPress={() => navigation.navigate(Intro)}
        />
      )
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const prevProps = this.props

    const { isEmailValidating, emailError } = nextProps.emailValidation
    if (!isEmailValidating && prevProps.emailValidation.isEmailValidating) {
      if (emailError) {
        // Alert.alert(
        //   'Email already exists',
        //   'If you already registered, try logging in with your email and password.',
        //   [
        //     {
        //       text: 'OK'
        //     }
        //   ],
        //   { cancelable: false }
        // )
      } else {
        nextProps.onSaveCredentials(this.values)
        nextProps.navigation.navigate(PersonalInfo)
      }
    }
  }

  handleDriverTermsPress = () => {
    this.props.navigation.navigate(DriverTerms)
  }

  onSubmit = (values, { setErrors }) => {
    const { email, password, confirmPassword } = values
    let stepData = {
      password,
      confirmPassword,
      email: email.trim()
    }
    this.values = stepData

    this.props.onValidateEmail({ email: email.trim() })

    Keyboard.dismiss()
  }

  handleTermsPress = () => {
    this.props.navigation.navigate(TermsConditions)
  }

  handleCheckboxPress = val => {
    this.setState(state => ({ termsChecked: !state.termsChecked }))
  }

  handleSignInPress = () => {
    this.props.navigation.navigate(SignIn, { showFromBottom: true })
  }

  renderForm = ({
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched
  }) => {
    const { termsAgree } = this.state

    let buttonDisabled = !(isEmpty(errors) && values.termsChecked && termsAgree)

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps={'always'}
          ref={this.setListRef}
        >
          <View style={styles.form}>
            <TextInputView
              blurOnSubmit={false}
              error={
                this.props.emailValidation.emailError ||
                (touched.email && errors.email)
              }
              inputRef={input => {
                this.inputRefs['email'] = input
              }}
              keyboardType={'email-address'}
              label={'EMAIL'}
              name={'email'}
              placeholder={''}
              returnKeyType={'next'}
              value={values.email.trim()}
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange('email')}
              onSubmitEditing={() => this.inputRefs['password'].focus()}
            />

            <TextInputView
              blurOnSubmit={false}
              error={touched.password && errors.password}
              inputRef={input => {
                this.inputRefs['password'] = input
              }}
              label={'PASSWORD'}
              name={'password'}
              placeholder={''}
              returnKeyType={'next'}
              secureTextEntry
              value={values.password}
              onBlur={() => setFieldTouched('password')}
              onChangeText={handleChange('password')}
              onSubmitEditing={() => this.inputRefs['confirmPassword'].focus()}
            />

            <TextInputView
              error={touched.confirmPassword && errors.confirmPassword}
              inputRef={input => {
                this.inputRefs['confirmPassword'] = input
              }}
              label={'CONFIRM PASSWORD'}
              name={'confirmPassword'}
              placeholder={''}
              secureTextEntry
              value={values.confirmPassword}
              onBlur={() => setFieldTouched('confirmPassword')}
              onChangeText={handleChange('confirmPassword')}
            />

            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={values.termsChecked}
                checkedColor={'rgb(240,62,62)'}
                checkedIcon={'ios-checkbox'}
                containerStyle={styles.checkBox}
                iconType={'ionicon'}
                name={'termsChecked'}
                size={30}
                uncheckedIcon={'md-square-outline'}
                onPress={() =>
                  setFieldValue('termsChecked', !values.termsChecked)
                }
              />

              <Text style={styles.checkboxTitle}>
                {'Accept'}
                <Text
                  style={styles.termsButton}
                  onPress={this.handleTermsPress}
                >
                  {' '}
                  {'Terms and Conditions'}
                </Text>
              </Text>
            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={termsAgree}
                checkedColor={'rgb(240,62,62)'}
                checkedIcon={'ios-checkbox'}
                containerStyle={styles.checkBox}
                iconType={'ionicon'}
                name={'termsChecked'}
                size={30}
                uncheckedIcon={'md-square-outline'}
                onPress={() => this.setState({ termsAgree: !termsAgree })}
              />

              <Text style={styles.checkboxTitle}>
                {'Accept'}
                <Text
                  style={styles.termsButton}
                  onPress={this.handleDriverTermsPress}
                >
                  {' '}
                  {'Drivers Contract'}
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              containerStyle={styles.nextButton}
              disabled={buttonDisabled}
              title={'NEXT'}
              onPress={handleSubmit}
            />

            <Text style={styles.mainText}>
              {'Already have an account?'}
              <Text
                style={styles.signInButtonText}
                onPress={this.handleSignInPress}
              >
                {' '}
                {'Sign in'}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }

  render() {
    const { isEmailValidating } = this.props.emailValidation

    return (
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            termsChecked: false
          }}
          render={this.renderForm}
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        />

        {isEmailValidating ? (
          <Spinner color={colors.red} visible={isEmailValidating} />
        ) : null}
      </View>
    )
  }
}

Account.propTypes = {
  emailValidation: PropTypes.object,
  navigation: PropTypes.object,
  onSaveCredentials: PropTypes.func,
  onValidateEmail: PropTypes.func
}

export default Account
