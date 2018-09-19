import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  cardContainer: {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50,
    paddingTop: metrics.contentMarginSmall
  },
  cardImage: {
    backgroundColor: colors.gray100,
    alignSelf: 'stretch',
    height: 110
  },
  cardContent: {
    paddingVertical: metrics.contentMarginMiddle
  },
  cardTitle: {
    color: colors.red,
    fontFamily: 'SFProText-Bold',
    fontSize: metrics.fontSizeBig,
    marginBottom: 4
  },
  detailText: {
    color: colors.gray200,
    fontFamily: 'SFProText-Regular',
    fontSize: metrics.fontSize
  }
})
