import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const NavFilterImg = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ padding: 10, paddingLeft: 0 }}>
        <Text style={styles.text}>Filters</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: '#F03E3E',
    fontFamily: 'Helvetica'
  }
})

NavFilterImg.propTypes = {
  onPress: PropTypes.func
}

export { NavFilterImg }
