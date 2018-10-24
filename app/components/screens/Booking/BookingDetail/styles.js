
import {StyleSheet} from 'react-native'
import { colors, metrics } from 'theme'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: metrics.contentMargin
  },

  carImageContainer: {
    paddingBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50
  },

  row: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },

  map: {
    backgroundColor: colors.gray100,
    alignSelf: 'stretch',
    height: 100,
    marginBottom: 19
  },

  address: {
    fontSize: 13,
    fontFamily: 'SFProText-Regular',
    color: colors.black
  },
  mapButtonText: {
    fontSize: 13,
    fontFamily: 'SFProText-Regular',
    color: colors.red
  },
  linkButton: {
    marginTop: 5
  },
  linkButtonText: {
    fontSize: 15,
    fontFamily: 'SFProText-Medium',
    color: colors.red
  },
  button: {
    marginTop: 50,
    marginBottom: 10
  },
  lockedText: {
    textAlign: 'center',
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    color: colors.gray200
  },

  endedRideDetails: {
    marginTop: metrics.contentMarginSmall
  },

  sectionHeader: {
    fontSize: metrics.fontSizeBig,
    color: colors.black
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
  }
})

export const mapStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
