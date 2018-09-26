import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'components/ui'
import {ChangesReview} from 'navigation/routeNames'
import { TextInputView } from 'components/blocks'
import CONFIG from './config'
import styles from './styles'
class ProfileDetails extends Component {
  constructor (props) {
    super(props)
    const {user} = this.props
    const {full_name: fullname = '', street = '', zip_code: zipcode = '', city = '', state = '', phone = '', email = ''} = user
    this.state = {
      fullname: {value: fullname, editable: false},
      street: {value: street, editable: false},
      zipcode: {value: zipcode, editable: false},
      city: {value: city, editable: false},
      state: {value: state, editable: false},
      phone: {value: phone, editable: false},
      email: {value: email, editable: false}
    }
  }

  onSaveChanges = () => {
    this.props.navigation.navigate(ChangesReview)
  }
  keyExtractor = (item, index) => index.toString()

  renderItem = ({index, item}) => {
    let {label, stateName} = item
    let {value, editable} = this.state[stateName]
    return (
      <TextInputView
        editable={editable}
        label={label}
        placeholder=''
        value={value}
      />
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
