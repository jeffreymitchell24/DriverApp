import { StyleSheet, Platform } from 'react-native'
import { colors, metrics } from 'theme'

const extraPadding = Platform.OS === 'ios' ? 70 : 0
export const pickerHeight = (metrics.screenHeight - extraPadding) / 2.10

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingTop: 5,
    paddingBottom: metrics.contentMargin,
    position: 'relative'
    // alignItems: 'center'
  },
  calendar: {
  },
  timePickers: {
    borderTopColor: colors.gray50,
    borderTopWidth: 2,
    paddingBottom: metrics.contentMarginSmall,
    height: pickerHeight,
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 0,
    left: metrics.contentMarginSmall,
    right: metrics.contentMarginSmall
  },
  timePickerRow: {
    flex: 1,
    flexDirection: 'row'
  },
  timePickerContainer: {
    // alignItems: 'center',
    flex: 1
  },
  timePickerLabel: {
    // backgroundColor: colors.red,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: metrics.fontSizeBig,
    color: colors.gray200,
    fontFamily: 'SFProText-Regular'
  },

  timePicker: {
    flex: 1
  },

  pickerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 5,
    marginBottom: 4,
    paddingVertical: 5
  },

  pickerItemText: {
    fontSize: metrics.fontSizeBig,
    fontFamily: 'SFProText-Regular'
  },

  button: {
    marginTop: 13
  }
})
