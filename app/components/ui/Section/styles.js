
import {StyleSheet} from 'react-native'
import { colors, metrics } from 'theme'

export default StyleSheet.create({
  section: {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50,
    paddingTop: 16,
    paddingBottom: 16
  },

  sectionHeader: {
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    color: colors.gray200
  },

  sectionContent: {
    marginTop: 10,
    flexDirection: 'row'
  }
})
