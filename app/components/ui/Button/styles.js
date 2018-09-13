import { StyleSheet } from 'react-native'

import { colors } from 'theme'

export default StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'SFProText-Bold'
  }
})
