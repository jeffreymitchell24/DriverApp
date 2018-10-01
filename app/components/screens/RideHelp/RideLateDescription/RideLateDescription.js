import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { TextInputView } from 'components/blocks'
import { Photo, Button, SectionHeader, HelpCenterSection, RadioButton } from 'components/ui'
import styles from './styles'

export default class RideLateDescription extends PureComponent {
  state = {
    delay: null
  }
  render () {
    let {delay} = this.state
    return (
      <HelpCenterSection>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.form}>
            <View style={styles.delayContainer}>
              <SectionHeader
                title='Delaying'
              />
              <View>
                <TouchableOpacity style={styles.checkboxContainer} onPress={() => this.setState({delay: 15})}>
                  <RadioButton
                    checked={delay === 15}
                    checkedIcon='md-radio-button-on'
                    onPress={() => this.setState({delay: 15})}
                  />
                  <Text style={styles.checkboxTitle}>15 minutes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkboxContainer} onPress={() => this.setState({delay: 30})}>
                  <RadioButton
                    checked={delay === 30}
                    checkedIcon='md-radio-button-on'
                    onPress={() => this.setState({delay: 30})}
                  />
                  <Text style={styles.checkboxTitle}>30 minutes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkboxContainer} onPress={() => this.setState({delay: 45})}>
                  <RadioButton
                    checked={delay === 45}
                    checkedIcon='md-radio-button-on'
                    onPress={() => this.setState({delay: 45})}
                  />
                  <Text style={styles.checkboxTitle}>45 minutes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkboxContainer} onPress={() => this.setState({delay: 60})}>
                  <RadioButton
                    checked={delay === 60}
                    checkedIcon='md-radio-button-on'
                    onPress={() => this.setState({delay: 60})}
                  />
                  <Text style={styles.checkboxTitle}>1 hour</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.photoUploadContainer}>
              <SectionHeader
                title='Upload photo'
              />
              <View style={styles.photoContainer}>
                <Photo />
              </View>
            </View>
            <TextInputView
              blurOnSubmit={false}
              keyboardType='default'
              label='Reason'
              maxLength={1000}
              multiline
              name='reason'
              placeholder='Why are you late?'
              showLimit
            />
          </View>
          <Button
            title='SUBMIT REPORT'
            // onPress={this.handl}
          />
        </ScrollView>
      </HelpCenterSection>
    )
  }
}
