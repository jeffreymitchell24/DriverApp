import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { TextInputView } from 'components/blocks'
import { Photo, Button, SectionHeader, HelpCenterSection } from 'components/ui'
import styles from './styles'

class RideMalfunction extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <HelpCenterSection>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.form}>
            <TextInputView
              // blurOnSubmit={false}
              containerStyle={styles.textInput}
              // error={touched.email && errors.email}
              keyboardType='default'
              label='License plate'
              name='plate'
              placeholder='e.g. FYT 1274'
              // returnKeyType={'next'}
              // value={values.email.trim()}
              // onBlur={() => setFieldTouched('email')}
              // onChangeText={handleChange('email')}
              // onSubmitEditing={() => this.inputRefs['password'].focus()}
            />
            <View style={styles.photoListContainer}>
              <SectionHeader
                title='Upload photo (optional)'
              />
              <View style={styles.photoList}>
                <View style={styles.photoContainer}>
                  <Photo />
                </View>
                <View style={styles.photoContainer}>
                  <Photo />
                </View>
                <View style={styles.photoContainer}>
                  <Photo />
                </View>
                <View style={styles.photoContainer}>
                  <Photo />
                </View>
              </View>
            </View>
            <TextInputView
              blurOnSubmit={false}
              keyboardType='default'
              label='Description'
              maxLength={1000}
              multiline
              name='description'
              placeholder='What’s wrong with the car?'
            />
          </View>
          <Button
            // containerStyle={styles.nextButton}
            // disabled={buttonDisabled}
            title='SUBMIT REPORT'
            // onPress={this.handl}
          />
        </ScrollView>

      </HelpCenterSection>
    )
  }
}

export default RideMalfunction
