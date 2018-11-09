import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native'
// import { NavBackImage } from 'components/ui'

import { icons } from 'images'

import { styles } from './styles'

class VehicleOptions extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Vehicle options'
    }
  }

  state = {
    error: ''
  }

  handleItemPress = item => {
    const {
      filters: { categories },
      onFilterUpdate
    } = this.props

    const nextCategories = categories.map(cat => {
      if (cat.id === item.id) {
        return {
          ...item,
          selected: !cat.selected
        }
      }

      return cat
    })

    console.log(
      nextCategories,
      _.every(nextCategories, cat => cat.selected === false)
    )

    if (_.every(nextCategories, cat => cat.selected === false)) {
      this.setState({
        error: 'Select at least one vehicle option'
      })
    } else {
      this.setState({
        error: ''
      })
    }

    onFilterUpdate('categories', nextCategories)
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => this.handleItemPress(item)}
      >
        <View style={[styles.resultRow, styles.bottomBorder]}>
          <Text style={styles.resultRowText}>{item.name}</Text>
          {item.selected && (
            <Image source={icons.selected} style={{ width: 15, height: 10 }} />
          )}
          {}
        </View>
      </TouchableOpacity>
    )
  }

  renderFooter = () => {
    return (
      <Text
        style={{
          fontSize: 13,
          fontFamily: 'Helvetica',
          color: '#F03E3E'
        }}
      >
        {this.state.error}
      </Text>
    )
  }

  render() {
    const {
      filters: { categories }
    } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.bottomBorder} />
        <FlatList
          ListFooterComponent={this.renderFooter}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

VehicleOptions.propTypes = {
  filters: PropTypes.object,
  // navigation: PropTypes.object,
  onFilterUpdate: PropTypes.func
}

export default VehicleOptions
