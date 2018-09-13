import React from 'react'
import { View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  )
}

CardSection.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style
}

export { CardSection }
