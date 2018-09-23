import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Button } from 'components/ui'
import styles from './styles'

let CHANGES = [
  {
    title: 'Full Name',
    current: 'Kyle Freedman',
    previous: 'Rosalie Joseph'
  },
  {
    title: 'Full Name',
    current: 'Kyle Freedman',
    previous: 'Rosalie Joseph'
  },
  {
    title: 'Full Name',
    current: 'Kyle Freedman',
    previous: 'Rosalie Joseph'
  },
  {
    title: 'Full Name',
    current: 'Kyle Freedman',
    previous: 'Rosalie Joseph'
  },
  {
    title: 'City',
    current: 'New York',
    previous: 'Washington'
  }
]
class ChangesReview extends Component {
  onSaveChanges = () => {

  }

  renderSeparator = () => {
    return <View style={styles.listSeparator} />
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item, index}) => {
    const {title, current, previous} = item
    return (
      <View style={styles.changeContainer}>
        <Text style={styles.fieldTitle}>{title.toUpperCase()}</Text>
        <View style={{marginTop: 14}}>
          <Text style={styles.optionTitle}>Previous</Text>
          <Text style={styles.prevText}>{previous}</Text>
        </View>
        <View style={{marginTop: 16}}>
          <Text style={styles.optionTitle}>Current</Text>
          <Text style={styles.currentText}>{current}</Text>
        </View>
      </View>
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={CHANGES}
          extraData={CHANGES}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <Button
          containerStyle={styles.button}
          title='RESEND PASSWORD'
          onPress={this.onSaveChanges}
        />
      </View>
    )
  }
}

export default ChangesReview
