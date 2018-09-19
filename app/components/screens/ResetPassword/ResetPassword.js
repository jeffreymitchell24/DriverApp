import React, {PureComponent} from 'react'
import { View, ScrollView } from 'react-native'
// import PropTypes from 'prop-types'
import { TextInputView } from 'components/blocks'
import { Button } from 'components/ui'
import * as Yup from 'yup'
import { Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
// import PropTypes from 'prop-types'
import styles from './styles'

const formIputs = {
  email: 'email'
}
const validationSchema = Yup.object().shape({
  [formIputs.email]: Yup.string().trim().email('Email format is not correct').required('This field is required.')
})

class ResetPassword extends PureComponent {
  static propTypes = {
    // navigation: PropTypes.object
  }
  onSubmit = () => {

  }

  renderForm = ({ setFieldTouched, handleChange, handleSubmit, errors, values, touched, isValid }) => {
    let buttonDisabled = true
    if (isEmpty(errors) && isValid) buttonDisabled = false
    console.log(touched, errors)
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='always'
        ref={this.setListRef}
        style={{flex: 1}}>
        <View style={styles.form}>
          <TextInputView
            error={errors.email}
            keyboardType='email-address'
            label='EMAIL'
            name='email'
            placeholder=''
            value={values.email.trim()}
            onBlur={() => setFieldTouched('email')}
            onChangeText={handleChange('email')}
          />
        </View>
        <View style={styles.footer}>
          <Button
            containerStyle={styles.button}
            disabled={buttonDisabled}
            title='SEND RESET PASSWORD EMAIL'
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
      </View>
    )
  }
}

export default ResetPassword
