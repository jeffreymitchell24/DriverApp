import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: metrics.contentMarginMiddle,
    paddingBottom: 32,
    paddingTop: 0
  },
  screenTitle: {
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    color: colors.gray200,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 24
  },
  section: {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50,
    paddingTop: 10,
    paddingBottom: 16,
    marginBottom: metrics.contentMarginSmall
  },

  sectionHeader: {
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    color: colors.gray200
  },

  sectionContent: {
    marginTop: 10,
    flexDirection: 'row'
  },
  licensePhotoBlock: {
    marginRight: 12
  },

  photoLabel: {
    color: colors.gray100,
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    marginBottom: 8
  },

  photoContainer: {
    width: 80,
    height: 100,
    backgroundColor: colors.gray75,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconCamera: {
    width: 16,
    height: 13
  },

  bigQuestion: {
    fontSize: metrics.fontSizeBig,
    color: colors.black,
    fontFamily: 'SFProText-Medium'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  checkboxTitle: {
    fontSize: metrics.fontSizeBig,
    fontFamily: 'SFProText-Regular',
    color: colors.black
  },
  checkbox: {
    margin: 0,
    marginRight: -5,
    marginLeft: 0,
    padding: 0,
    paddingRight: 0,
    backgroundColor: colors.white,
    borderWidth: 0
  },

  checkboxSubText: {
    marginTop: 8,
    marginLeft: 37,
    color: colors.gray200,
    fontFamily: 'SFProText-Regular',
    fontSize: 15
  },
  changeAppButton: {
    color: colors.red
  },
  footer: {
    alignItems: 'center'
  },
  button: {
    alignSelf: 'stretch'
  },
  mainText: {
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.gray100
  },
  signInButtonText: {
    color: colors.red
  }
})
