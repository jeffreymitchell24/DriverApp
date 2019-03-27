
import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  yesButton: {
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.red,
    width: '30%',
    marginRight: 15
  },
  noButton: {
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.red,
    width: '30%'
  },
  mainText: {
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.gray100,
    marginBottom: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})
