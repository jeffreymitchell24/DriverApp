import React, { Component } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import PropTypes from 'prop-types'
import { Button } from 'components/ui'
import {ChangesReview} from 'navigation/routeNames'
import { TextInputView } from 'components/blocks'
import { colors } from 'theme'
import CONFIG from './config'
import styles from './styles'
class ProfileDetails extends Component {
  constructor (props) {
    super(props)
    const {user} = this.props
    const {full_name: fullname = '', address = '', phone = '', email = ''} = user
    this.state = {
      fullname: {value: fullname, editable: false},
      address: {value: address, editable: false},
      phone: {value: phone, editable: false},
      email: {value: email, editable: false}
    }
  }

  onSaveChanges = () => {
    this.props.navigation.navigate(ChangesReview)
  }
  keyExtractor = (item, index) => index.toString()

  onPenPress = (stateName) => {
    if (!this.state[stateName].editable) {
      this.setState(prevState => ({
        [stateName]: {
          value: prevState[stateName].value,
          editable: true
        }
      }))
    }
  }

  onChangeText = (stateName, text) => {
    this.setState(prevState => ({
      [stateName]: {
        editable: prevState[stateName].editable,
        value: text
      }
    }))
  }

  renderItem = ({index, item}) => {
    let {label, stateName} = item
    let {value, editable} = this.state[stateName]

    return (
      <View style={styles.textInputContainer}>
        <TextInputView
          containerStyle={{paddingRight: 40}}
          editable={editable}
          label={label}
          placeholder=''
          value={value}
          onChangeText={(text) => this.onChangeText(stateName, text)}
        />
        <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={styles.editIcon} onPress={() => this.onPenPress(stateName)}>
          <Icon color={editable ? colors.red : colors.gray200} name='pen' size={20} />
        </TouchableOpacity>
      </View>
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={CONFIG}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <Button
          containerStyle={styles.button}
          title='REVIEW CHANGES'
          onPress={this.onSaveChanges}
        />
      </View>
    )
  }
}

ProfileDetails.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object
}

export default ProfileDetails
