import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  cardContainer: {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50,
    paddingTop: metrics.contentMarginSmall,

    flexDirection: 'row',
    alignItems: 'center'
  },
  leftBlock: {
    flex: 1
  },
  rightBlock: {
    flex: 2,
    marginLeft: 10
  },
  cardImage: {
    backgroundColor: colors.white,
    height: 110,
    width: '100%'
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
  },
  extraDetailText: {
    color: colors.teal,
    fontFamily: 'SFProText-Regular',
    fontSize: metrics.fontSize
  },
  recurringContainer: {
    position: 'absolute',
    top: 12,
    right: 12
  }
})
