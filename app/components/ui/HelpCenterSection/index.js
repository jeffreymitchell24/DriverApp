import React from 'react'
import { View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

const HelpCenterSection = ({style, children}) => {
  return (
    <View style={[styles.section, style]}>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  )
}
HelpCenterSection.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style
}

export { HelpCenterSection }
