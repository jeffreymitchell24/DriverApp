import React, {PureComponent} from 'react'
import { View, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { TextInputView } from 'components/blocks'
import { Button } from 'components/ui'
import * as Yup from 'yup'
import { Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import {ResetPassword, Account} from 'navigation/routeNames'
// import PropTypes from 'prop-types'
import styles from './styles'

const formIputs = {
  email: 'email',
  password: 'password'
}
const validationSchema = Yup.object().shape({
  [formIputs.email]: Yup.string().trim().email('Email format is not correct').required('This field is required.'),
  [formIputs.password]: Yup.string().required('This field is required.')
})

class SignIn extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object
  }
  onSubmit = () => {

  }

  handleRegisterPress = () => {
    this.props.navigation.navigate(Account)
  }

  handleResetPassPress = () => {
    this.props.navigation.navigate(ResetPassword)
  }

  renderForm = ({ setFieldTouched, handleChange, handleSubmit, errors, values, touched }) => {
    let buttonDisabled = true
    if (isEmpty(errors) && touched.email && touched.password) buttonDisabled = false
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
            <Text
              style={styles.registerButtonText}
              onPress={this.handleRegisterPress}
            > Register
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
          initialValues={{email: '', password: ''}}
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

export default SignIn
