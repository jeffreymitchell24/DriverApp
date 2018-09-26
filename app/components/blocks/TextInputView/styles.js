
import {StyleSheet, Platform} from 'react-native'
import { colors } from 'theme'

export default StyleSheet.create({
  container: {
    marginBottom: 16
  },

  label: {
    fontFamily: 'SFProText-Regular',
    color: colors.gray200,
    fontSize: 12
  },
  placeholder: {
    fontSize: 12,
    fontFamily: 'SFProText-Regular'
  },
  input: {
    height: null,
    paddingBottom: Platform.OS === 'android' ? 0 : 4,
    paddingTop: 8,
    color: '#000',
    fontFamily: 'SFProText-Regular',
    padding: 0,
    margin: 0,
    fontSize: 17,
    lineHeight: 22,
    textAlignVertical: 'top',
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50
  },

  inputError: {
    borderBottomColor: colors.red
  },

  error: {
    marginTop: 8,
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: colors.red
  }
})
