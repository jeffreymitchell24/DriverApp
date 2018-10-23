import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: metrics.contentMargin,
    paddingHorizontal: metrics.contentMarginSmall
  },

  form: {
  },

  sectionHeader: {
    fontSize: metrics.fontSizeBig,
    color: colors.black
  },

  textInput: {
    marginBottom: 0
  },

  photoListContainer: {
    paddingTop: metrics.contentMargin,
    paddingBottom: metrics.contentMarginSmall
  },

  photoList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  photoContainer: {
    marginBottom: 8
  },

  photoBlock: {
    // marginRight: 7
  },

  photoLabel: {
    color: colors.gray100,
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    marginBottom: 8
  },
  additionalInputContainer: {
    overflow: 'hidden',
    position: 'relative'
  },
  additionalButtonText: {
    fontSize: metrics.fontSizeBig,
    color: colors.red,
    fontFamily: 'SFProText-Regular'
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0
  },

  closeButtonText: {
    fontSize: metrics.fontSize,
    color: colors.red,
    fontFamily: 'SFProText-Regular'
  }
})
