import React from 'react'
import { View, ViewPropTypes, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { colors, metrics } from 'theme'

const HelpCenterSection = ({ style, children }) => {
  return (
    <View style={[styles.section, style]}>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  )
}
HelpCenterSection.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style
}

export { HelpCenterSection }

const styles = StyleSheet.create({
  section: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingTop: 5,
    paddingBottom: metrics.contentMargin,
    paddingHorizontal: metrics.contentMarginSmall
  },
  sectionContent: {
    flexGrow: 1,
    borderTopColor: colors.gray50,
    borderTopWidth: 2
  }
})
