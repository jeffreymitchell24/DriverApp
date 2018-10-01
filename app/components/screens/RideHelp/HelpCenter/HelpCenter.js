import React, { PureComponent } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {RideLateDescription, BookingDetail} from 'navigation/routeNames'
import { HelpCenterSection } from 'components/ui'
import PropTypes from 'prop-types'
import CONFIG from './config'
import { colors } from 'theme'
import styles from './styles'

class HelpCenter extends PureComponent {
  onOkPress = () => {
    this.props.navigation.navigate(BookingDetail)
  }
  onMorePress = () => {
    this.props.navigation.navigate(RideLateDescription)
  }
  onLatePress = () => {
    Alert.alert(
      'Thank you for notifying us',
      'Our administrator has been notified. You can add more details about why you are being late (optional).',
      [
        {text: 'OK', onPress: () => this.onOkPress()},
        {text: 'More', onPress: () => this.onMorePress()}
      ],
      { cancelable: false }
    )
  }

  keyExtractor = (item, index) => item.id
  renderSeparator = () => <View style={styles.listSeparator} />

  renderListItem = ({item}) => {
    let {text, routeName, id} = item
    let onPress = () => this.props.navigation.navigate(routeName)
    if (id === 'late') {
      onPress = this.onLatePress
    }
    return (
      <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <Text style={styles.listItemText}>{text}</Text>
        <Icon color={colors.gray25} name='ios-arrow-forward' size={22} />
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <HelpCenterSection>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={CONFIG}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderListItem}
        />
      </HelpCenterSection>
    )
  }
}
HelpCenter.propTypes = {
  navigation: PropTypes.object
}

export default HelpCenter
