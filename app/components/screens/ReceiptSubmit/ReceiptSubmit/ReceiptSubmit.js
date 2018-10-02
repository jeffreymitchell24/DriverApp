import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { TextInputView } from 'components/blocks'
import {ReceiptCamera} from 'navigation/routeNames'
import { Button, Section, SectionHeader, SectionContent, Photo } from 'components/ui'
import styles from './styles'

class ReceiptSubmit extends Component {
  onPhotoPress = () => {
    this.props.navigation.navigate(ReceiptCamera)
  }
  componentWillUnmount () {
    this.props.onClearReceiptPhoto()
  }
  render () {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='always'
      >
        <View style={styles.form}>
          <TextInputView
            // blurOnSubmit={false}
            // error={touched.email && errors.email}
            keyboardType='default'
            label='TITLE'
            name='title'
            placeholder=''
            // returnKeyType={'next'}
            // value={values.email.trim()}
            // onBlur={() => setFieldTouched('email')}
            // onChangeText={handleChange('email')}
            // onSubmitEditing={() => this.inputRefs['password'].focus()}
          />
          <TextInputView
            // blurOnSubmit={false}
            // error={touched.email && errors.email}
            keyboardType='default'
            label='LOCATION'
            name='location'
            placeholder=''
            // returnKeyType={'next'}
            // value={values.email.trim()}
            // onBlur={() => setFieldTouched('email')}
            // onChangeText={handleChange('email')}
            // onSubmitEditing={() => this.inputRefs['password'].focus()}
          />
          <TextInputView
            // blurOnSubmit={false}
            // error={touched.email && errors.email}
            keyboardType='number-pad'
            label='PRICE'
            name='price'
            placeholder=''
            // returnKeyType={'next'}
            // value={values.email.trim()}
            // onBlur={() => setFieldTouched('email')}
            // onChangeText={handleChange('email')}
            // onSubmitEditing={() => this.inputRefs['password'].focus()}
          />
          <TextInputView
            // blurOnSubmit={false}
            // error={touched.email && errors.email}
            keyboardType='default'
            label='DATE'
            name='date'
            placeholder=''
            // returnKeyType={'next'}
            // value={values.email.trim()}
            // onBlur={() => setFieldTouched('email')}
            // onChangeText={handleChange('email')}
            // onSubmitEditing={() => this.inputRefs['password'].focus()}
          />
          <TextInputView
            // blurOnSubmit={false}
            // error={touched.email && errors.email}
            keyboardType='default'
            label='TIME'
            name='time'
            placeholder=''
            // returnKeyType={'next'}
            // value={values.email.trim()}
            // onBlur={() => setFieldTouched('email')}
            // onChangeText={handleChange('email')}
            // onSubmitEditing={() => this.inputRefs['password'].focus()}
          />
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
