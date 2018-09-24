import { StyleSheet } from 'react-native'

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
    backgroundColor: 'yellow',
    // borderBottomWidth: 2,
    // borderBottomColor: colors.gray50,
    padding: 0,
    margin: 0
  },

  textInput: {
    height: null,
    paddingBottom: 0,
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
    borderBottomColor: colors.gray50,
    backgroundColor: 'pink'
  },
  container: {
    // zIndex: 10,
    // overflow: 'visible',
    // height: 50,
    flexGrow: 0,
    flexShrink: 0
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
  description: {
    color: '#1faadb'
  },
  predefinedPlacesDescription: {
    color: '#1faadb'
  }
})
