import React from 'react'
import { View, ViewPropTypes, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

const SectionHeader = ({title}) => (
  <Text style={styles.sectionHeader}>{title}</Text>
)

SectionHeader.propTypes = {
  title: PropTypes.string
}

const SectionContent = ({children, style}) => (
  <View style={[styles.sectionContent, style]}>
    {children}
  </View>
)
SectionContent.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style
}

const Section = ({style, children}) => {
  return (
    <View style={[styles.section, style]}>
      {children}
    </View>
  )
}
Section.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style
}

export { Section, SectionContent, SectionHeader }
