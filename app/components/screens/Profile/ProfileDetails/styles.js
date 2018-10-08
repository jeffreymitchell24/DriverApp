
import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 24,
    paddingTop: 5
  },

  formContainer: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    flexGrow: 1
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

export const googleStyles = StyleSheet.create({
  locationItem: {
    marginBottom: 12
  },
  container: {
    // maxHeight: 100,
    elevation: 3,
    backgroundColor: colors.white,
    marginHorizontal: 2,
    paddingTop: 12,
    paddingHorizontal: 16,
    marginBottom: 16
    // borderWidth: 2,
    // borderColor: colors.red
  },
  contentContainerStyle: {
    backgroundColor: colors.white
  }
})
