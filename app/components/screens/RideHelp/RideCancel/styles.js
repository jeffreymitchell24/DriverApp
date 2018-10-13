import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  cancelLoss: {
    marginTop: 45,
    marginBottom: 50,
    color: colors.red,
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 36,
    textAlign: 'center'
  },

  cancelText: {
    color: colors.gray300,
    fontFamily: 'SFProText-Regular',
    fontSize: metrics.fontSizeBig
  },
  cancelTextBold: {
    fontFamily: 'SFProText-Bold'
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  confirmButton: {
    marginLeft: 6,
    flex: 1
  },

  cancelButton: {
    backgroundColor: colors.white,
    borderColor: '#E9ECEF',
    borderWidth: 1,
    marginRight: 6,
    flex: 1
  },

  cancelButtonText: {
    color: colors.gray100
  }
})
