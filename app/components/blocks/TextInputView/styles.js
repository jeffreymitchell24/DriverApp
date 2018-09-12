
import {StyleSheet} from 'react-native'
import { metrics } from 'theme'

export default StyleSheet.create({
  InputWrapp: {
    borderBottomWidth: 2,
    marginBottom: metrics.screenWidth * 0.04,
    borderBottomColor: 'rgb(241, 243, 245)'
  },
  InputLabel: {
    fontSize: metrics.screenWidth * 0.035,
    color: 'rgb(134, 142, 150)'
  },
  InputInput: {
    color: '#000',
    fontSize: metrics.screenWidth * 0.05
  }
})
