import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  cardContainer: {
    // borderWidth: 3,
    // borderColor: colors.gray50,
    borderRadius: 5,
    marginTop: metrics.contentMarginSmall / 2,
    marginBottom: metrics.contentMarginSmall / 2,
    marginHorizontal: 2,
    padding: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
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
    height: 95,
    width: 95,
    borderRadius: 5,
    alignSelf: 'center'
  },
  cardContent: {},
  cardTitle: {
    color: colors.black,
    fontFamily: 'SFProText-Regular',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 6,
    marginTop: 10
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
    top: 0,
    right: 0
  }
})
