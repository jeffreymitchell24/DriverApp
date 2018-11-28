import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between'
  },
  flatList: {
    paddingTop: metrics.contentMarginSmall,
    marginHorizontal: metrics.contentMarginSmall,
    paddingBottom: metrics.contentMargin,
    borderColor: '#F1F3F5',
    borderTopWidth: 1
  },
  spinnerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
