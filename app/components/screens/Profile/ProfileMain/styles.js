import { StyleSheet } from 'react-native'

import { colors, metrics } from 'theme'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: metrics.contentMargin,
    paddingTop: 0
  },

  profileInfo: {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray50,
    paddingBottom: 16,
    alignItems: 'center'
  },

  photoContainer: {
    width: 60,
    height: 60,
    backgroundColor: colors.gray75,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 50
  },

  profileImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },

  iconCamera: {
    width: 16,
    height: 13
  },

  userName: {
    marginTop: 12,
    fontSize: 19,
    fontFamily: 'SFProText-Bold',
    color: colors.black
  },

  socialList: {
    flexDirection: 'column'
  },
  footer: {
    marginTop: 70,
    alignItems: 'center'
  },
  logOutText: {
    fontSize: 15,
    fontFamily: 'SFProText-Medium',
    color: colors.red
  },
  appVersionText: {
    marginTop: 12,
    fontSize: metrics.fontSize,
    fontFamily: 'SFProText-Regular',
    color: colors.gray200
  },
  // ListItem
  listItem: {
    height: 45,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: metrics.contentMarginSmall
  },
  listItemIcon: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  listItemText: {
    fontSize: metrics.fontSizeBig,
    fontFamily: 'SFProText-Regular',
    color: colors.gray300
  }
  //
})
