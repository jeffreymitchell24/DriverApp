import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: metrics.contentMargin,
    justifyContent: 'space-between'
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyListText: {
    fontSize: 15,
    fontFamily: 'SFProText-Regular',
    color: colors.gray100
  },
  button: {
    marginTop: metrics.contentMargin
  },

  spinnerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
