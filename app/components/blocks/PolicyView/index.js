import React from 'react'
import { Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'
const PolicyView = ({text}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>
        {text}
      </Text>
    </ScrollView>
  )
}

PolicyView.propTypes = {
  text: PropTypes.string
}

export {PolicyView}
