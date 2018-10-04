
import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 24,
    paddingTop: 5,
    justifyContent: 'space-between'
  },
  textInputContainer: {
    position: 'relative'
  },
  editIcon: {
    position: 'absolute',
    right: 8,
    top: 26
  },
  footer: {
    alignItems: 'center'
  },
  button: {
    marginTop: 10,
    alignSelf: 'stretch'
  }
})
