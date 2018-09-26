
import {StyleSheet} from 'react-native'
import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: metrics.contentMargin
  },

  carImageContainer: {
    paddingBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50
  },

  row: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },

  map: {
    backgroundColor: colors.gray100,
    alignSelf: 'stretch',
    height: 100,
    marginBottom: 19
  },

  address: {
    fontSize: 13,
    fontFamily: 'SFProText-Regular',
    color: colors.black
  },
  mapButtonText: {
    fontSize: 13,
    fontFamily: 'SFProText-Regular',
    color: colors.red
  },
  linkButton: {
    marginTop: 5
  },
  linkButtonText: {
    fontSize: 15,
    fontFamily: 'SFProText-Medium',
    color: colors.red
  },
  button: {
    marginTop: 50,
    marginBottom: 10
  },
  lockedText: {
    textAlign: 'center',
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    color: colors.gray200
  }

})
