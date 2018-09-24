import React, {PureComponent} from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import PropTypes from 'prop-types'
import { TextInputView } from 'components/blocks'
import { Button } from 'components/ui'
import * as Yup from 'yup'
import { Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import { colors } from 'theme'
import styles from './styles'

const formIputs = {
  email: 'email'
}
const validationSchema = Yup.object().shape({
  [formIputs.email]: Yup.string().trim().email('Email format is not correct').required('This field is required.')
})

class ChangePassword extends PureComponent {
  static propTypes = {
    error: PropTypes.string,
    // navigation: PropTypes.object,
    isRequestPending: PropTypes.bool,
    isResetLinkSent: PropTypes.bool,
    onResetPasword: PropTypes.func
  }
  componentDidUpdate (prevProps) {
    if (this.props.isResetLinkSent && !prevProps.isResetLinkSent) {
      setTimeout(() => {
        Alert.alert('', 'Reset password link has been sent')
      }, 1)
    }
  }
  onSubmit = (values) => {
    this.props.onResetPasword(values.email)
  }

  renderForm = ({ setFieldTouched, handleChange, handleSubmit, errors, values, touched, isValid }) => {
    const {error, isRequestPending} = this.props
    let buttonDisabled = true
    if (isEmpty(errors) && isValid) buttonDisabled = false
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='always'
        ref={this.setListRef}
        style={{}}>
        <View style={styles.form}>
          <TextInputView
            error={errors.email}
            keyboardType='email-address'
            label='REGISTERED EMAIL'
            name='email'
            placeholder=''
            value={values.email.trim()}
            onBlur={() => setFieldTouched('email')}
            onChangeText={handleChange('email')}
          />
          {error && !isRequestPending &&
            <Text style={styles.mainErrorText}>
              {error}
            </Text>
          }
        </View>
        <View style={styles.footer}>
          <Button
            containerStyle={styles.button}
            disabled={buttonDisabled}
            title='RESEND PASSWORD'
            onPress={handleSubmit}
          />
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
          validateOnChange
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        />
        <Spinner color={colors.red} visible={this.props.isRequestPending} />
      </View>
    )
  }
}

export default ChangePassword
