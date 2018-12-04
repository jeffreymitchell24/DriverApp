import React from 'react'
import { Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'
const PolicyView = ({ text }) => {
  const paragraphs = text.split('\n')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {paragraphs.map(item => (
        <Text style={styles.text}>{item}</Text>
      ))}
    </ScrollView>
  )
}

PolicyView.propTypes = {
  text: PropTypes.string
}

export { PolicyView }
