import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginMiddle,
    paddingBottom: 32,
    paddingTop: 0
  },
  title: {
    color: colors.gray300,
    fontFamily: 'SFProText-Regular',
    fontSize: 28,
    textAlign: 'center'
  },
  imageContainer: {
    maxHeight: 218,
    marginTop: 40,
    marginBottom: 40
  },

  image: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainText: {
    color: colors.gray300,
    fontFamily: 'SFProText-Regular',
    fontSize: metrics.fontSizeBig,
    marginBottom: metrics.contentMargin
  },
  subText: {
    fontFamily: 'SFProText-Regular',
    fontSize: metrics.fontSizeBig,
    color: colors.gray200
  }
})
