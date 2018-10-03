
import {StyleSheet} from 'react-native'
import { colors, metrics } from 'theme'

export default StyleSheet.create({
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
