import React, { PureComponent } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import call from 'react-native-phone-call'
import { HelpCenterSection } from 'components/ui'
import styles from './styles'

class RideAccident extends PureComponent {
  onCallPress = () => {
    const args = {
      number: '821221222', // Use commas to add time between digits.
      prompt: false
    }
    call(args).catch(console.error)
  }
  render () {
    return (
      <HelpCenterSection>
        <Text style={styles.text}>
        Call 9-1-1 to file a police report.
          You are responsible to bring the police report to our office, within 5 business days.
          We’ll walk you through the process from there.
          {'\n'}{'\n'}
         Do you need immediate support?
        </Text>
        <TouchableOpacity onPress={this.onCallPress}>
          <Text style={styles.callText}>Call us at 821-221-222</Text>
        </TouchableOpacity>
      </HelpCenterSection>
    )
  }
}

export default RideAccident
