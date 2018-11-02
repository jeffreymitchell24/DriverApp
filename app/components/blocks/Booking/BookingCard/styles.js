import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.gray50,
    borderRadius: 5,
    marginTop: metrics.contentMarginSmall / 2,
    marginBottom: metrics.contentMarginSmall / 2,
    padding: 8,

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
  },
  cardTitle: {
    color: colors.black,
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
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
    top: -2,
    right: 4
  }
})
