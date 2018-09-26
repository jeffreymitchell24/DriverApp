import { StyleSheet, Platform } from 'react-native'

import { colors, metrics } from 'theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 5,
    position: 'relative'
  },
  formContainer: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    flexGrow: 1
  },

  form: {
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footer: {
    // position: 'absolute',
    // bottom: 32,
    marginTop: 15,
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
  // TextInputView

  inputContainer: {
    marginBottom: 16
  },
  label: {
    fontFamily: 'SFProText-Regular',
    color: colors.gray200,
    fontSize: 12
  }
})

export const googleStyles = StyleSheet.create({
  textInputContainer: {
    borderTopWidth: 0,
    height: null,
    // overflow: 'visible',
    borderBottomWidth: 0,
    // borderBottomColor: colors.gray50,
    padding: 0,
    margin: 0
  },

  textInput: {
    height: null,
    paddingBottom: Platform.OS === 'android' ? 0 : 4,
    paddingTop: 8,
    paddingLeft: 0,
    paddingRight: 0,
    color: '#000',
    fontFamily: 'SFProText-Regular',
    padding: 0,
    margin: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 17,
    lineHeight: 22,
    textAlignVertical: 'top',
    borderRadius: 0,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50
  },
  listView: {
    // position: 'absolute',
    // top: 60,
    // left: 10,
    // right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
    elevation: 3,
    zIndex: 10
  },
  predefinedPlacesDescription: {
    // color: '#1faadb'
  },

  locationItem: {
    marginBottom: 12
  },
  container: {
    // maxHeight: 100,
    elevation: 3,
    backgroundColor: colors.white,
    marginHorizontal: 2,
    paddingTop: 12,
    paddingHorizontal: 16,
    marginBottom: 16
    // borderWidth: 2,
    // borderColor: colors.red
  },
  contentContainerStyle: {
    backgroundColor: colors.white
  },
  description: {
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    color: '#000'
  }
})
