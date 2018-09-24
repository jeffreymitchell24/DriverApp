import { StyleSheet, Platform, Dimensions } from 'react-native'
import { colors, metrics } from 'theme'

let screenHeight = Platform.OS === 'android' ? Dimensions.get('screen').height : metrics.screenHeight

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 5
  },
  screenTitle: {
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    color: colors.gray200,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 24
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
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 3
  },

  licenseImage: {
    width: 160,
    height: 200,
    resizeMode: 'cover'
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
    marginTop: metrics.contentMarginSmall,
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
  },

  modal: {
    height: screenHeight,
    margin: 0,
    padding: 16,
    paddingVertical: 32
  },

  modalDialogContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMargin,
    paddingBottom: metrics.contentMarginSmall,
    paddingTop: 32,
    justifyContent: 'space-between'
    // height: metrics.screenHeight - (32 * 2) - gap
  },

  modalTitle: {
    fontSize: 16,
    fontFamily: 'SFProText-Regular',
    fontWeight: 'normal',
    color: '#343A40',
    textAlign: 'center',
    marginBottom: 8
  },

  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  modalConfirmButton: {
    marginLeft: 6,
    flex: 1
  },

  modalCancelButton: {
    backgroundColor: colors.white,
    borderColor: '#E9ECEF',
    borderWidth: 1,
    marginRight: 6,
    flex: 1
  },

  modalCancelButtonText: {
    color: colors.gray100
  },

  appsInput: {
    height: null,
    paddingBottom: 10,
    paddingTop: 8,
    color: '#000',
    fontFamily: 'SFProText-Regular',
    padding: 0,
    margin: 0,
    fontSize: 17,
    lineHeight: 22,
    textAlignVertical: 'top',
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50,
    marginBottom: 8,
    marginTop: 5
  }
})
