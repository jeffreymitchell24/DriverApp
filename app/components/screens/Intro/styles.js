import { StyleSheet, Platform } from 'react-native'

import { colors, metrics } from 'theme'
let extraPadding = Platform.OS === 'ios' ? 20 : 0
let flexSize = metrics.screenHeight < 600 ? 0.7 : 0.8
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPink,
    paddingBottom: 32,
    paddingTop: metrics.contentMargin + extraPadding
  },

  slide: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: metrics.contentMargin
  },

  paginationStyle: {
    alignItems: 'flex-start',
    marginTop: 10
  },
  imageContainer: {
    width: metrics.screenWidth,
    flex: flexSize, // metrics.screenHeight * ratio,
    marginTop: metrics.screenWidth * 0.1,
    padding: metrics.contentMargin,
    paddingTop: 0
  },
  previewImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  slideTitle: {
    fontFamily: 'SFProDisplay-Heavy',
    fontSize: 24,
    color: colors.red,
    marginBottom: 16,
    textAlign: 'center'
  },
  mainText: {
    fontFamily: 'SFProText-Regular',
    fontWeight: '400',
    fontSize: 17,
    color: colors.gray100,
    textAlign: 'center'
  },
  bottomText: {
    fontFamily: 'SFProText-Regular',
    fontWeight: '400',
    fontSize: 15,
    color: colors.gray100
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: metrics.contentMargin
  },

  startButton: {
    marginBottom: 24,
    alignSelf: 'stretch'
  },

  signInButtonText: {
    color: colors.red
  }
})
