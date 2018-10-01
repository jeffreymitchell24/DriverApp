import React, { PureComponent } from 'react'
import { View, ScrollView } from 'react-native'
import { TextInputView } from 'components/blocks'
import { Photo, Button, SectionHeader, HelpCenterSection } from 'components/ui'
import styles from './styles'

export default class RideDamaged extends PureComponent {
  render () {
    return (
      <HelpCenterSection>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='always'
          ref={this.setListRef}
        >
          <View style={styles.form}>
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
              name='Description'
              placeholder='What’s wrong with the car?'
              showLimit
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
