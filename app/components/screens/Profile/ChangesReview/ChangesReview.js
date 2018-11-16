import React, { Component } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import PropTypes from 'prop-types'
import {fieldNames} from 'constants/profile'
import { Spinner } from 'components/ui'
import {ProfileMain} from 'navigation/routeNames'
import { colors } from 'theme'
import { Button } from 'components/ui'
import styles from './styles'

class ChangesReview extends Component {
  constructor (props) {
    super(props)
    this.profileChanges = this.props.navigation.getParam('profileChanges', [])
  }
  componentDidUpdate (prevProps) {
    const {error, requestPending, navigation} = this.props
    if (prevProps.requestPending && !requestPending) {
      if (error)Alert.alert('Error', error)
      else navigation.navigate(ProfileMain)
    }
  }
  onSaveChanges = () => {
    let changes = {}
    this.profileChanges.forEach(item => {
      if (item.id === 'fullname') changes['full_name'] = item.current
      else changes[item.id] = item.current
    })
    this.props.onUpdateUserProfile(changes)
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
    console.log('profileChanges', profileChanges)
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={this.profileChanges}
          extraData={this.profileChanges}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <Button
          containerStyle={styles.button}
          title='SAVE CHANGES'
          onPress={this.onSaveChanges}
        />
        <Spinner color={colors.red} visible={this.props.requestPending} />
      </View>
    )
  }
}

ChangesReview.propTypes = {
  error: PropTypes.string,
  navigation: PropTypes.object,
  requestPending: PropTypes.bool,
  onUpdateUserProfile: PropTypes.func
}

export default ChangesReview
