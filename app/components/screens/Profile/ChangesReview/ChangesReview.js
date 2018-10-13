import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import {fieldNames} from 'constants/profile'
import {ProfileMain} from 'navigation/routeNames'
import { Button } from 'components/ui'
import styles from './styles'

class ChangesReview extends Component {
  onSaveChanges = () => {
    this.props.navigation.navigate(ProfileMain)
  }

  renderSeparator = () => {
    return <View style={styles.listSeparator} />
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item, index}) => {
    const {id, current, previous} = item
    return (
      <View style={styles.changeContainer}>
        <Text style={styles.fieldTitle}>{fieldNames[id].toUpperCase()}</Text>
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
    let profileChanges = this.props.navigation.getParam('profileChanges', [])
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={profileChanges}
          extraData={profileChanges}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <Button
          containerStyle={styles.button}
          title='SAVE CHANGES'
          onPress={this.onSaveChanges}
        />
      </View>
    )
  }
}

ChangesReview.propTypes = {
  navigation: PropTypes.object
}

export default ChangesReview
