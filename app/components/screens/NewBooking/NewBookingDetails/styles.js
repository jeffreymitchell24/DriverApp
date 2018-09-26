import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: metrics.contentMargin
  },

  row: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },

  scheduleContainer: {
    paddingTop: 8
  },

  sectionTitle: {
    fontSize: 13,
    fontFamily: 'SFProText-Regular',
    color: colors.gray200,
    marginBottom: 24
  },

  switchContainer: {
    marginVertical: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },

  switchText: {
    marginLeft: 14,
    fontSize: 18,
    fontFamily: 'SFProDisplay-Regular',
    color: colors.black
  },

  bookingDetailsList: {
    paddingTop: 24
  },

  // Time Slot List

  listSeparator: {
    height: 6,
    backgroundColor: colors.white
  },
  timeSlotsListContainer: {
  },

  timeSlot: {
    backgroundColor: colors.gray50,
    height: 34,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 4
  },
  timeSlotText: {
    fontSize: 16,
    fontFamily: 'SFProText-Bold',
    color: colors.gray300
  },

  button: {
    marginTop: 70,
    alignSelf: 'stretch'
  }
})
