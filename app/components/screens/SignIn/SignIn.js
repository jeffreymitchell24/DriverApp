import React, {PureComponent} from 'react'
import { View, Text, ScrollView, Keyboard } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import PropTypes from 'prop-types'
import { TextInputView } from 'components/blocks'
import { Button, NavButton } from 'components/ui'
import * as Yup from 'yup'
import { Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import {ResetPassword, Account, RegisterReview, Intro} from 'navigation/routeNames'
import { colors } from 'theme'
// import PropTypes from 'prop-types'
import styles from './styles'

const formIputs = {
  email: 'email',
  password: 'password'
}
const validationSchema = Yup.object().shape({
  [formIputs.email]: Yup.string().trim().email('Email format is not correct').required('This field is required.'),
  [formIputs.password]: Yup.string().min(8, 'Password must be at least 8 characters.').required('This field is required.')
})

class SignIn extends PureComponent {
  static propTypes = {
    error: PropTypes.string,
    isSigninPending: PropTypes.bool,
    isUserAuthed: PropTypes.bool,
    navigation: PropTypes.object,
    onSignIn: PropTypes.func
  }
  static navigationOptions = ({ navigation }) => {
    return {
      // headerLeft: <NavButton icon='arrowLeft' imageStyle={{height: 14, width: 16}} onPress={() => navigation.navigate(Intro)} />
    }
  }
  inputRefs = {}

  componentDidUpdate (prevProps) {
    if (this.props.isUserAuthed !== prevProps.isUserAuthed) {
      this.props.navigation.navigate(RegisterReview)
    }
    // if (this.props.error && !prevProps.error) {
    //   this.formik.setErrors({
    //     email: '',
    //     password: ''
    //   })
    // }
  }

  onSubmit = (values, {setErrors}) => {
    const {onSignIn} = this.props
    Keyboard.dismiss()
    onSignIn(values)
  }

  handleRegisterPress = () => {
    this.props.navigation.navigate(Account, {showFromTop: true})
  }

  handleResetPassPress = () => {
    this.props.navigation.navigate(ResetPassword)
  }

  onSubmitEditing = () => {
    this.inputRefs['password'].focus()
  }

  renderForm = ({ setFieldTouched, handleChange, handleSubmit, errors, values, touched }) => {
    const {error, isSigninPending} = this.props
    let buttonDisabled = true
    if (isEmpty(errors) && touched.email) buttonDisabled = false
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
              onSubmitEditing={this.onSubmitEditing}
            />
            <TextInputView
              error={touched.password && errors.password}
              inputRef={(input) => { this.inputRefs['password'] = input }}
              label='PASSWORD'
              name='password'
              placeholder=''
              secureTextEntry
              value={values.password}
              onBlur={() => setFieldTouched('password')}
              onChangeText={handleChange('password')}
              // onSubmitEditing={Keyboard.dismiss}
            />

            {error && !isSigninPending &&
              <Text style={styles.mainErrorText}>
                {error}
              </Text>
            }

            <Text style={styles.resetButton} onPress={this.handleResetPassPress}>Forgot password?</Text>
          </View>
          <View style={styles.footer}>
            <Button
              containerStyle={styles.button}
              disabled={buttonDisabled}
              title='SIGN IN'
              onPress={handleSubmit}
            />
            <Text style={styles.mainText}>
              Don’t have an account, yet?
              <Text>{'\t'}</Text>
              <Text
                style={styles.registerButtonText}
                onPress={this.handleRegisterPress}
              >Register
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
          initialValues={{email: '', password: ''}}
          ref={node => (this.formik = node)}
          render={this.renderForm}
          validateOnBlur
          // validateOnChange
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        />
        <Spinner color={colors.red} visible={this.props.isSigninPending} />
      </View>
    )
  }
}

export default SignIn
